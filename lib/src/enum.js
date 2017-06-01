"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
var env_var_helpers_1 = require("env-var-helpers");
var fn = "mad-utils::enum --";
/********************************************** ENUM **********************************************/
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is:
 *                        a) present in the given enum; and
 *                        b) An index/numeric value - i.e. '0', 0, '1', 1,...
 */
exports.isNumericEnumItem = function (val, Enum) { return !exports.isDataEnumItem(val, Enum); };
exports.isIndexEnumItem = exports.isNumericEnumItem;
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is: a) present in the given enum; and b) A non-numeric
 *                   'data' value (i.e. a value that was actually set).
 * @example Below, Suits[1] & Suits['1'] are truthy (they'd return 'CLUBS'). isDataEnumItem still
 *         knows to mark them false: it knows 0, '0', 1, '1', etc. are indexes, not actual values:
 *             enum Suits { HEARTS, CLUBS, SPADES, DIAMONDS }
 *                 Suits['HEARTS'];                   // => 0
 *                 isDataEnumItem('HEARTS', Suits);   // => true
 *                 Suits['WRENCHES']                  // => undefined
 *                 isDataEnumItem('WRENCHES', Suits); // => false
 *                 Suits['1']                         // => 'CLUBS'
 *                 isDataEnumItem('1', Suits);        // => false
 */
exports.isDataEnumItem = function (val, Enum) { return typeof Enum[val] === 'number'; };
/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
exports.enumValToString = function (Enum, val, caps) {
    if (caps === void 0) { caps = null; }
    var outVal = (typeof val === 'string') ? val : Enum[val];
    switch (caps) {
        case 'lower': return outVal.toLowerCase();
        case 'upper': return outVal.toUpperCase();
        default: return outVal;
    }
};
/**
 * Convert given enum value in string form to its numeric index.
 */
exports.stringToEnumVal = function (val, Enum) {
    if (env_var_helpers_1.isMocha && env_var_helpers_1.isVerbose)
        console.log(fn + " stringToEnumVal: Enum:", Enum, ";; val:", val);
    for (var item in Enum) {
        if (exports.isDataEnumItem(item, Enum) && item.toLowerCase() === val.toLowerCase()) {
            return Enum[item];
        }
    }
    if (env_var_helpers_1.isMocha && env_var_helpers_1.isWarn)
        console.warn(fn + " stringToEnumVal ::\n        WARNING: stringToEnumVal: no matches of given value - " + val + " - in given enum:\n            " + JSON.stringify(Enum) + "\n        ...returning 99999.");
    var stack;
    // NOTE: NOT AN ACTUAL ERROR CALL. THIS IS DONE TO ACQUIRE THE STACKTRACE.
    try {
        throw new Error();
    }
    catch (e) {
        stack = e.stack;
    }
    // Display clean stack trace up to point of 'Error' creation.
    var cleanStack = error_1.scrubStackTrace(stack, 'stringToEnumVal');
    if (env_var_helpers_1.isVerbose && env_var_helpers_1.isMocha)
        console.log(cleanStack, '\n');
    return 99999;
};
/**
 * Convert given enum to an array of strings, where each potential option is one item.
 * Excludes the 'number' values in an enum.
 * @param {Enum} enum - Enum to enumerate and extract string values from.
 * @return {string[]} enum represented as an array of strings.
 */
function enumToStringArray(Enum) {
    var values = [];
    // Stores all the values in the values list.
    for (var i in Enum) {
        if (typeof Enum[i] !== 'number')
            values.push(Enum[i]);
    }
    return values;
}
exports.enumToStringArray = enumToStringArray;
//# sourceMappingURL=enum.js.map