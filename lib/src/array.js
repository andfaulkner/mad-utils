"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*********************************** ARRAY & COLLECTION HELPERS ***********************************/
/** Return last item in an array. */
exports.last = function (arr) { return arr.slice(-1)[0]; };
/** Return second last item in an array. */
exports.secondLast = function (arr) { return arr.slice(-2, -1)[0]; };
/** Return third last item in an array. */
exports.thirdLast = function (arr) { return arr.slice(-3, -2)[0]; }; // tslint:disable-line:no-magic-numbers max-line-length
/** Return last 2 items in an array. */
exports.last2 = function (arr) { return arr.slice(-2); };
/** Return last 3 items in an array. */
exports.last3 = function (arr) { return arr.slice(-3); }; // tslint:disable-line:no-magic-numbers
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
/**
 * Return first N items in an array. Returned the whole array if you request too many items.
 */
function firstN(arr, n) {
    return (arr.length >= n)
        ? exports.arrayN(n).map(function (item, idx) { return arr[idx]; })
        : arr;
}
exports.firstN = firstN;
/**
 * Exclude the first few or the last few items.
 */
exports.withoutLast = function (arr) { return arr.slice(0, -1); };
exports.withoutLast2 = function (arr) { return arr.slice(0, -2); };
// tslint:disable-next-line: no-magic-numbers
exports.withoutLast3 = function (arr) { return arr.slice(0, -3); };
exports.withoutLastN = function (arr, numToRm) { return arr.slice(0, -1 * numToRm); };
exports.withoutFirst = function (arr) { return arr.slice(1); };
exports.withoutFirst2 = function (arr) { return arr.slice(2); };
exports.withoutFirst3 = function (arr) { return arr.slice(3); };
exports.withoutFirstN = function (arr, numToRm) { return arr.slice(1 * numToRm); };
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
/**
 * Namespace for certain "reversed" operations.
 */
exports.without = {
    last: exports.withoutLast,
    last2: exports.withoutLast2,
    last3: exports.withoutLast3,
    lastN: exports.withoutLastN,
    first: exports.withoutFirst,
    first2: exports.withoutFirst2,
    first3: exports.withoutFirst3,
    firstN: exports.withoutFirstN,
};
//# sourceMappingURL=array.js.map