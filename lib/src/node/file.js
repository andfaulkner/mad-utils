//**************************************************************************************************
//
// NodeJS-only helpers / utils - for file handling
//
//
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************* FILESYSTEM *******************************************/
var path = require("path");
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
/**
 * Return path relative to root of project mad-utils is installed in - or if mad-utils is
 * standalone (for development), return path relative to root of mad-utils.
 * Note: only works if mad-utils is installed no more than 6 modules deep (relative to the project
 * root) in node_modules.
 * @param {string} filePathFromRoot - file path to return relative to the root
 * @return {string} Given file path relative to project root path, or project path if
 *                  relative path arg not provided
 */
exports.pathFromRoot = function (filePathFromRoot) {
    if (filePathFromRoot === void 0) { filePathFromRoot = ''; }
    // Returning path relative to root of project mad-utils installed in, if any of next 5 match.
    if (path.join(__dirname, '../../../../../../../../../../../../..').match(/node_modules/)) {
        return path.join(__dirname, '../../../../../../../../../../../../../..', filePathFromRoot);
    }
    if (path.join(__dirname, '../../../../../../../../../../..').match(/node_modules/)) {
        return path.join(__dirname, '../../../../../../../../../../../..', filePathFromRoot);
    }
    if (path.join(__dirname, '../../../../../../../../..').match(/node_modules/)) {
        return path.join(__dirname, '../../../../../../../../../..', filePathFromRoot);
    }
    if (path.join(__dirname, '../../../../../../..').match(/node_modules/)) {
        return path.join(__dirname, '../../../../../../../..', filePathFromRoot);
    }
    if (path.join(__dirname, '../../../../..').match(/node_modules/)) {
        return path.join(__dirname, '../../../../../..', filePathFromRoot);
    }
    if (path.join(__dirname, '../../..').match(/node_modules/)) {
        return path.join(__dirname, '../../../../', filePathFromRoot);
    }
    // Returning path relative to mad-utils root.
    return path.join(__dirname, '../..', filePathFromRoot);
};
//# sourceMappingURL=file.js.map