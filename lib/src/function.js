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
//# sourceMappingURL=function.js.map