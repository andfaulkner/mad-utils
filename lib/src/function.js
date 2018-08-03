"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a function's source code in nicely spaced array format
 * @param {Function} func The function to examine
 * @return {string[]} function source code in an array, where each 'line' is an item
 */
exports.getFnAsArr = function (func) { return func.toString().split('\n'); };
exports.getFunctionSrcAsArray = exports.getFnAsArr;
/***************************************** LOOP UTILITIES *****************************************/
/**
 * Run given function N times, returning results as an array containing all N return vals
 * @param {number} n Number of times to run given function
 * @param {Function} func Function to repeatedly run
 * @return {Array<any>} Array containing function return values
 */
exports.loopN = function (n, func) {
    var retArr = [];
    for (var i = 0; i < n; i++)
        retArr.push(func());
    return retArr;
};
/** Run given function 2X, returning results as an array containing both return vals */
exports.loop2 = function (func) { return exports.loopN(2, func); };
/** Run given function 3X, returning results as an array containing all 3 return vals */
exports.loop3 = function (func) { return exports.loopN(3, func); };
/** Run given function 4X, returning results as an array containing all 4 return vals */
exports.loop4 = function (func) { return exports.loopN(4, func); };
/** Run given function 5X, returning results as an array containing all 5 return vals */
exports.loop5 = function (func) { return exports.loopN(5, func); };
/**
 * Rough method to list a function's arguments/parameters (untyped)
 * @param {Function} func Function to get the arguments/params of
 * @return {string[]} List of argument names in string form e.g.: ['id', 'name', age']
 */
exports.getArgNames = function (func) {
    var args = func
        .toString()
        .split('\n')
        .join('')
        .split(/[\(\)]/g)[1]
        .split(/ *, */g);
    return args.length === 1 && args[0] === '' ? [] : args;
};
exports.getArgsFromFunc = exports.getArgNames;
exports.getArgs = exports.getArgNames;
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
function condSwitch(cond, val) {
    var condValPairsAndOrDefVal = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        condValPairsAndOrDefVal[_i - 2] = arguments[_i];
    }
    if (cond)
        return val;
    if (condValPairsAndOrDefVal.length === 1)
        return condValPairsAndOrDefVal[0];
    while (condValPairsAndOrDefVal.length > 1) {
        if (condValPairsAndOrDefVal[0])
            return condValPairsAndOrDefVal[1];
        exports.loop2(function () { return condValPairsAndOrDefVal.shift(); });
    }
    if (condValPairsAndOrDefVal.length === 0) {
        throw new Error('No matching val found. To avoid throwing in this scenario, pass args to consSwitch' +
            'in pairs, where #1 is the test, and #2 is the return val if test is truthy - then ' +
            'follow them with a final "else" value to return if no other tests are truthy');
    }
    return condValPairsAndOrDefVal[0];
}
exports.condSwitch = condSwitch;
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
function throttle(cb, wait, immediate) {
    if (immediate === void 0) { immediate = true; }
    var blocked = false;
    var retVal = function () {
        var fnArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fnArgs[_i] = arguments[_i];
        }
        if (!blocked) {
            blocked = true;
            setTimeout(function () {
                blocked = false;
                if (!immediate)
                    return cb.apply(void 0, fnArgs);
            }, wait);
            if (immediate)
                cb.apply(void 0, fnArgs);
        }
    };
    return retVal;
}
exports.throttle = throttle;
/**
 * Run all functions in the given array, return results of each
 */
exports.runAll = function (arr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var res = [];
    arr.forEach(function (fn) { return res.push(fn.apply(void 0, args)); });
    return res;
};
//# sourceMappingURL=function.js.map