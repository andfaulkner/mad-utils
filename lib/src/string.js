"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** LOGGING *********************************************/
var mad_logs_1 = require("mad-logs");
var log = mad_logs_1.logFactory()("string.ts", mad_logs_1.logMarkers.lakeLouise);
/***************************************** LOCAL HELPERS ******************************************/
/**
 * Determine what item in a array of strings has the smallest indent.
 * Purpose: to remove this amount of indent from all lines, thus preserving nested indentation.
 * We can then define the indentation ourselves in a variable.
 *
 * It's all about avoiding problems like this with multiline templates:
 *
 *         <body>
 *             <div id="project-wrapper">
 *                 <div id="react-root">
 *         <!-- Cancer -->
 *         <div id="my-inner-component">
 *             <span class="yay-a-span">
 *                 <div>*cries</div>
 *             </span>
 *         </div>
 *                 </div>
 *             </div>
 *         </body>
 */
var _detectShortestIndentInArray = function (lines, logger) {
    if (logger === void 0) { logger = log; }
    // Ensure input is an array.
    var lineArr = (Array.isArray(lines) ? lines : [lines]);
    var shortestIndent = lineArr.reduce(function (acc, line) {
        // If any line found with no indent, prevent comparisons for the remainder of the loop.
        if (acc === 0)
            return acc;
        // Match on current line's indentation.
        var match = line.match(/^\s+/m);
        // If there's no match, there's no indent. Set to 0.
        if (!match || !match.input)
            return 0;
        // If indent length is shorter than the prior shortest, return as new shortest length.
        var currentShortestIndent = (match.input.length < acc) ? match.input.length : acc;
        logger.silly("_detectShortestIndentInArray: currentShortestIndent: " + currentShortestIndent);
        return currentShortestIndent;
    }, 120);
    logger.verbose("_detectShortestIndentInArray: shortestIndent:", shortestIndent);
    return shortestIndent;
};
/**
 * Ensure left-size indent makes sense. It must be an integer, or string that
 * can parse to an integer.
 *
 * @param {number|string} leftPadSize - Content of required interpolated item
 *                                      placed directly after the start quote.
 *
 * @return {never|void} Throw if leftPadSize is invalid.
 */
var _validateWithLeftIndent = function (leftPadSize) {
    var nullLeftPadSize = !leftPadSize && leftPadSize !== 0;
    var leftPadSizeNotNumberType = typeof parseInt(leftPadSize.toString(), 10) !== 'number';
    var leftPadSizeIsNaN = isNaN(parseInt(leftPadSize.toString(), 10));
    if (nullLeftPadSize || leftPadSizeNotNumberType || leftPadSizeIsNaN) {
        throw new Error("\n            withLeftIndent template strings must receive an interpolated value\n            with an integer immediately after the template string starting token.\n                E.g.: withLeftIndent`${4}\n                          Some text goes here.\n                          And also here.\n\n                      `\n            ");
    }
};
/*********************************** EXPORTED STRING FUNCTIONS ************************************/
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
 * Note that the type of the item being search and the item being searched for must match.
 * @param {string|number} matchAgainst - string or number to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
exports.matches = function (valToFind) { return function (valToSearchIn) {
    if (typeof valToFind !== typeof valToSearchIn)
        return false;
    return !!valToSearchIn.toString().match(valToFind.toString());
}; };
/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * Converts string to form that lets it be used as a pure 'literal' string to match against
 * directly if passed to new RegExp (no special chars taken into account).
 *
 * It essentially escapes special regex characters/metacharacters (e.g. *, ., +) in such a
 * way that the regex builder ignores their special and instead seeks them literally.
 *
 * @example escapeRegExp('*.js'); //=> '\\*\\.js'
 * @param {string} regexStr - String to escape for use in literal form in a regex builder.
 * @return {string} escaped string.
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
/************************************** STRING INTERPOLATION **************************************/
/**
 * @export withLeftIndent
 *
 * Template string type that allows for properly-indented multiline strings.
 *
 * Defines a template string type with the following behaviours:
 *     1. Eliminates all left-size indentation on each line;
 *     2. Requires a single interpolation variable to be placed directly after the start caret,
 *        which must contain an integer or string that can be parsed to one;
 *     3. Sets the final left-size indentation to equal the value of said interpolation variable.
 *
 * Removes as much left-size whitespace as is present in the shortest indent, then adds the
 * requested number of spaces to the indent.
 *
 *     @example  Input:
 *                   |                withLeftIndent`${4}
 *                   |                    def hello name do
 *                   |                        puts "Hello #{name}!"
 *                   |                        puts "Also, hello left indent!"
 *                   |                    end
 *                   |                `
 *
 *               Output:
 *                   |        def hello name do
 *                   |            puts "Hello #{name}!"
 *                   |            puts "Also, hello left indent!"
 *                   |        end
 *
 *               Note: ("|" is the left edge of the file).
 *
 * @return {string} Properly indented string.
 */
function withLeftIndent(strings, leftPadSize, logger) {
    if (logger === void 0) { logger = log; }
    _validateWithLeftIndent(leftPadSize);
    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n.
    var lines = strings[1].split('\n');
    // |** 2 **| Remove 1st element if it's ''. This is the 'pre-initial-variable' string.
    if (lines[0].length === 0)
        lines.shift();
    // |** 3 **| Determine which line has the shortest indent.
    var shortestIndent = _detectShortestIndentInArray(lines, logger);
    // |** 4 **| Create the indentation string to add & whitespace string to split on
    var leftPadSpaces = ' '.repeat(leftPadSize);
    var initialIndent = ' '.repeat(shortestIndent);
    // |** 5 **| Cut out the required number of spaces
    var linesPrepped = lines.map(function (line) { return line.replace(new RegExp("^" + initialIndent, 'm'), leftPadSpaces); });
    // |** 6 **| Convert array back to string & return.
    var retStr = linesPrepped.join("\n");
    logger.verbose("withLeftIndent: retStr:\n" + retStr);
    return retStr;
}
exports.withLeftIndent = withLeftIndent;
/*************************************** FILE PATH STRINGS ****************************************/
/**
 * If given string ends in .js, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .js.
 */
exports.endsInDotJs = function (inode) { return inode.split(/\./g).reverse()[0] === 'js'; };
/**
 * Return true if string doesn't have .min as a secondary extension (e.g. file.min.js, file.min.ts)
 * @param {string} inode - Any string, but it's intended to be a file/directory path.
 * @return {boolean} true if file doesn't end in .min.[anyExt] (e.g. a.min.json, b.min.css)
 */
exports.isNonMinFile = function (inode) { return inode.split(/\./g).reverse()[1] !== 'min'; };
/**
 * Get the base filename from the given path.
 * @example getBaseFilenameFromPath(./src/translations/en.json); // => en.json
 */
exports.getBaseFilenameFromPath = function (filePath) { return filePath.split('/').slice(-1)[0]; };
/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
var enum_1 = require("./enum");
exports.stringToEnumVal = enum_1.stringToEnumVal;
var array_1 = require("./array");
exports.splitLines = array_1.splitLines;
//# sourceMappingURL=string.js.map