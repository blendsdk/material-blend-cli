
import fs = require('fs');
import fse = require('fs-extra');
import path = require('path');
import childProcess = require('child_process');
import uglify = require('uglify-js');
import colors = require('colors');

import * as UtilityModule from "./Utility";

export class BlendClient extends UtilityModule.Utility {

    /**
     * Entry point
     */
    public run() {
        console.log("\n")
        console.log("MaterialBlend Application Builder v1.0\n");
        var me = this;
    }

}