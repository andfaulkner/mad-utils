/**
 * Return a function's source code in nicely spaced array format.
 * @param {Function} func - The function to examine
 * @return {string[]} function source code in an array, where each 'line' is an item.
 */
export declare function getFnAsArr(func: Function): string[];
/**
 * @alias getFnAsArr
 */
export declare const getFunctionSrcAsArray: typeof getFnAsArr;
