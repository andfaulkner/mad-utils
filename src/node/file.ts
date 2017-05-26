//**************************************************************************************************
//
// NodeJS-only helpers / utils - for file handling
//
//

/******************************************* FILESYSTEM *******************************************/
import * as path from 'path';
import { ensureDirSync, copySync, readdirSync, readSync, lstatSync, readFileSync,
         writeFileSync } from 'fs-extra-promise';
import { path as rootPath } from 'app-root-path';

/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors, NodeMadLogsInstance } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('misc-utils::node -- file', colors.white.bgMagenta));


/******************************************** EXPORTS *********************************************/
/**
 * @param {string} fileOrDirPath - file system object being checked.
 * @return {boolean} true if given file system object is a directory (if false it's a file)
 */
export const isDir = (fileOrDirPath: string): boolean => lstatSync(fileOrDirPath).isDirectory();

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
export const replaceInFile =
    (filePath: string, find: string | RegExp, replace: string, logger = log): string =>
{
    const fileData   = readFileSync(filePath).toString();
    // Hack required to make typings happy
    const cleanfileData = (typeof find === 'string') ? fileData.replace(find, replace)
                                                     : fileData.replace(find, replace);
    writeFileSync(filePath, cleanfileData, 'utf8');
    logger.silly(`cleanjSweetBundleData: new ${filePath} contents:`, cleanfileData);
    return cleanfileData;
};

/**
 * Return path relative to root of project mad-utils is installed in - or if mad-utils is
 * standalone (for development), return path relative to root of mad-utils.
 * @param {string} filePathFromRoot - file path to return relative to the root
 * @return {string} Given file path relative to project root path, or project path if
 *                  relative path arg not provided
 */
export const pathFromRoot = (filePathFromRoot: string = '') => {
    // Returning path relative to project root.
    return path.join(rootPath, filePathFromRoot);
}

const baseFilename = (filename: string) => filename.split('/').slice(-1)[0];

/**
 * Returns true if the given filename was run as a script
 *
 * @param {string} filename - name of the file the command was run from.
 */
export const wasRunAsScript = (filename: string, processArgv = process.argv, TAG = '') => {
    const findFilename = new RegExp(baseFilename(filename).replace('.', '\.'));
    const wasScript = !!findFilename.exec(processArgv[1]);
    if (wasScript) {
        log.verbose.noTag(
            `${TAG ? (TAG + ' ') : ''}Running ${__filename} as a standalone script...`);
    }
    return wasScript;
};


/**
 * Replace matching location in given file.
 * Text in given file that matches the provided regex or string gets replaced with the
 * provided replacement text.
 */
export function replaceInFile(filePath: string, findString: string, replace: string): string;
export function replaceInFile(filePath: string, findRegex: RegExp, replace: string): string;
export function replaceInFile(filePath: string, find: string | RegExp, replace: string): string {
    const fileData   = readFileSync(filePath).toString();
    // Hack required to make typings happy
    const cleanfileData = (typeof find === 'string') ? fileData.replace(find, replace)
                                                     : fileData.replace(find, replace);
    writeFileSync(filePath, cleanfileData, 'utf8');
    log.silly(`cleanjSweetBundleData: new ${filePath} contents:`, cleanfileData);
    return cleanfileData;
}
