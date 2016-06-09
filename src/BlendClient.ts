
import fs = require('fs');
import fse = require('fs-extra');
import path = require('path');
import childProcess = require('child_process');
import uglify = require('uglify-js');
import colors = require('colors');
import * as UtilityModule from "./Utility";

export class BlendClient extends UtilityModule.Utility {

    protected getUserHomeFolder() {
        return process.env.HOME || process.env.USERPROFILE;
    }

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

    protected initProject(template: string, projectRoot: string) {
        var me = this
        if (me.checkProjectRootFolder(projectRoot)) {
            projectRoot = fs.realpathSync(projectRoot);
            me.println("Creating a new project in " + projectRoot);
            fse.copySync(__dirname + "/../resources/templates/" + template, projectRoot);
        } else {
            me.println(colors.red(`ERROR: The project folder is not empty! (${fs.realpathSync(projectRoot)})`));
        }
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
                        default: "simple",
                        describe: "A template used to generate a new application."
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