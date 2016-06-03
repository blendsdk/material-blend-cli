/// <reference path="../typings/index.d.ts" />

import fs = require('fs');
import fse = require('fs-extra');
import path = require('path');
import childProcess = require('child_process');
import uglify = require('uglify-js');
import colors = require('colors');
import compareVersion = require('compare-version');

interface DownloadInterface {
    remote: string;
    local: string;
}

interface NpmPackageInterface {
    version: string
}

export abstract class Utility {

    protected minCompassVersion: string;
    protected minTypeScriptVersion: string;
    protected utilityPackage: NpmPackageInterface;

    public abstract run(): void;

    public constructor(rootFolder: string) {
        var me = this;
        me.minCompassVersion = '1.0.3';
        me.minTypeScriptVersion = '1.8.10';
        me.utilityPackage = me.readNpmPackage(__dirname + '/../package.json');

    }

    protected readNpmPackage(path: string): NpmPackageInterface {
        var me = this;
        return <NpmPackageInterface>JSON.parse(fs.readFileSync(me.makePath(path)).toString());
    }

    /**
     * Checks if a given fileExists
     */
    protected fileExists(path: string) {
        try {
            var stat = fs.statSync(path);
            if (stat) {
                return stat.isFile();
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    /**
     * Checks if a goven directory exists
     */
    protected dirExists(path: string): boolean {
        try {
            var stat = fs.statSync(path);
            if (stat) {
                return stat.isDirectory();
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    /**
     * Converts the '/' to '\' if needed
     */
    protected makePath(value: string): string {
        return value.replace('/', path.sep);
    }

    /**
     * Copy file from source to dest
     */
    protected copyFile(source: string, dest: string): boolean {
        var me = this,
            s = me.makePath(source),
            d = me.makePath(dest);
        fse.copySync(s, d);
        return me.fileExists(dest);
    }

    /**
     * Recursively reads files from a given folder and applies a filter to
     * be able to exclude some files.
     */
    protected findFiles(dir: string, filter: Function) {
        var me = this,
            results: Array<string> = [];
        filter = filter || function(fname: string) {
            return true;
        }
        var list = fs.readdirSync(dir)
        list.forEach(function(file: string) {
            file = dir + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isDirectory()) {
                results = results.concat(me.findFiles(file, filter))
            } else {
                if (filter(file) === true) {
                    results.push(file)
                }
            }
        })
        return results;
    }

    /**
     * Download a file uril the external CURL utility. This function will add the --proxy paremeter
     * if the HTTP_PROXY environment variable is set
     */
    protected downloadFile(source: string, dest: string, callback: Function) {
        var me = this,
            command = 'curl -o "' + dest + '" "' + source + '"' + (process.env.http_proxy || null ? ' --proxy "' + process.env.http_proxy + '"' : '');
        childProcess.exec(command, { cwd: __dirname }, function(error: Error, stdout: any, stderr: any) {
            if (!error) {
                if (me.fileExists(dest)) {
                    callback.apply(me, [true]);
                } else {
                    callback.apply(me, [false, dest + " was not created after running curl!\nThe command was " + command]);
                }
            } else {
                callback.apply(me, [false, 'Unable to download ' + source + ", due:" + error]);
            }
        });
    }

    /**
     * Run a series of functions sequentially and when done call the whenDone callback
     */
    protected runSerial(callbacks: Array<Function>, whenDone: Function) {
        var me = this;
        var makeCall = function(fn: Function, cb: Function) {
            return function(error: string) {
                if (!error) {
                    if (cb) {
                        fn.apply(me, [cb]);
                    } else {
                        fn.apply(me);
                    }
                } else {
                    console.log(error);
                }
            }
        }
        var index: number = callbacks.length;
        var lastCall = whenDone;
        while ((index--) !== 0) {
            lastCall = makeCall(callbacks[index], lastCall);
        }
        lastCall.apply(me, []);
    }


    /**
     * Downloads files from remove sources.
     */
    protected downloadFiles(files: Array<DownloadInterface>, callback: Function) {
        var me = this,
            count = 0,
            errors: Array<string> = [],
            queue: Array<Function> = [];
        files.forEach(function(file: DownloadInterface) {
            if (!fs.existsSync(file.local)) {
                queue.push(function(callback: Function) {
                    me.downloadFile(file.remote, file.local, function(status: boolean, error: string) {
                        if (status) {
                            count++;
                        } else {
                            errors.push(error);
                        }
                        callback.apply(me, [null]);
                    })
                });
            }
        });

        me.runSerial(queue, function() {
            if (count == files.length) {
                callback.apply(me, [null])
            } else {
                callback.apply(me, [errors.join("\n")]);
            }
        })
    }

    /**
     * Removes and recreates a folder.
     */
    protected reCreateFolder(folder: string) {
        var me = this;
        if (me.dirExists(folder)) {
            fse.removeSync(folder);
        }
        fs.mkdirSync(folder);
    }

    /**
     * Checks if compass exists and it is the correct version.
     */
    protected checkCURLSanity(callback: Function) {
        var me = this;
        childProcess.exec('curl -V', { cwd: __dirname }, function(error: Error, stdout: any, stderr: any) {
            if (!error) {
                callback.apply(me, [null]);
            } else {
                callback.apply(me, ['No CURL utility found!']);
            }
        });
    }

    /**
     * Checks if compass exists and it is the correct version.
     */
    protected checkCompassSanity(callback: Function) {
        var me = this;
        childProcess.exec('compass -v', { cwd: __dirname }, function(error: Error, stdout: any, stderr: any) {
            if (!error) {
                var parts: Array<string> = stdout.split("\n");
                if (parts.length < 1) {
                    callback.apply(me, ['Could not recognize Compass!']);
                }
                parts = parts[0].split(' ');
                if (parts.length !== 3) {
                    callback.apply(me, ['Could not read Compass version!']);
                }
                if (compareVersion(parts[1], me.minCompassVersion) !== -1) {
                    callback.apply(me, [null]);
                } else {
                    callback.apply('Invalid Compass version! Found ' + parts[1] + ', but we require as least ' + me.minCompassVersion)
                }
            } else {
                callback.apply(me, ['No Compass installation found!']);
            }
        });
    }

    /**
     * Checks if TypeScript exists and it is the correct version.
     */
    protected checkTypeScriptSanity = function(callback: Function) {
        var me = this;
        childProcess.exec('tsc -v', { cwd: __dirname }, function(error: Error, stdout: any, stderr: any) {
            if (!error) {
                var parts: Array<string> = stdout.trim().split(" ");
                if (parts.length != 2) {
                    callback.apply(me, ['Could not recognize TypeScript!']);
                }
                if (compareVersion(parts[1], me.minTypeScriptVersion) !== -1) {
                    callback.apply(me, [null]);
                } else {
                    callback.apply('Invalid TypeScript version! Found ' + parts[1] + ', but we require as least ' + me.minTypeScriptVersion)
                }
            } else {
                callback.apply(me, ['No TypeScript installation found!']);
            }
        });
    }

    /**
     * Build the TS sources, both framework and tests
     */
    protected buildSources(folder: string, callback: Function) {
        var me = this;
        childProcess.exec('tsc', { cwd: folder }, function(error: Error, stdout: any, stderr: any) {
            if (!error) {
                callback.apply(me, [null]);
            } else {
                callback.apply(me, [stdout.toString()]);
            }
        });
    }
}