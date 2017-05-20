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
