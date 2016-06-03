"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UtilityModule = require("./Utility");
var BlendClient = (function (_super) {
    __extends(BlendClient, _super);
    function BlendClient() {
        _super.apply(this, arguments);
    }
    BlendClient.prototype.run = function () {
        console.log("\n");
        console.log("MaterialBlend Application Builder v1.0\n");
        var me = this;
    };
    return BlendClient;
}(UtilityModule.Utility));
exports.BlendClient = BlendClient;
