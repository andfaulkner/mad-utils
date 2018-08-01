"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("./string");
/******************************************** EXPORTS *********************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings
 * @param {Object} obj Object to convert to a JSON string
 * @return {string} Stringified form of JSON.stringify with functions kept around
 */
exports.jsonStringifyWFuncs = function (obj) {
    return JSON.stringify(obj, function (key, value) { return (typeof value === 'function' ? value.toString() : value); });
};
/**
 * Initial common set of cleaning tasks for prepping stringified functions of any type (lambda
 * arrow functions vs classic function declarations or assignments) for use in new Function
 * @param {string} valStr Stringified function, to perform clean on
 * @return {string} partially cleaned function string
 */
var _baseCleanFuncStrForNewFunc = function (valStr) {
    return valStr
        .replace(/\}$/, '}')
        .replace(/\'/g, '"')
        .replace(/\n/g, string_1.newlineStr);
};
/**
 * Extract arguments from a function converted to a string (i.e. from the
 * function source code text)
 * @param {Function} valStr Stringified function
 * @return {string[]} Arguments pulled from the stringified function
 */
var _extractArgsFromFuncStr = function (valStr) {
    return valStr
        .match(/^[^\(]*\([^\)]*\)/)[0]
        .replace(/^[^\(]*\(/, '')
        .replace(/\)/g, '')
        .split(/,\s*/);
};
//# sourceMappingURL=json.js.map