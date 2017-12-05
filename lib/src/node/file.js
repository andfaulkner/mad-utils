"use strict";
//**************************************************************************************************
// NodeJS-only helpers / utils - for file & filesystem handling
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var path = require("path");
var app_root_path_1 = require("app-root-path");
var env_var_helpers_1 = require("env-var-helpers");
var fs_extra_promise_1 = require("fs-extra-promise");
var string_1 = require("../string");
exports.isNonMinFile = string_1.isNonMinFile;
exports.endsInDotJs = string_1.endsInDotJs;
exports.getBaseFilenameFromPath = string_1.getBaseFilenameFromPath;
/******************************************** LOGGING *********************************************/
var shared_1 = require("mad-logs/lib/shared");
var log = shared_1.logFactory("mad-utils::node -- file", shared_1.Styles.cult);
/******************************************** EXPORTS *********************************************/
/**
 * Determine if inode (aka file, directory, socket, etc.) at absolute path is a directory.
 * @param {string} fileOrDirPath - file system object being checked.
 * @return {boolean} true if given file system object is a directory (if false it's a file)
 */
exports.isDir = function (fileOrDirPath) {
    try {
        var isINodeADir = fs_extra_promise_1.lstatSync(fileOrDirPath).isDirectory();
        return !!isINodeADir;
    }
    catch (e) {
        return false;
    }
};
/**
 * Is the given path an absolute path?
 * @param {string} newPath Path to determine if absolute
 * @return {boolean} True if path is absolute.
 */
exports.isAbsPath = function (newPath) { return !!newPath.match(/^\//); };
/**
 * Return path relative to root of project mad-utils is installed in - or if mad-utils is
 * standalone (for development), return path relative to root of mad-utils.
 * @param {string} filePathFromRoot - file path to return relative to the root
 * @return {string} Given file path relative to project root path, or project path if
 *                  relative path arg not provided
 */
exports.pathFromRoot = function (filePathFromRoot) {
    if (filePathFromRoot === void 0) { filePathFromRoot = ''; }
    // Returning path relative to project root.
    return path.join(app_root_path_1.path, filePathFromRoot);
};
/**
 * Returns true if the given filename was run as a script.
 *
 * @param {string} filePathOrName - name of file (or path to file) where the command was run from.
 * @return {boolean} true if file with given name was run as a script.
 */
exports.wasRunAsScript = function (filePathOrName, argv, TAG) {
    if (argv === void 0) { argv = process.argv; }
    if (TAG === void 0) { TAG = ''; }
    var findFilename = new RegExp(string_1.getBaseFilenameFromPath(filePathOrName).replace('.', '.'));
    var wasScript = !!findFilename.exec(argv[1]);
    if (wasScript && env_var_helpers_1.isVerbose) {
        console.log((TAG ? TAG + ' ' : '') + "Running " + __filename + " as a standalone script...");
    }
    return wasScript;
};
/**
 * Replace matching location in given file.
 * Text in given file that matches the provided regex or string gets replaced with the
 * provided replacement text.
 *
 * @param {string} filePath - File to perform replacement in.
 * @param {string|RegExp} findStrOrRE - Match to perform against content of the file at filePath.
 * @param {string} replace - Text to replace the matching text with.
 * @param {NodeMadLogsInstance} logger - If LOG_LEVEL=silly, show new file content. Use given logger
 *                                       (if any) to display the content (otherwise use a default).
 * @return {string} File content after the replacement.
 */
function replaceInFile(filePath, findStrOrRE, replace) {
    var fileData = fs_extra_promise_1.readFileSync(filePath).toString();
    // Hack required to make typings happy
    var cleanfileData = typeof findStrOrRE === 'string'
        ? fileData.replace(findStrOrRE, replace)
        : fileData.replace(findStrOrRE, replace);
    fs_extra_promise_1.writeFileSync(filePath, cleanfileData, { encoding: 'utf8' });
    log.silly("replaceInFile: new " + filePath + " contents:", cleanfileData);
    return cleanfileData;
}
exports.replaceInFile = replaceInFile;
/**
 * Traverse given folder & return list of all .js inodes it contains.
 *
 * @param {string} dir - absolute path to directory.
 * @param {boolean} excludeMin - If true, exclude all .min.js files.
 * @return {string[]} List of all non-minified .js inodes in given directory.
 */
exports.getJsFilesInDir = function (dir, excludeMin) {
    if (excludeMin === void 0) { excludeMin = true; }
    return fs_extra_promise_1.readdirSync(dir)
        .filter(string_1.endsInDotJs)
        .filter(excludeMin ? string_1.isNonMinFile : function () { return true; });
};
/**
 * Search a given directory for an inode (file or folder) with the given name.
 *
 * @param {string} dir - Absolute path to directory to check for file of given name.
 * @param {string} filename - name of inode to look for in directory.
 * @return {boolean} Return true if given filename is present in folder at given path.
 */
exports.isFileInDir = function (dir, filename) {
    return !!fs_extra_promise_1.readdirSync(dir).find(function (file) { return file === filename; });
};
//# sourceMappingURL=file.js.map