import {RealAny, isArray} from './types-iso';

/**
 * Return a function's source code in nicely spaced array format
 * @param {Function} func The function to examine
 * @return {string[]} function source code in an array, where each 'line' is an item
 */
export const getFnAsArr = (func: Function): string[] => func.toString().split('\n');
export {getFnAsArr as getFunctionSrcAsArray};

/***************************************** LOOP UTILITIES *****************************************/
/**
 * Run given function N times, returning results as an array containing all N return vals
 * @param {number} n Number of times to run given function
 * @param {Function} func Function to repeatedly run
 * @return {Array<any>} Array containing function return values
 */
export const loopN = <T>(n: number, func: ((...args) => T)): T[] => {
    let retArr = [];
    for (let i = 0; i < n; i++) retArr.push(func());
    return retArr;
};

/**
 * Run given function 2X, returning results as an array containing both return vals
 * @param {Function} func Function to run 2X
 * @return {T[]} Array of return values (one from each run of the function)
 */
export const loop2 = <T>(func: ((...args) => T)): T[] => loopN(2, func);

/**
 * Run given function 3X, returning results as an array containing all 3 return vals
 * @param {Function} func Function to run 3X
 * @return {T[]} Array of return values (one from each run of the function)
 */
export const loop3 = <T>(func: ((...args) => T)): T[] => loopN(3, func);

/**
 * Run given function 4X, returning results as an array containing all 4 return vals
 * @param {Function} func Function to run 4X
 * @return {T[]} Array of return values (one from each run of the function)
 */
export const loop4 = <T>(func: ((...args) => T)): T[] => loopN(4, func);

/**
 * Run given function 5X, returning results as an array containing all 5 return vals
 * @param {Function} func Function to run 5X
 * @return {T[]} Array of return values (one from each run of the function)
 */
export const loop5 = <T>(func: ((...args) => T)): T[] => loopN(5, func);

/**
 * Rough method to list a function's arguments/parameters (untyped)
 * @param {Function} func Function to get the arguments/params of
 * @return {string[]} List of argument names in string form e.g.: ['id', 'name', age']
 */
export const getArgNames = (func: Function): string[] => {
    const args = func
        .toString()
        .split('\n')
        .join('')
        .split(/[\(\)]/g)[1]
        .split(/ *, */g);
    return args.length === 1 && args[0] === '' ? [] : args;
};

export {getArgNames as getArgsFromFunc};
export {getArgNames as getArgs};

/****************************************** CONDITIONALS ******************************************/
/**
 * Function-based switch expression
 *
 * Any odd number of arguments can be given, where for each pair of args, the
 * 1st arg is a condition (which passes if truthy), and the 2nd is the value
 * returned if the condition passes
 * If no conditions pass, the final arg given (default val) is returned
 * If no final arg is given, it instead throws an error
 *
 * If using prettier, it's useful to place prettier-ignore directive above usage, for readability
 *
 * Each pair of arguments:
 *     @param {boolean|any} cond Condition to check for truthiness
 *     @param {any} val Value returned if the test condition is truthy
 * Final argument:
 *     @param {any} defVal Value returned if no test conditions are met
 *
 * @example If size is 'tiny', returns 12; if size is 'small', returns 14; otherwise, returns 20:
 *     // prettier-ignore
 *     condSwitch(size === 'tiny',  12,
 *                size === 'small', 14,
 *                                  20);
 */
export function condSwitch(
    cond: boolean | RealAny,
    val: RealAny,
    ...condValPairsAndOrDefVal: RealAny[]
): RealAny | never {
    if (cond) return val;
    if (condValPairsAndOrDefVal.length === 1) return condValPairsAndOrDefVal[0];

    while (condValPairsAndOrDefVal.length > 1) {
        if (condValPairsAndOrDefVal[0]) return condValPairsAndOrDefVal[1];
        loop2(() => condValPairsAndOrDefVal.shift());
    }

    if (condValPairsAndOrDefVal.length === 0) {
        throw new Error(
            'No matching val found. To avoid throwing in this scenario, pass args to consSwitch' +
                'in pairs, where #1 is the test, and #2 is the return val if test is truthy - then ' +
                'follow them with a final "else" value to return if no other tests are truthy'
        );
    }

    return condValPairsAndOrDefVal[0];
}

/************************************* RUN TIMING / LIMITING **************************************/
/**
 * Throttle function [cb] such that it only runs 1X within given interval ([wait] arg - in ms)
 * Called at beginning of interval if [immediate] is true (default), otherwise run at end
 *
 * @param {Function} cb Call max 1X/[wait]ms & call at wait start if [immediate]=true {default}
 * @param {number} wait Time to wait before next call of function allowed
 * @param {boolean} immediate If true, call at the beginning of the wait interval {default=true}
 *
 * @example throttle(() => console.log('Called!'), 1000);
 *          // 10 "clicks" within 1 second will output 'Called!' only once, on initial "click"
 */
export function throttle<CB extends () => any>(
    cb: CB,
    wait: number,
    immediate?: boolean
): () => void;

export function throttle<A1>(
    cb: (a1: A1) => any,
    wait: number,
    immediate?: boolean
): (a1: A1) => void;

export function throttle<A1, A2>(
    cb: (a1: A1, a2: A2) => any,
    wait: number,
    immediate?: boolean
): (a1: A1, a2: A2) => void;

export function throttle<A1, A2, A3>(
    cb: (a1: A1, a2: A2, a3: A3) => any,
    wait: number,
    immediate?: boolean
): (a1: A1, a2: A2, a3: A3) => void;

export function throttle<A1, A2, A3, A4>(
    cb: (a1: A1, a2: A2, a3: A3, a4: A4) => any,
    wait: number,
    immediate?: boolean
): (a1: A1, a2: A2, a3: A3, a4: A4) => void;

export function throttle<A1, A2, A3, A4, A5>(
    cb: (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => any,
    wait: number,
    immediate?: boolean
): (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => void;

export function throttle<A>(
    cb: (...fnArgs: A[]) => any,
    wait: number,
    immediate = true
): (...fnArgs: A[]) => void {
    let blocked = false;
    const retVal = (...fnArgs: A[]) => {
        if (!blocked) {
            blocked = true;
            setTimeout(() => {
                blocked = false;
                if (!immediate) return cb(...fnArgs);
            }, wait);
            if (immediate) cb(...fnArgs);
        }
    };
    Object.keys(cb).forEach(k => (retVal[k] = cb[k]));
    return retVal;
}

/**
 * Run all functions in given array [arr], optionally with each argument after
 * the 1st as args passed to each function; return results in an array
 */
export const runAll = <R = any>(arr: Function[], ...args: any[]): R[] => {
    let res = [];
    arr.forEach(fn => res.push(fn(...args)));
    return res;
};
