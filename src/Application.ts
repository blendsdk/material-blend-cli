import * as Blend from "blend-node-library";

export class Application extends Blend.builder.Application {

    protected builderPackage: Blend.npm.Package;
    protected appFolder: string;

    public constructor(projectFolder: string) {
        super(projectFolder);
        var me = this;
        me.builderPackage = new Blend.npm.Package(me.projectFolder);
    }

    /**
     * Check and create the app folder if possible
     */
    protected checkCreateAppFolder(folder: string): boolean {
        var me = this;
        me.filesystem.ensureFolder(folder);
        var files = me.filesystem.findFiles(folder, function (file: string) {
            return file.indexOf(".git") === -1;
        });
        return files.length === 0;
    }

    /**
     * Check if all build requirements are met
     */
    protected checkBuildRequirements(): boolean {
        var me = this,
            exeResult = me.checkTypeScriptSanity();
        if (exeResult.success) {
            exeResult = me.checkCompassSanity();
            if (exeResult.success) {
                exeResult = me.checkTSLintSanity();
                return true;
            }
        }
        if (exeResult.success === false) {
            me.printError(exeResult.result);
            return false;
        }
    }

    protected installJavaScriptRuntime() {
        var me = this,
            webFolder = me.appFolder + "/web/blend";
        me.filesystem.ensureFolder(webFolder, true);
        me.print(("Installing JavaScript Runtime, "));
        me.filesystem.copy(
            me.filesystem.makePath(me.appFolder + "/node_modules/material-blend-sdk/blend", true),
            me.filesystem.makePath(webFolder, true));
        me.printDone();
    }

    protected installTypings() {
        var me = this,
            options = { cwd: me.appFolder };
        me.print(("Installing Typings, "));
        me.childProcess.execute("typings", ["init"], options);
        me.childProcess.execute("typings", ["install", "--save", "--global", "file:node_modules/material-blend-sdk/typings/blend.d.ts"], options)
        me.printDone();
    }

    protected installMaterialBlendSDK() {
        var me = this,
            options = { cwd: me.appFolder },
            packages: Array<string> = [
                `material-blend-sdk`,
                `material-blend-theme-sdk`,
            ];

        me.childProcess.execute("npm", ["init", "-y"], options);

        packages.forEach(function (pkg: string) {
            me.print(`Installing ${pkg.replace("@\"latest\"", "")}, `);
            me.childProcess.execute("npm", ["install", "--save", pkg], options);
            me.printDone();
        });
    }

    protected installTemplate(template: string) {
        var me = this;
        me.print(`Installing the ${template} template, `);
        me.filesystem.copy(
            me.filesystem.makePath(__dirname + "/../resources/templates/" + template, true),
            me.appFolder);
        me.printDone();
    }

    /**
     * Compile the sass files
     */
    protected compileStyles(): boolean {
        var me = this;
        return me.buildStyles(me.appFolder);
    }

    /**
     * Build the TS sources, both framework and tests
     */
    protected buildApplication(): boolean {
        var me = this;
        me.print("Building sources, ");
        var res = me.buildSources(me.appFolder);
        if (res.success) {
            me.printDone();
            return true;
        } else {
            me.printError(res.result);
            return false;
        }
    }

    protected initCommand(appFolder: string, template: string = "basic") {
        var me = this;
        if (me.checkBuildRequirements()) {
            if (me.checkCreateAppFolder(appFolder)) {
                me.appFolder = appFolder = me.filesystem.makePath(appFolder, true);
                me.println("Creating a new project in " + appFolder);
                me.installTemplate(template);
                me.installMaterialBlendSDK();
                me.installJavaScriptRuntime();
                me.installTypings();
                me.compileStyles();
                me.buildApplication();
            } else {
                me.printError(`ERROR: The project folder is not empty! (${me.filesystem.makePath(appFolder, true)})`);
            }
        }
    }

    public run() {
        var me = this;
        me.println("\nMaterialBlend Application Builder v" + me.builderPackage.version + "\n");
        var initCommand = "init",
            argv = require("yargs")
                .usage('Usage: $0 <command> [options]')
                .command(initCommand, "Initialize a new MaterialBlend application", {
                    dir: {
                        alias: "d",
                        default: me.filesystem.makePath(me.getUserHomeFolder() + "/material-app"),
                        describe: "Application home folder."
                    }
                })
                .demand(1)
                .help('h')
                .alias('h', 'help')
                .epilog("Copyright 2016 TrueSoftware B.V.")
                .argv;

        var command = argv._[0];
        if (command === initCommand) {
            me.initCommand(argv.dir);
        }

    }

}
