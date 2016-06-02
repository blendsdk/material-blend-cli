/// <reference path="../typings/node.d.ts" />
/// <reference path="../typings/packages.d.ts" />
/// <reference path="../typings/colors.d.ts" />

var fs = require('fs');
var fse = require('fs-extra');
var del = require('del');
var path = require('path');
var childProcess = require('child_process');
var uglify = require('uglify-js');
var vercompare = require('version-comparison');
var colors = require('colors');

export class BlendClient extends Uility {

    /**
     * Entry point
     */
    public run() {
        console.log("\n")
        console.log("MaterialBlend Application Builder v1.0\n");
        var me = this;
    }

}