"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** STRINGS *********************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
exports.cap1LowerRest = function (str) { return str.charAt(0).toUpperCase() +
    str.slice(1).toLowerCase(); };
/**
 * Capitalize the first letter of a string.
 */
exports.capitalize = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };
/**
 * Replace all matching strings in a text segment with a given replacement string.
 * Can also match against a regex.
 * The main benefit is the fact that *ALL* matching strings get replaced.
 *
 * @param {string} text - string to search and replace in.
 * @param {string|RegExp} find - string or RegExp to match against
 * @param {string} replace - replacement text
 *
 * @return {string} text, with replacements made.
 */
exports.replaceAll = function (text, find, replace) {
    return (typeof find === 'string')
        ? text.replace(new RegExp(exports.escapeRegExp(find), 'g'), replace)
        : text.replace(find, replace);
};
/**
 * Inversion of String.prototype.match, for usage as a predicate.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
exports.matches = function (matchAgainst) { return function (val) { return !!val.match(matchAgainst); }; };
/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * TODO test this.
 */
exports.escapeRegExp = function (regexStr) { return regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1'); };
/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
exports.matchesIgnoreCase = function (matchOn) { return function (val) { return !!val.toLowerCase().match(matchOn.toLowerCase()); }; };
/**
 * String that creates a blank line without using \n.
 */
exports.newlineStr = "\n";
/**
 * Remove all spaces in the given string.
 *
 * @param {string} str - String to remove spaces from
 * @return {string} input string with spaces removed
 *
 * @example elminateWhitespace(' my test  string   ');
 *          // => myteststring
 */
exports.eliminateWhitespace = function (str) { return str.replace(/ /g, ''); };
var enum_1 = require("./enum");
exports.stringToEnumVal = enum_1.stringToEnumVal;
var array_1 = require("./array");
exports.splitLines = array_1.splitLines;
//# sourceMappingURL=string.js.map