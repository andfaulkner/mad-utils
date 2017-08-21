import { RealAny } from './types-iso';

/**
 * Return a function's source code in nicely spaced array format.
 * @param {Function} func - The function to examine
 * @return {string[]} function source code in an array, where each 'line' is an item.
 */
export function getFnAsArr(func: Function): string[] {
    return func.toString().split('\n');
}

/**
 * @alias getFnAsArr
 */
export const getFunctionSrcAsArray = getFnAsArr;

/***************************************** LOOP UTILITIES *****************************************/
/**
 * Run given function N times, returning results as an array containing all N return vals.
 * @param {number} n - Number of times to run given function.
 * @param {Function} func - Function to repeatedly run.
 * @return {Array<any>} Array containing function return values.
 */
export const loopN =
    <T>(n: number, func: ((...args) => T)): T[] => {
        let retArr = [];
        for (let i = 0; i < n; i++) {
            retArr.push(func());
        }
        return retArr;
    };

/** Run given function 2X, returning results as an array containing both return vals. */
export const loop2 = <T>(func: ((...args) => T)): T[] => loopN(2, func);
/** Run given function 3X, returning results as an array containing all 3 return vals. */
export const loop3 = <T>(func: ((...args) => T)): T[] => loopN(3, func);
/** Run given function 4X, returning results as an array containing all 4 return vals. */
export const loop4 = <T>(func: ((...args) => T)): T[] => loopN(4, func);
/** Run given function 5X, returning results as an array containing all 5 return vals. */
export const loop5 = <T>(func: ((...args) => T)): T[] => loopN(5, func);


/****************************************** CONDITIONALS ******************************************/
/**
 * Function-based switch expression. Any odd number of arguments can be given. For each pair of args,
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
export function condSwitch(
    cond: boolean | RealAny,
    val: RealAny,
    ...condValPairsAndOrDefVal: RealAny[]): RealAny | never
{
    if (cond) return val;
    if (condValPairsAndOrDefVal.length === 1) return condValPairsAndOrDefVal[0];

    while(condValPairsAndOrDefVal.length > 1) {
        if (condValPairsAndOrDefVal[0]) return condValPairsAndOrDefVal[1];
        loop2(() => condValPairsAndOrDefVal.shift());
    }

    if (condValPairsAndOrDefVal.length === 0) {
        throw new Error(
            'No matching val found. To avoid throwing in this scenario, pass args to consSwitch' +
            'in pairs, where #1 is the test, and #2 is the return val if test is truthy - then ' +
            'follow them with a final "else" value to return if no other tests are truthy');
    }

    return condValPairsAndOrDefVal[0];
}
