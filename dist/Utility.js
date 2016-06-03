var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var childProcess = require('child_process');
var compareVersion = require('compare-version');
var Utility = (function () {
    function Utility(rootFolder) {
        this.checkTypeScriptSanity = function (callback) {
            var me = this;
            childProcess.exec('tsc -v', { cwd: __dirname }, function (error, stdout, stderr) {
                if (!error) {
                    var parts = stdout.trim().split(" ");
                    if (parts.length != 2) {
                        callback.apply(me, ['Could not recognize TypeScript!']);
                    }
                    if (compareVersion(parts[1], me.minTypeScriptVersion) !== -1) {
                        callback.apply(me, [null]);
                    }
                    else {
                        callback.apply('Invalid TypeScript version! Found ' + parts[1] + ', but we require as least ' + me.minTypeScriptVersion);
                    }
                }
                else {
                    callback.apply(me, ['No TypeScript installation found!']);
                }
            });
        };
        var me = this;
        me.minCompassVersion = '1.0.3';
        me.minTypeScriptVersion = '1.8.10';
        me.utilityPackage = me.readNpmPackage(__dirname + '/../package.json');
    }
    Utility.prototype.readNpmPackage = function (path) {
        var me = this;
        return JSON.parse(fs.readFileSync(me.makePath(path)).toString());
    };
    Utility.prototype.fileExists = function (path) {
        try {
            var stat = fs.statSync(path);
            if (stat) {
                return stat.isFile();
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    Utility.prototype.dirExists = function (path) {
        try {
            var stat = fs.statSync(path);
            if (stat) {
                return stat.isDirectory();
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    Utility.prototype.makePath = function (value) {
        return value.replace('/', path.sep);
    };
    Utility.prototype.copyFile = function (source, dest) {
        var me = this, s = me.makePath(source), d = me.makePath(dest);
        fse.copySync(s, d);
        return me.fileExists(dest);
    };
    Utility.prototype.findFiles = function (dir, filter) {
        var me = this, results = [];
        filter = filter || function (fname) {
            return true;
        };
        var list = fs.readdirSync(dir);
        list.forEach(function (file) {
            file = dir + '/' + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(me.findFiles(file, filter));
            }
            else {
                if (filter(file) === true) {
                    results.push(file);
                }
            }
        });
        return results;
    };
    Utility.prototype.downloadFile = function (source, dest, callback) {
        var me = this, command = 'curl -o "' + dest + '" "' + source + '"' + (process.env.http_proxy || null ? ' --proxy "' + process.env.http_proxy + '"' : '');
        childProcess.exec(command, { cwd: __dirname }, function (error, stdout, stderr) {
            if (!error) {
                if (me.fileExists(dest)) {
                    callback.apply(me, [true]);
                }
                else {
                    callback.apply(me, [false, dest + " was not created after running curl!\nThe command was " + command]);
                }
            }
            else {
                callback.apply(me, [false, 'Unable to download ' + source + ", due:" + error]);
            }
        });
    };
    Utility.prototype.runSerial = function (callbacks, whenDone) {
        var me = this;
        var makeCall = function (fn, cb) {
            return function (error) {
                if (!error) {
                    if (cb) {
                        fn.apply(me, [cb]);
                    }
                    else {
                        fn.apply(me);
                    }
                }
                else {
                    console.log(error);
                }
            };
        };
        var index = callbacks.length;
        var lastCall = whenDone;
        while ((index--) !== 0) {
            lastCall = makeCall(callbacks[index], lastCall);
        }
        lastCall.apply(me, []);
    };
    Utility.prototype.downloadFiles = function (files, callback) {
        var me = this, count = 0, errors = [], queue = [];
        files.forEach(function (file) {
            if (!fs.existsSync(file.local)) {
                queue.push(function (callback) {
                    me.downloadFile(file.remote, file.local, function (status, error) {
                        if (status) {
                            count++;
                        }
                        else {
                            errors.push(error);
                        }
                        callback.apply(me, [null]);
                    });
                });
            }
        });
        me.runSerial(queue, function () {
            if (count == files.length) {
                callback.apply(me, [null]);
            }
            else {
                callback.apply(me, [errors.join("\n")]);
            }
        });
    };
    Utility.prototype.reCreateFolder = function (folder) {
        var me = this;
        if (me.dirExists(folder)) {
            fse.removeSync(folder);
        }
        fs.mkdirSync(folder);
    };
    Utility.prototype.checkCURLSanity = function (callback) {
        var me = this;
        childProcess.exec('curl -V', { cwd: __dirname }, function (error, stdout, stderr) {
            if (!error) {
                callback.apply(me, [null]);
            }
            else {
                callback.apply(me, ['No CURL utility found!']);
            }
        });
    };
    Utility.prototype.checkCompassSanity = function (callback) {
        var me = this;
        childProcess.exec('compass -v', { cwd: __dirname }, function (error, stdout, stderr) {
            if (!error) {
                var parts = stdout.split("\n");
                if (parts.length < 1) {
                    callback.apply(me, ['Could not recognize Compass!']);
                }
                parts = parts[0].split(' ');
                if (parts.length !== 3) {
                    callback.apply(me, ['Could not read Compass version!']);
                }
                if (compareVersion(parts[1], me.minCompassVersion) !== -1) {
                    callback.apply(me, [null]);
                }
                else {
                    callback.apply('Invalid Compass version! Found ' + parts[1] + ', but we require as least ' + me.minCompassVersion);
                }
            }
            else {
                callback.apply(me, ['No Compass installation found!']);
            }
        });
    };
    Utility.prototype.buildSources = function (folder, callback) {
        var me = this;
        childProcess.exec('tsc', { cwd: folder }, function (error, stdout, stderr) {
            if (!error) {
                callback.apply(me, [null]);
            }
            else {
                callback.apply(me, [stdout.toString()]);
            }
        });
    };
    return Utility;
}());
exports.Utility = Utility;
