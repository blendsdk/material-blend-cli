
import fs = require('fs');
import fse = require('fs-extra');
import path = require('path');
import childProcess = require('child_process');
import uglify = require('uglify-js');
import colors = require('colors');
import compareVersion = require("compare-version");
import * as UtilityModule from "./Utility";

export class BlendClient extends UtilityModule.Utility {

    protected checkProjectRootFolder(folder: string): boolean {
        var me = this;
        if (!me.dirExists(folder)) {
            fse.mkdirsSync(folder);
            return true;
        } else {
            var files = me.findFiles(folder, function (file: string) {
                return file.indexOf(".git") === -1;
            });
            return files.length === 0;
        }
    }

    protected installSDK(projectRoot: string, callback: Function) {
        var me = this, queue: Array<Function> = [],
            packages: Array<string> = [
                `material-blend-sdk@"latest"`,
                `material-blend-theme-sdk@"latest"`,
            ],
            installBlendJS = function () {
                me.println(colors.green("Installing MaterialBlend Runtime"));
                fse.copySync(me.makePath(projectRoot + "/node_modules/material-blend-sdk/blend"), me.makePath(projectRoot + "/web/blend"));
            },
            installTypings = function () {
                me.println(colors.green("Installing MaterialBlend Typings"));;
                childProcess.execSync(`typings install --global --save file:node_modules/material-blend-sdk/typings/blend.d.ts`, {
                    cwd: projectRoot
                });
            }

        packages.forEach(function (pkg: string) {
            queue.push(function (cb: Function) {
                childProcess.exec(`npm install ${pkg} --save`, { cwd: projectRoot }, function (error: Error, stdout: any, stderr: any) {
                    if (!error) {
                        me.println(colors.green(`Installed ${pkg}`));
                        cb.apply(me, [null]);
                    } else {
                        cb.apply(me, [error]);
                    }

                });
            })
        });

        me.runSerial(queue, function (error: string) {
            if (!error) {
                installBlendJS.apply(me, []);
                installTypings.apply(me, []);
                callback.apply(me, []);
            } else {
                me.println(colors.red(error));
            }
        });

    }

    protected compileStyles(projectRoot: string, compassInstalled: boolean) {
        var me = this;
        if (compassInstalled) {
            me.println(colors.green("Initializing Styles"));
            childProcess.execSync("compass compile", { cwd: projectRoot });
        }
    }

    protected initProject(template: string, projectRoot: string) {
        var me = this

        me.checkCompassSanity(function (compassError: string) {
            var compassInstalled: boolean = (compassError === null);
            if (!compassInstalled) {
                me.println(colors.yellow(compassError));
            }

            me.checkTypingsSanity(function (error: string) {
                if (!error) {
                    if (me.checkProjectRootFolder(projectRoot)) {
                        projectRoot = fs.realpathSync(projectRoot);
                        me.println("Creating a new project in " + projectRoot);
                        fse.copySync(__dirname + "/../resources/templates/" + template, projectRoot);
                        me.installSDK(projectRoot, function () {
                            me.compileStyles(projectRoot, compassInstalled);
                            me.printAllDone();
                        });
                    } else {
                        me.println(colors.red(`ERROR: The project folder is not empty! (${fs.realpathSync(projectRoot)})`));
                    }
                } else {
                    me.println(colors.red("ERROR: " + error));
                }
            });

        });
    }

    /**
     * Entry point
     */
    public run() {
        var me = this;
        me.println("\nMaterialBlend Application Builder v" + me.utilityPackage.version + "\n");
        var initCommand = "init",
            buildCommand = "build",
            distCommand = "dist",
            argv = require("yargs")
                .usage('Usage: $0 <command> [options]')
                .command(initCommand, "Initialize a new MaterialBlend application", {
                    dir: {
                        alias: "d",
                        default: me.getUserHomeFolder(),
                        describe: "Application home folder."
                    },
                    template: {
                        alias: "t",
                        default: "basic",
                        describe: "A template used to generate a new basic application."
                    }
                })
                .demand(1)
                .help('h')
                .alias('h', 'help')
                .epilog("Copyright 2016 TrueSoftware B.V.")
                .argv;

        var command = argv._[0];
        if (command === initCommand) {
            me.initProject(argv.template, argv.dir);
        } else if (command === buildCommand) {
            me.printAllDone();
        } else if (command === distCommand) {
        }

    }

}