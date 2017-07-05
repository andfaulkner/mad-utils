import { RealAny } from './types-iso';
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
/***************************************** LOOP UTILITIES *****************************************/
/** Run given function 2X, returning results as an array containing both return vals. */
export declare const loop2: <T>(func: (...args: any[]) => T) => T[];
/** Run given function 3X, returning results as an array containing all 3 return vals. */
export declare const loop3: <T>(func: (...args: any[]) => T) => T[];
/** Run given function 4X, returning results as an array containing all 4 return vals. */
export declare const loop4: <T>(func: (...args: any[]) => T) => T[];
/** Run given function 5X, returning results as an array containing all 5 return vals. */
export declare const loop5: <T>(func: (...args: any[]) => T) => T[];
/**
 * Run given function N times, returning results as an array containing all N return vals.
 * @param {number} n - Number of times to run given function.
 * @param {Function} func - Function to repeatedly run.
 * @return {Array<any>} Array containing each return value of each run through the function.
 */
export declare const loopN: <T>(n: number, func: (...args: any[]) => T) => T[];
/****************************************** CONDITIONALS ******************************************/
/**
 * Function-based switch statement. Any odd number of arguments can be given. For each pair of args,
 * the 1st arg is a condition (which passes if truthy), and the 2nd is the value returned if the
 * condition passes. If no conditions pass, the final arg given to the function returned. If no
 * final arg is given, it instead throws an error.
 *
 * Each pair of arguments:
 *     @param {boolean|any} cond - condition to check for truthiness
 *     @param {any} val - value returned if the test condition is truthy.
 * Final argument:
 *     @param {any} defVal - value returned if no test conditions are met.
 *
 * @example If size is 'tiny', returns 12. If size is 'small', returns 14. Otherwise, returns 20:
 *     condSwitch(size === 'tiny',  12,
 *                size === 'small', 14,
 *                                  20);
 */
export declare function condSwitch(cond: boolean | RealAny, val: RealAny, ...condValPairsAndOrDefVal: RealAny[]): RealAny | never;
