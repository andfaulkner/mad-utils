"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepFreeze = require("deep-freeze-strict");
/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/** Return last item in an array. */
exports.last = function (arr) { return arr.slice(-1)[0]; };
/** Return second last item in an array. */
exports.secondLast = function (arr) { return arr.slice(-2, -1)[0]; };
/** Return third last item in an array. */
exports.thirdLast = function (arr) { return arr.slice(-3, -2)[0]; };
/** Return last 2 items in an array. */
exports.last2 = function (arr) { return arr.slice(-2); };
/** Return last 3 items in an array. */
exports.last3 = function (arr) { return arr.slice(-3); };
/** Return last N items in an array. */
exports.lastN = function (arr, n) { return arr.slice(-1 * n); };
/** Return first item in an array. */
exports.first = function (arr) { return arr[0]; };
/** Return second item in an array. */
exports.second = function (arr) { return arr[1]; };
/** Return third item in an array. */
exports.third = function (arr) { return arr[2]; };
/** Return first 2 items in an array. */
exports.first2 = function (arr) { return arr.slice(0, 2); };
/** Return first 3 items in an array. */
exports.first3 = function (arr) { return arr.slice(0, 3); };
/**
 * Return first N items in an array. Returned undefined if you request too many items.
 */
function firstN(arr, n) {
    return (arr.length >= n)
        ? exports.arrayN(n).map(function (__, idx) { return arr[idx]; })
        : arr;
}
exports.firstN = firstN;
/**
 * Create empty array of given length.
 * @param {number} len - Length of array to create.
 */
exports.arrayN = function (len) { return Array.from(Array(len)); };
/**
 * Exclude the first few or the last few items.
 */
exports.withoutLast = function (arr) { return arr.slice(0, -1); };
exports.withoutLast2 = function (arr) { return arr.slice(0, -2); };
exports.withoutLast3 = function (arr) { return arr.slice(0, -3); };
exports.withoutLastN = function (arr, numToRm) { return arr.slice(0, -1 * numToRm); };
exports.withoutFirst = function (arr) { return arr.slice(1); };
exports.withoutFirst2 = function (arr) { return arr.slice(2); };
exports.withoutFirst3 = function (arr) { return arr.slice(3); };
exports.withoutFirstN = function (arr, numToRm) { return arr.slice(1 * numToRm); };
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
 * Append all items in arr2 to the end of arr1 (non-mutatively) and return it.
 * If either arr1 or arr2 are undefined, it ignores it and just returns the other.
 * If both are undefined, it returns [].
 * If a non-array value besides null is given, it wraps the item in an array before
 * performing the concatenation.
 *
 * @param {Array<RealAny>|RealAny} arr1 - If array, concatenate arr2 to the end. If value, wrap
 *                                        in array before concatenating (e.g. 3 is treated as [3].
 * @param {Array<RealAny>|RealAny} arr2 - Array or value to concatenate to the end of arr1
 * @return {Array<RealAny>} Result of attaching arr2 to the end of arr1
 */
exports.append = function (arr1, arr2) {
    var arrs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arrs[_i - 2] = arguments[_i];
    }
    var isArr1Undefined = typeof arr1 === 'undefined' || arr1 === null;
    var isArr2Undefined = typeof arr2 === 'undefined' || arr2 === null;
    if (arrs.length > 0) {
        arr1 = arr1 || [];
        arr2 = arr2 || [];
    }
    else if (isArr1Undefined && isArr2Undefined) {
        return [];
    }
    else if (isArr1Undefined) {
        return arr2;
    }
    else if (isArr2Undefined) {
        return arr1;
    }
    var cleanArr = function (arr) {
        return (arr.constructor.name !== 'Array' && arr.constructor.constructor.name !== 'Array')
            ? [arr] : arr;
    };
    var first2Arrs = cleanArr(arr1).concat(cleanArr(arr2));
    return (arrs.length > 0)
        ? arrs.reduce(function (acc, arr) { return acc.concat(arr); }, first2Arrs)
        : first2Arrs;
};
/********************************************* OBJECT *********************************************/
/**
 * Return a deep-frozen clone of a group of objects. Completely safe.
 * @param {...Object[]} args - Any # of objects to merge together into the merged clone object.
 * @return {Object} Frozen merged version of provided objects. Clones originals - no mutation.
 */
exports.assignClone = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return deepFreeze(Object.assign.apply(Object, [{}].concat(args)));
};
//# sourceMappingURL=array-collection.js.map