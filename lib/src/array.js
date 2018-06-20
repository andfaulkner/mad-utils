"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
/******************************************** MATCHING ********************************************/
/**
 * Returns true if array matchVals contains valToFind. Note that it uses simple JSON.stringify
 * for array and object comparison. Curried. Sane behaviour for matching against null,
 * undefined, NaN, etc. (e.g. NaN matched against an array with NaN returns true).
 * @param {Array<any>} matchVals - Array to check for item matching valToFind.
 * @param {any} valToFind - Value to search for in matchVals.
 * @return {boolean} true if valToFind is found in matchVals.
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
 * Determine if an array contains a given value.
 * @param {Array} arr Array to check for the given value
 * @param {string} val - value to search for in the array.
 * @return {boolean} true if arr contains val
 */
exports.contains = function (arr, val) {
    return arr.some(function (item) {
        return item === val ||
            (typeof item === 'number' && typeof val === 'number' && isNaN(item) && isNaN(val));
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
// tslint:disable-next-line:no-magic-numbers
function first3(arrOrStr) {
    return arrOrStr.slice(0, 3);
}
exports.first3 = first3;
function last2(arrOrStr) {
    return arrOrStr.slice(-2);
}
exports.last2 = last2;
// tslint:disable-next-line:no-magic-numbers
function last3(arrOrStr) {
    return arrOrStr.slice(-3);
}
exports.last3 = last3;
function firstN(arrOrStr, n) {
    if (typeof arrOrStr === 'string')
        return arrOrStr.slice(0, n);
    return arrOrStr.length >= n ? exports.arrayN(n).map(function (__, idx) { return arrOrStr[idx]; }) : arrOrStr;
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
 * Create array of requested # of repeats of given fillVal, or undefined if no fillVal given
 * @param {number} len Length of array to create
 * @param {RealAny} fillVal Item to repeat 'len' number of times {OPT}
 * @return {Array<void|typeof fillVal>} Array w 'len' # of fillVal arg (or undefined) repeats
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
 * Append all items in arr2 to the end of arr1 (non-mutatively) and return it.
 * If either arr1 or arr2 are undefined, it ignores it and just returns the other.
 * If both are undefined, it returns [].
 * If a non-array value besides null is given, it wraps the item in an array before
 * performing the concatenation.
 * NON-MUTATIVE
 *
 * @param {Array<RealAny>|RealAny} arr1 - If array, concatenate arr2 to the end. If value, wrap
 *                                        in array before concatenating (e.g. 3 is treated as [3].
 * @param {Array<RealAny>|RealAny} arr2 - Array or value to concatenate to the end of arr1
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
 * Remove falsy values from the given array
 * By default removes all falsy val types, but 2nd param can set it to only rm certain falsy types
 *
 * @param {Array} arr Array containing any values of any type
 * @param {string} falsyTypes: 'allFalsy'  [DEFAULT] Remove all falsy values
 *                             'nullUndef' Remove only null & undefined values
 *                             'keep0'     Remove all falsy values except 0
 *                             'keepStr'   Remove all falsy values except ''
 * @return {Array} arr param with falsy vals of set types removed (default: remove all falsy vals)
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
 * Add item to array if item not already present in array.
 * @param {Array} arr Array to potentially add item to
 * @param {any} newItem Item to potentially add to array (if array doesn't already contain it)
 * @return {Array} Initially given array, with item potentially added.
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
 * Split large multiline string into array where each line is an item. Also removes blank lines.
 * @param {String} str - Multiline string to split into array where each line is an array item.
 *                       Splits on '\n' char.
 * @param {Object} opts::
 *        @param {boolean} preserveEmptyLines - If true, remove all blank lines. Off by default.
 * @return {Array<string>} Array where each item is a line from the input string, with falsy
 *                         values removed.
 */
exports.splitLines = function (str, opts) {
    if (opts === void 0) { opts = { preserveEmptyLines: false }; }
    return opts.preserveEmptyLines ? str.toString().split('\n') : exports.rmAllFalsy(str.toString().split('\n'));
};
function countOccurrences(arr, value) {
    var map = new Map();
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        map.set(item, (map.get(item) || 0) + 1);
    }
    return typeof value === 'undefined' ? map : map.get(value);
}
exports.countOccurrences = countOccurrences;
exports.count = countOccurrences;
exports.countAll = countOccurrences;
exports.countItems = countOccurrences;
exports.countArrayItems = countOccurrences;
function removeDuplicates(coll) {
    var occurrences = countOccurrences(coll).keys();
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
 * Namespace for certain "reversed" operations.
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
function randomAbsIntBelow(len) {
    return Math.floor(Math.random() * len);
}
// TODO make sample work for non-standard iterables
// TODO test sample for Sets
function sample(coll) {
    if (types_iso_1.isArray(coll)) {
        return coll[Math.floor(randomAbsIntBelow(coll.length))];
    }
    if (typeof coll === 'string' || coll instanceof String) {
        return coll.split('')[randomAbsIntBelow(coll.split('').length)];
    }
    if (coll instanceof Map || coll instanceof Set) {
        console.log('sample :: in first map test');
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
 * Recursive function to help flatten an array.
 */
var _flatWalker = function (accIn, arr) {
    return arr.reduce(function (acc, cur) { return (types_iso_1.isArray(cur) ? _flatWalker(acc, cur) : acc.concat(cur)); }, accIn);
};
/**
 * @export Flatten an array
 * @param {Array} arr Array (or set of nested arrays) to flatten
 * @return {Array} Flattened array. e.g. [1, 2, [3, 4, [5]]] becomes [1, 2, 3, 4, 5]
 */
exports.flatten = function (arr) { return _flatWalker([], arr); };
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