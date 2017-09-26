"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a function's source code in nicely spaced array format.
 * @param {Function} func - The function to examine
 * @return {string[]} function source code in an array, where each 'line' is an item.
 */
function getFnAsArr(func) {
    return func.toString().split('\n');
}
exports.getFnAsArr = getFnAsArr;
/**
 * @alias getFnAsArr
 */
exports.getFunctionSrcAsArray = getFnAsArr;
/***************************************** LOOP UTILITIES *****************************************/
/**
 * Run given function N times, returning results as an array containing all N return vals.
 * @param {number} n - Number of times to run given function.
 * @param {Function} func - Function to repeatedly run.
 * @return {Array<any>} Array containing function return values.
 */
exports.loopN = function (n, func) {
    var retArr = [];
    for (var i = 0; i < n; i++) {
        retArr.push(func());
    }
    return retArr;
};
/** Run given function 2X, returning results as an array containing both return vals. */
exports.loop2 = function (func) { return exports.loopN(2, func); };
/** Run given function 3X, returning results as an array containing all 3 return vals. */
exports.loop3 = function (func) { return exports.loopN(3, func); };
/** Run given function 4X, returning results as an array containing all 4 return vals. */
exports.loop4 = function (func) { return exports.loopN(4, func); };
/** Run given function 5X, returning results as an array containing all 5 return vals. */
exports.loop5 = function (func) { return exports.loopN(5, func); };
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
/**
 * TODO test delegateAll
 *
 * Mixin creator.
 *
 * @param {Object|ClassConstructor} self Object delegating calls to input
 * @param {Object|ClassInstance} input Object being delegated to by self
 * @return {Object} Conglomerate object: self with all public methods & values of input mixed in.
 *
 * @example delegateAll(this, input)
 */
function delegateAll(self, input) {
    Object.keys(input).forEach(function (k) {
        return Object.defineProperty(self, k, Object.getOwnPropertyDescriptor(input, k));
    });
    return self;
}
exports.delegateAll = delegateAll;
//# sourceMappingURL=function.js.map