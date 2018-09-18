"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
/******************************************** MATCHING ********************************************/
/**
 * [Curried]
 * Returns true if array matchVals contains [valToFind]
 * Uses simple JSON.stringify for array and object comparison
 * Sane behaviour for matching against null, undefined, NaN, etc. (e.g. NaN
 * matched against an array with NaN returns true)
 *
 * @param {Array<any>} matchVals Array to check for item matching valToFind
 * @param {any} valToFind Value to search for in matchVals
 *
 * @return {boolean} true if valToFind is found in matchVals
 */
exports.matchAny = function (matchVals) { return function (valToFind) {
    var isValToFindObj = typeof valToFind === 'object' && valToFind != null;
    var cleanValToFind = isValToFindObj ? JSON.stringify(valToFind) : valToFind;
    var isValToFindNaN = typeof valToFind === 'number' && isNaN(valToFind);
    return matchVals.some(function (val) {
        if (isValToFindNaN && typeof val === 'number' && isNaN(val))
            return true;
        return isValToFindObj
            ? cleanValToFind === (val && JSON.stringify(val))
            : cleanValToFind === val;
    });
}; };
/**
 * Determine if array [arr] contains [value]
 * @param {Array} arr Array to check for the given value
 * @param {string} value Value to search for in the array
 * @return {boolean} true if arr contains val
 */
exports.contains = function (arr, value) {
    return arr.some(function (item) {
        return item === value ||
            (typeof item === 'number' && typeof value === 'number' && isNaN(item) && isNaN(value));
    });
};
exports.includes = exports.contains;
function first(arrOrStr) {
    return arrOrStr[0];
}
exports.first = first;
function second(arrOrStr) {
    return arrOrStr[1];
}
exports.second = second;
function third(arrOrStr) {
    return arrOrStr[2];
}
exports.third = third;
function last(arrOrStr) {
    return arrOrStr.slice(-1)[0];
}
exports.last = last;
function secondLast(arrOrStr) {
    return arrOrStr.slice(-2, -1)[0];
}
exports.secondLast = secondLast;
function thirdLast(arrOrStr) {
    // tslint:disable-next-line:no-magic-numbers
    return arrOrStr.slice(-3, -2)[0];
}
exports.thirdLast = thirdLast;
function first2(arrOrStr) {
    return arrOrStr.slice(0, 2);
}
exports.first2 = first2;
function first3(arrOrStr) {
    // tslint:disable-next-line:no-magic-numbers
    return arrOrStr.slice(0, 3);
}
exports.first3 = first3;
function last2(arrOrStr) {
    return arrOrStr.slice(-2);
}
exports.last2 = last2;
/**
 * Return last 3 characters in a string
 */
function last3(arrOrStr) {
    // tslint:disable-next-line:no-magic-numbers
    return arrOrStr.slice(-3);
}
exports.last3 = last3;
function firstN(arrOrStr, num) {
    if (typeof arrOrStr === 'string')
        return arrOrStr.slice(0, num);
    return arrOrStr.length >= num ? exports.arrayN(num).map(function (__, idx) { return arrOrStr[idx]; }) : arrOrStr;
}
exports.firstN = firstN;
function lastN(arrOrStr, n) {
    return arrOrStr.slice(-1 * n);
}
exports.lastN = lastN;
//
// CREATE NEW ARRAY
//
/**
 * Create array of [len] number of repeats of given [fillVal], or undefined
 * if [fillVal] not given
 * @param {number} len Length of array to create
 * @param {RealAny} fillVal Item to repeat 'len' number of times {OPT}
 * @return {Array<void|typeof fillVal>} Array w 'len' # of fillVal arg (or
 *                                      undefined) repeats
 */
exports.arrayN = function (len, fillVal) {
    var nonIntegerFirstArgErr = 'mad-utils :: first arg to arrayN must be an integer';
    if (typeof len !== 'number' || isNaN(parseInt(len.toString(), 10))) {
        throw new TypeError(nonIntegerFirstArgErr);
    }
    if (len < 0)
        throw new TypeError('mad-utils :: first arg to arrayN must be an integer above 0');
    if (len.toString().match(/\./))
        throw new TypeError(nonIntegerFirstArgErr);
    var cleanLen = typeof len === 'string' ? parseInt(len, 10) : len;
    return typeof fillVal !== 'undefined'
        ? Array.from(Array(cleanLen)).map(function (__) { return fillVal; })
        : Array.from(Array(cleanLen));
};
function withoutFirst(arrOrStr) {
    return arrOrStr.slice(1);
}
exports.withoutFirst = withoutFirst;
function withoutLast(arrOrStr) {
    return arrOrStr.slice(0, -1);
}
exports.withoutLast = withoutLast;
function withoutFirst2(arrOrStr) {
    return arrOrStr.slice(2);
}
exports.withoutFirst2 = withoutFirst2;
function withoutFirst3(arrOrStr) {
    return arrOrStr.slice(3);
}
exports.withoutFirst3 = withoutFirst3;
function withoutLast2(arrOrStr) {
    return arrOrStr.slice(0, -2);
}
exports.withoutLast2 = withoutLast2;
// tslint:disable-next-line: no-magic-numbers
function withoutLast3(arrOrStr) {
    return arrOrStr.slice(0, -3);
}
exports.withoutLast3 = withoutLast3;
function withoutLastN(arrOrStr, numToRm) {
    return arrOrStr.slice(0, numToRm === 0 ? arrOrStr.length : -1 * numToRm);
}
exports.withoutLastN = withoutLastN;
function withoutFirstN(arrOrStr, numToRm) {
    return arrOrStr.slice(1 * numToRm);
}
exports.withoutFirstN = withoutFirstN;
/**
 * [Non-mutative]
 *
 * Append all items in arr2 to the end of arr1 (non-mutatively) and return it
 *     If either arr1 or arr2 are undefined, it ignores it and just returns the other
 *     If both are undefined, it returns []
 *     If a non-array value besides null is given, it wraps the item in an array before
 *     performing the concatenation
 *
 * @param {Array<RealAny>|RealAny} arr1 If array, concatenate arr2 to the end
 *                                      If value, wrap in arr before concatenating
 *                                      (e.g. 3 is treated as [3]
 * @param {Array<RealAny>|RealAny} arr2 Array or value to concatenate to the end of arr1
 * @return {Array<RealAny>} Result of attaching arr2 to the end of arr1
 */
function append(arr1, arr2) {
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
    var first2Arrs = _cleanArrForAppend(arr1).concat(_cleanArrForAppend(arr2));
    return arrs.length > 0 ? arrs.reduce(function (acc, arr) { return acc.concat(arr); }, first2Arrs) : first2Arrs;
}
exports.append = append;
function removeMatches(arr1, arr2) {
    return arr1.filter(function (arr1Item) {
        if (types_iso_1.isArray(arr2)) {
            return arr2.every(function (arr2Item) { return arr2Item !== arr1Item; });
        }
        return arr1Item !== arr2;
    });
}
exports.removeMatches = removeMatches;
/**
 * Remove falsy values from given array [arr]
 * By default removes all falsy val types, but 2nd param can set it to only rm
 * certain falsy types ['allFalsy', 'keep0', 'keepStr', 'nullUndef']
 *
 * @param {Array} arr Array containing any values of any type
 * @param {string} falsyTypes: `allFalsy`  [DEFAULT] Remove all falsy values
 *                             `nullUndef` Remove only null & undefined values
 *                             `keep0`     Remove all falsy values except 0
 *                             `keepStr`   Remove all falsy values except ``
 * @return {Array} arr Duplicate of initial array, with falsy values of set
 *                     types removed {Default: remove all falsy values}
 */
exports.rmAllFalsy = function (arr, falsyType) {
    if (falsyType === void 0) { falsyType = 'allFalsy'; }
    switch (falsyType) {
        case undefined:
        case 'allFalsy':
            return arr.filter(function (val) { return !!val; });
        case 'keep0':
            return arr.filter(function (val) { return !!val || val === 0; });
        case 'keepStr':
            return arr.filter(function (val) { return !!val || val === ''; });
        case 'nullUndef':
            return arr.filter(function (val) { return val !== null && typeof val !== 'undefined'; });
        default:
            throw new Error("If set, Array.compact arg must be 1 of 'allFalsy', " +
                "'nullUndef', 'keep0', or 'keepStr'");
    }
};
exports.compact = exports.rmAllFalsy;
exports.rmFalsyVals = exports.rmAllFalsy;
/**
 * Add item to array if item not already present in array
 *
 * @param {Array} arr Array to potentially add item to
 * @param {any} newItem Item to potentially add to array (if array doesn't
 *                      already contain it)
 * @return {Array} Initially given array, with item potentially added
 */
function pushIfUniq(arr, newItem) {
    if (!arr.some(function (arrItem) { return arrItem === newItem; }))
        arr.push(newItem);
    return arr;
}
exports.pushIfUniq = pushIfUniq;
exports.pushIfNew = pushIfUniq;
exports.pushUniq = pushIfUniq;
/**
 * Split large multiline string into array where each line is an item
 * Also removes blank lines
 *
 * @param {String} str Multiline string to split into array, where each line is
 *                     an array item (it splits on `\n` characters)
 * @param {Object} opts::
 *                 @param {boolean} preserveEmptyLines If true, remove all blank lines
 *                                                     Off by default
 * @return {Array<string>} Array where each item is a line from the input
 *                         string, with falsy values removed
 */
exports.splitLines = function (str, opts) {
    if (opts === void 0) { opts = { preserveEmptyLines: false }; }
    return opts.preserveEmptyLines ? str.toString().split('\n') : exports.rmAllFalsy(str.toString().split('\n'));
};
/**
 * Build map of how many times each char or item appears in given array or string
 */
var buildOccurrencesMap = function (haystack) {
    if (!haystack || haystack.length === 0)
        return new Map();
    var map = new Map();
    for (var _i = 0, haystack_1 = haystack; _i < haystack_1.length; _i++) {
        var curItem = haystack_1[_i];
        map.set(curItem, (map.get(curItem) || 0) + 1);
    }
    return map;
};
/**
 * Count number of occurrences of value [needle] in array/string [haystack]
 *
 * @param {any|string} needle Item/character to search for
 * @param {any[]|string} haystack Array/string to search for the item/character
 * @return {Map<any, number>} Map of each item in the array vs its number of
 *                            occurences
 */
function countOccurrences(needle, haystack) {
    return buildOccurrencesMap(haystack).get(needle) || 0;
}
exports.countOccurrences = countOccurrences;
exports.count = countOccurrences;
exports.countAll = countOccurrences;
exports.countItems = countOccurrences;
exports.countArrayItems = countOccurrences;
function removeDuplicates(coll) {
    var occurrences = buildOccurrencesMap(coll).keys();
    var out = [];
    var cur;
    while ((cur = occurrences.next().value))
        out.push(cur);
    return typeof coll === 'string' ? out.join('') : out;
}
exports.removeDuplicates = removeDuplicates;
exports.uniq = removeDuplicates;
exports.uniqVals = removeDuplicates;
exports.unique = removeDuplicates;
exports.uniqueVals = removeDuplicates;
exports.removeDuplicateVals = removeDuplicates;
exports.removeDuplicateItems = removeDuplicates;
/**
 * Namespace for certain "reversed" operations
 */
exports.without = {
    last: withoutLast,
    last2: withoutLast2,
    last3: withoutLast3,
    lastN: withoutLastN,
    first: withoutFirst,
    first2: withoutFirst2,
    first3: withoutFirst3,
    firstN: withoutFirstN,
};
/**
 * Generate random absolute value integer between 0 and given integer [maxInt]
 * Inclusive - can generate both 0 and [maxInt]
 * @param {number} maxInt Maximum number that can be generated
 * @return {number} Random absolute value integer from 0 to the given integer
 */
function randomAbsIntBelow(maxInt) {
    return Math.floor(Math.random() * maxInt);
}
// TODO make sample work for non-standard iterables
// Implementation
function sample(coll) {
    if (types_iso_1.isArray(coll)) {
        return coll[Math.floor(randomAbsIntBelow(coll.length))];
    }
    if (typeof coll === 'string' || coll instanceof String) {
        return coll.split('')[randomAbsIntBelow(coll.split('').length)];
    }
    if (coll instanceof Map || coll instanceof Set) {
        if (coll.size === 0)
            return [];
        return Array.from(coll)[randomAbsIntBelow(coll.size)];
    }
    // Non-map or set objects
    if (typeof coll === 'object') {
        var objKeys = Object.keys(coll);
        if (objKeys.length === 0)
            return;
        var selectedKey = objKeys[randomAbsIntBelow(objKeys.length)];
        return [selectedKey, coll[selectedKey]];
    }
}
exports.sample = sample;
/**
 * Recursive function to help flatten an array
 */
var _flatWalker = function (accIn, arr) {
    return arr.reduce(function (acc, cur) { return (types_iso_1.isArray(cur) ? _flatWalker(acc, cur) : acc.concat(cur)); }, accIn);
};
/**
 * Deeply flatten an array ([arr])
 * Example: flatten([1, [2, [3, 4]], 5]); // => [1, 2, 3, 4, 5]
 *
 * @param {Array} arr Array (or set of nested arrays) to flatten
 * @return {Array} Flattened array
 */
exports.flatten = function (arr) { return _flatWalker([], arr); };
exports.smoosh = exports.flatten;
/***************************************** BARREL EXPORT ******************************************/
var types_iso_2 = require("./types-iso");
exports.isArray = types_iso_2.isArray;
/**************************************** INTERNAL HELPERS ****************************************/
/**
 * Ensures an array is an array
 */
function _cleanArrForAppend(a) {
    return a.constructor.name !== 'Array' && a.constructor.constructor.name !== 'Array' ? [a] : a;
}
//# sourceMappingURL=array.js.map