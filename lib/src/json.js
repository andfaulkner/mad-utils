"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("./string");
var env_var_helpers_1 = require("env-var-helpers");
var fn = "mad-utils::enum --";
/******************************************** EXPORTS *********************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified form of JSON.stringify with functions kept around.
 */
exports.jsonStringifyWFuncs = function (obj) {
    return JSON.stringify(obj, function (key, value) {
        return typeof value === 'function' ? value.toString() : value;
    });
};
exports.jsonParseWFuncRehydrate_unsafe = function (json) {
    var objFromStrJSON = JSON.parse(json, function (key, val) {
        if (typeof val === 'function') {
            var isFuncStr = val.match(/^function\s+[a-zA-Z0-9_\$]*?\s*\([^\)]*\)[\s\n]*\{.*\}$/);
            var isLambdaStr = val.match(/^\([^\)]*\)\s\=>\s/);
            if (isLambdaStr || isFuncStr) {
                // Detect all args from function string, pull them into an array.
                var funcArgs = _extractArgsFromFuncStr(val);
                // Exclude unneeded parts in all function strings (both arrow & regular function)
                var funcStr = _baseCleanFuncStrForNewFunc(val);
                // Type-specific cleanups on function string (separate cleans for arrow & regular)
                if (isFuncStr) {
                    funcStr = funcStr.replace(/^function[^\(]\([^\)]*\)\s*\{\) => \{?/, '');
                }
                else if (isLambdaStr) {
                    funcStr = funcStr.replace(/^\([^\)]*\) => \{?/, '');
                }
                var newFunc = new (Function.bind.apply(Function, [void 0].concat(funcArgs, [funcStr])))();
                if (env_var_helpers_1.isVerbose)
                    console.log(fn + " jsonParseWFuncRehydrate_unsafe :: newFunc:", newFunc);
                return newFunc;
            }
        }
        return val;
    });
    if (env_var_helpers_1.isVerbose)
        console.log(fn + " JSONParseWFuncRehydrate_unsafe :: objFromStrJSON:", objFromStrJSON);
    return objFromStrJSON;
};
/**
 * Initial common set of cleaning tasks for prepping stringified functions of any type (lambda
 * arrow functions vs classic function declarations or assignments) for use in new Function.
 * @param {string} valStr - Stringified function, to perform clean on.
 * @return {string} partially cleaned function string.
 */
var _baseCleanFuncStrForNewFunc = function (valStr) { return valStr.replace(/\}$/, '}').replace(/\'/g, '"')
    .replace(/\n/g, string_1.newlineStr); };
/**
 * Extract arguments from a function converted to a string (i.e. from the
 * function source code text).
 * @param {Function} valStr - Stringified function.
 * @return {string[]} Arguments pulled from the stringified function
 */
var _extractArgsFromFuncStr = function (valStr) { return valStr.match(/^[^\(]*\([^\)]*\)/)[0]
    .replace(/^[^\(]*\(/, '')
    .replace(/\)/g, '')
    .split(/,\s*/); };
//# sourceMappingURL=json.js.map