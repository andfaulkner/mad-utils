"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var types_iso_1 = require("./types-iso");
function first(arrOrStr) { return arrOrStr[0]; }
exports.first = first;
function second(arrOrStr) { return arrOrStr[1]; }
exports.second = second;
function third(arrOrStr) { return arrOrStr[2]; }
exports.third = third;
function last(arrOrStr) { return arrOrStr.slice(-1)[0]; }
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
function first2(arrOrStr) { return arrOrStr.slice(0, 2); }
exports.first2 = first2;
// tslint:disable-next-line:no-magic-numbers
function first3(arrOrStr) { return arrOrStr.slice(0, 3); }
exports.first3 = first3;
function last2(arrOrStr) { return arrOrStr.slice(-2); }
exports.last2 = last2;
// tslint:disable-next-line:no-magic-numbers
function last3(arrOrStr) { return arrOrStr.slice(-3); }
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
 * Create array containing requested number of repeats of a given fillValue, or containing
 * requested number of repeats of undefined if no fillValue is given.
 * @param {number} len - Length of array to create.
 * @param {RealAny} fillValue [OPTIONAL]: Item to repeat 'len' number of times.
 * @return {Array<void|typeof fillValue>} Array containing 'len' # of repeats of 'fillValue'
 *                                        (or undefined if fillValue is not given)
 */
exports.arrayN = function (len, fillValue) {
    var nonIntegerFirstArgErr = 'mad-utils :: first arg to arrayN must be an integer';
    if (typeof len !== 'number' || isNaN(parseInt(len.toString(), 10))) {
        throw new TypeError(nonIntegerFirstArgErr);
    }
    if (len < 0) {
        throw new TypeError('mad-utils :: first arg to arrayN must be an integer above 0');
    }
    if (len.toString().match(/\./)) {
        throw new TypeError(nonIntegerFirstArgErr);
    }
    var cleanLen = (typeof len === 'string') ? parseInt(len, 10) : len;
    if (fillValue)
        return Array.from(Array(cleanLen)).map(function (item) { return fillValue; });
    return Array.from(Array(cleanLen));
};
function withoutFirst2(arrOrStr) {
    return arrOrStr.slice(2);
}
exports.withoutFirst2 = withoutFirst2;
function withoutFirst3(arrOrStr) {
    return arrOrStr.slice(3);
}
exports.withoutFirst3 = withoutFirst3;
function withoutLast(arrOrStr) {
    return arrOrStr.slice(0, -1);
}
exports.withoutLast = withoutLast;
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
    return arrOrStr.slice(0, (numToRm === 0) ? arrOrStr.length : (-1 * numToRm));
}
exports.withoutLastN = withoutLastN;
function withoutFirstN(arrOrStr, numToRm) {
    return arrOrStr.slice(1 * numToRm);
}
exports.withoutFirstN = withoutFirstN;
function withoutFirst(arrOrStr) {
    return arrOrStr.slice(1);
}
exports.withoutFirst = withoutFirst;
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
 * Eliminate all falsy values from the given array.
 *
 * @param {Array} arr - Array containing any values of any type.
 * @return {Array} - input array minus falsy vals. Eliminates 0, '', null, undefined, NaN, false.
 */
exports.rmAllFalsy = function (arr) { return arr.filter(function (item) { return !!item; }); };
/**
 * Split large multiline string into array where each line is an item. Also removes blank lines.
 *
 * @param {String} str - Multiline string to split into array where each line is an array item.
 *                       Splits on '\n' char.
 * @return {Array<string>} Array where each item is a line from the input string, with falsy
 *                         values removed.
 */
exports.splitLines = function (str) { return exports.rmAllFalsy(str.toString().split('\n')); };
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
var types_iso_2 = require("./types-iso");
exports.isArray = types_iso_2.isArray;
//# sourceMappingURL=array.js.map