/**************************************************************************************************
 *
 *       @file ./file.ts
 *
 *       NodeJS-only helpers / utils for file & filesystem handling
 *
 */

/************************************** THIRD-PARTY MODULES ***************************************/
import path from 'path';
import {path as rootPath} from 'app-root-path';
import {isVerbose} from 'env-var-helpers';

import {readdirSync, lstatSync, readFileSync, writeFileSync} from 'fs-extra-promise';

/**************************************** PROJECT MODULES *****************************************/
import {isNonMinFile, endsInDotJs} from '../string';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory(`mad-utils -> file.ts`, Styles.cult);

/******************************************** EXPORTS *********************************************/
/**
 * Determine if inode (file, directory, socket, etc) at absolute path is a
 * directory
 *
 * [SYNCHRONOUS]
 *
 * @param {string} fileOrDirPath File system object being checked
 * @return {boolean} true if given file system object is a directory
 *                   false if it's not (e.g. it's a file or socket)
 */
export const isDir = (fileOrDirPath: string): boolean => {
    try {
        return !!lstatSync(fileOrDirPath).isDirectory();
    } catch (e) {
        return false;
    }
};

/**
 * Is the given path an absolute path?
 *
 * @param {string} newPath Path to determine if absolute
 * @return {boolean} True if path is absolute
 */
export const isAbsPath = (newPath: string): boolean => !!newPath.match(/^\//);

/**
 * Return path relative to root of project mad-utils is installed in
 * (Root of project = directory with package.json)
 *
 * If mad-utils is standalone (for development), return path relative to
 * root of mad-utils
 *
 * Example:
 *     // Project directory: `/projs/my-app`:
 *     pathFromRoot(`src/index.js`);
 *     // => `/projs/my-app/src/index.js`
 *
 * @param {string} filePathFromRoot File path to return relative to the root
 * @return {string} Given file path relative to project root path, or project path if
 *                  relative path arg not provided
 */
export const pathFromRoot = (filePathFromRoot = ``) => path.join(rootPath, filePathFromRoot);

/**
 * Returns true if the given filename was run as a script
 *
 * @param {string} filePathOrName Name of file (or path to file) where the
 *                                command was run from
 * @return {boolean} true if file with given name was run as a script
 */
export const wasRunAsScript = (filePathOrName: string, argv = process.argv, TAG = ``): boolean => {
    const findFilename = new RegExp(path.basename(filePathOrName).replace(`.`, `.`));
    const wasScript = !!findFilename.exec(argv[1]);

    if (wasScript && isVerbose) {
        console.log(`${TAG ? TAG + ' ' : ''}Running ${filePathOrName} as a standalone script...`);
    }

    return wasScript;
};

export type StrOrRegexp = string | RegExp;

/**
 * Replace matching location in given file
 *
 * Text in given file that matches the provided regex or string gets replaced
 * with the provided replacement text
 *
 * [SYNCHRONOUS]
 *
 * @param {string} filePath File to perform replacement in
 * @param {string|RegExp} findStrOrRE Match to perform against content of the
 *                                    file at filePath
 * @param {string} replace Text to replace the matching text with
 *
 * @return {string} File content after the replacement
 */
export function replaceInFile(filePath: string, findStrOrRE: StrOrRegexp, replace: string): string {
    const fileData = readFileSync(filePath).toString();

    // Hack required to make typings happy
    const cleanfileData =
        typeof findStrOrRE === `string`
            ? fileData.replace(findStrOrRE, replace)
            : fileData.replace(findStrOrRE, replace);

    writeFileSync(filePath, cleanfileData, {encoding: `utf8`});

    log.silly(`replaceInFile: new ${filePath} contents:`, cleanfileData);

    return cleanfileData;
}

/**
 * Traverse given folder & return list of all .js inodes it contains
 * [SYNCHRONOUS]
 *
 * @param {string} dir - absolute path to directory.
 * @param {boolean} excludeMin - If true, exclude all .min.js files.
 * @return {string[]} List of all non-minified .js inodes in given directory.
 */
export const getJsFilesInDir = (dir: string, excludeMin = true): string[] =>
    readdirSync(dir)
        .filter(endsInDotJs)
        .filter(excludeMin ? isNonMinFile : () => true);

/**
 * Search a given directory for an inode (file or folder) with the given name
 *
 * [SYNCHRONOUS]
 *
 * @param {string} dir Absolute path to directory to check for file of given name
 * @param {string} filename name of inode to look for in directory
 * @return {boolean} Return true if given filename is present in folder at given path
 */
export const isFileInDir = (dir: string, filename: string): boolean =>
    !!readdirSync(dir).find(file => file === filename);
