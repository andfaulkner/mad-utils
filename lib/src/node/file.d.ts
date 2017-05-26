/******************************************** LOGGING *********************************************/
import { NodeMadLogsInstance } from 'mad-logs/lib/node';
/******************************************** EXPORTS *********************************************/
/**
 * @param {string} fileOrDirPath - file system object being checked.
 * @return {boolean} true if given file system object is a directory (if false it's a file)
 */
export declare const isDir: (fileOrDirPath: string) => boolean;
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
export declare const replaceInFile: (filePath: string, find: string | RegExp, replace: string, logger?: NodeMadLogsInstance) => string;
/**
 * Return path relative to root of project mad-utils is installed in - or if mad-utils is
 * standalone (for development), return path relative to root of mad-utils.
 * @param {string} filePathFromRoot - file path to return relative to the root
 * @return {string} Given file path relative to project root path, or project path if
 *                  relative path arg not provided
 */
export declare const pathFromRoot: (filePathFromRoot?: string) => string;
/**
 * Returns true if the given filename was run as a script
 *
 * @param {string} filename - name of the file the command was run from.
 */
export declare const wasRunAsScript: (filename: string, processArgv?: string[], TAG?: string) => boolean;
/**
 * Replace matching location in given file.
 * Text in given file that matches the provided regex or string gets replaced with the
 * provided replacement text.
 */
export declare function replaceInFile(filePath: string, findString: string, replace: string): string;
export declare function replaceInFile(filePath: string, findRegex: RegExp, replace: string): string;
export declare function replaceInFile(filePath: string, find: string | RegExp, replace: string): string;
