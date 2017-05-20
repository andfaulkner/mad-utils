"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var string_1 = require("./string");
var deepFreeze = require("deep-freeze-strict");
/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
exports.assignFrozenClone = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return deepFreeze(Object.assign.apply(Object, [{}].concat(args)));
};
/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
exports.get = function (propPath, obj) {
    var propPathClean = (typeof propPath === 'string') ? propPath.split('.')
        : propPath;
    return propPathClean
        .map(function (prop) { return typeof prop === 'number' ? parseInt(prop, 10) : prop; })
        .reduce(function (obj, propPathPart) {
        if (!(obj && obj[propPathPart]))
            return null;
        if (obj[propPathPart].constructor.name === 'array') {
            return (obj && obj[propPathPart]) ? obj[propPathPart] : null;
        }
    }, obj);
};
/**
 * Return true if val is (probably) a multilanguage string object.
 *
 * Not foolproof - assumes one of the languages is English, and that it's either Canadian, British,
 * or American English - or 'generic' English (with no locale specified).
 *
 * If English is not one of the languages, this will not work.
 *
 * TODO test this - a lot more.
 *
 * @param {val} val - Value to type check.
 * @return {boolean} true if object's properties suggest it's a multilanguage string object.
 */
exports.isMultilangTextObj = function (obj) {
    var englishVariants = ['en', 'en_ca', 'en_gb', 'en_us'];
    var matchingKey;
    return !!(typeof obj === 'object'
        && Object.keys(obj).length > 1
        && Object.keys(obj).find(function (key) {
            if (englishVariants.find(string_1.matchesIgnoreCase(key))) {
                matchingKey = key;
                return true;
            }
        })
        && typeof matchingKey === 'string'
        && types_1.isNonexistentOrString(obj[matchingKey]));
};
/**
 * Run the given function on the given object. Iterator operates on the value and key of any
 * object provided, in the order "val", "key".
 *
 * @param {Function} func - (val, key) => void | any. Function to iterates over provided object.
 * @param {T extends object} obj - Object to iterate over.
 * @return {T extends Object} Returns the object initially passed in (for chaining)
 */
exports.eachPair = function (func) { return function (obj) {
    Object.keys(obj).forEach(function (key) { return func(obj[key], key); });
    return obj;
}; };
/**
 * Determine if an object contains a given key.
 *
 * @param {Object} obj - Object to check for the given key
 * @param {string} matchKey - key to search for in obj.
 * @return {boolean} true if obj contains matchKey
 */
exports.hasKey = function (obj, matchKey) {
    if (typeof obj === 'object') {
        return Object.keys(obj).some(function (k) { return k === matchKey; });
    }
    return false;
};
//# sourceMappingURL=object.js.map