//**************************************************************************************************
//
// NODE-ONLY HELPERS / UTILS
//
//

/******************************************* FILESYSTEM *******************************************/
import * as path from 'path';
import { ensureDirSync, copySync, readdirSync, readSync, lstatSync, readFileSync, writeFileSync } from 'fs-extra-promise';

import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';

const log = nodeLogFactory(buildFileTag('misc-utils::node :', colors.white.bgMagenta));

/**
 * @param {string} fileOrDirPath - file system object being checked.
 * @return {boolean} true if given file system object is a directory (if false it's a file)
 */
export function isDir(fileOrDirPath: string): boolean {
    return lstatSync(fileOrDirPath).isDirectory();
};

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
export function replaceInFile(filePath: string, find: string | RegExp, replace: string, logger = log): string {
    const fileData   = readFileSync(filePath).toString();
    // Hack required to make typings happy
    const cleanfileData = (typeof find === 'string') ? fileData.replace(find, replace)
                                                     : fileData.replace(find, replace);
    writeFileSync(filePath, cleanfileData, 'utf8');
    logger.silly(`cleanjSweetBundleData: new ${filePath} contents:`, cleanfileData);
    return cleanfileData;
}
