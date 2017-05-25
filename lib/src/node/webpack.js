"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var HandlebarsPlugin = require("handlebars-webpack-plugin");
console.log(HandlebarsPlugin);
var pathFromRoot = function (filePathFromRoot) { return path.join(__dirname, '../../', (filePathFromRoot || '')); };
/**
 * Construct a handlebars plugin object. Builds an html file at given output file. Same baseline
 * index.hbs is used for all constructed html files.
 */
exports.handlebarsPluginFactory = function (data, outputFilePathFromRoot, conf, hbsSrcFromRoot) {
    if (hbsSrcFromRoot === void 0) { hbsSrcFromRoot = 'app/client/index.hbs'; }
    return new HandlebarsPlugin({
        entry: pathFromRoot(hbsSrcFromRoot),
        output: pathFromRoot(outputFilePathFromRoot),
        data: Object.assign({}, data, { appTitle: conf.appTitle }),
    });
};
//# sourceMappingURL=webpack.js.map