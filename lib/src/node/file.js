//**************************************************************************************************
//
// NodeJS-only helpers / utils - for file handling
//
//
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_promise_1 = require("fs-extra-promise");
/******************************************** LOGGING *********************************************/
var node_1 = require("mad-logs/lib/node");
var log = node_1.nodeLogFactory(node_1.buildFileTag('misc-utils::node -- file', node_1.colors.white.bgMagenta));
/******************************************** EXPORTS *********************************************/
/**
 * @param {string} fileOrDirPath - file system object being checked.
 * @return {boolean} true if given file system object is a directory (if false it's a file)
 */
exports.isDir = function (fileOrDirPath) { return fs_extra_promise_1.lstatSync(fileOrDirPath).isDirectory(); };
/**
 * Replace matching location in given file.
 *
 * @param {string} filePath - File to perform replacement in.
 * @param {string|RegExp} find - Match to perform against the content of the file at filePath.
 * @param {string} replace - Text to replace the matching text with.
 * @param {NodeMadLogsInstance} logger - If LOG_LEVEL=silly, show new file content. Use given logger
 *                                       (if any) to display the content (otherwise use a default).
 *@return {string} File content after the replacement.
 */
exports.replaceInFile = function (filePath, find, replace, logger) {
    if (logger === void 0) { logger = log; }
    var fileData = fs_extra_promise_1.readFileSync(filePath).toString();
    // Hack required to make typings happy
    var cleanfileData = (typeof find === 'string') ? fileData.replace(find, replace)
        : fileData.replace(find, replace);
    fs_extra_promise_1.writeFileSync(filePath, cleanfileData, 'utf8');
    logger.silly("cleanjSweetBundleData: new " + filePath + " contents:", cleanfileData);
    return cleanfileData;
};
//# sourceMappingURL=file.js.map