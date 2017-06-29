"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("./array");
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
var _detectShortestIndentInArray = function (lines) {
    // Ensure input is an array.
    var lineArr = (Array.isArray(lines) ? lines : [lines]);
    return lineArr.reduce(function (acc, line) {
        // If any line found with no indent, prevent comparisons for the remainder of the loop.
        if (acc === 0)
            return acc;
        // Match on current line's indentation.
        var match = line.match(/^\s+/m);
        // If there's no match, there's no indent. Set to 0.
        if (!match || !match.input)
            return 0;
        // If indent length is shorter than the prior shortest, return as new shortest length.
        return (match.input.length < acc) ? match.input.length : acc;
    }, 120);
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
 * Inversion of String.prototype.match, for usage as a predicate, but also works for searching
 * with a RegExp or number. The type of the item to find for & the item being searched must match,
 * unless valToFind is a RegExp.
 * @param {string|number|RegExp} valToFind - Value to search for in valToSearchIn.
 * @param {string|number} valToSearchIn - string or number to match against.
 * @return {boolean} true if a match is found.
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
exports.matches = function (valToFind) { return function (valToSearchIn) {
    if ((typeof valToFind !== typeof valToSearchIn) && !(valToFind instanceof RegExp)) {
        return false;
    }
    if (valToFind instanceof RegExp) {
        return valToFind.test(valToSearchIn.toString());
    }
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
exports.removeWhitespace = function (str) { return str.replace(/ /g, ''); };
/** Alias for removeWhitespace */
exports.eliminateWhitespace = exports.removeWhitespace;
/** Alias for removeWhitespace */
exports.rmWhitespace = exports.removeWhitespace;
/** Alias for removeWhitespace */
exports.rmSpaces = exports.removeWhitespace;
/**
 *
 */
exports.toSnakeCase = function (str) {
    var retStr = str.trim()
        .replace(/('|"|\!|\?|\`|,|\|)/g, '')
        .replace(/(\.)/g, '_')
        .replace(/ /g, '_')
        .replace(/([A-Z])/g, "_$1")
        .replace(/(\-)([a-zA-Z0-9])/g, '_$2')
        .replace(/(_{1,})?\-{1,}(_{1,})?/g, '_')
        .replace(/_{1,}/g, '_')
        .replace(/^(_|\-){1,}/, '')
        .replace(/(_|\-){1,}$/, '')
        .toLowerCase();
    return retStr;
};
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
function withLeftIndent(strings, leftPadSize, xz) {
    _validateWithLeftIndent(leftPadSize);
    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n.
    var lines = strings[1].split('\n');
    // |** 2 **| Remove 1st element if it's ''. This is the 'pre-initial-variable' string.
    if (lines[0].length === 0)
        lines.shift();
    // |** 3 **| Determine which line has the shortest indent.
    var shortestIndent = _detectShortestIndentInArray(lines);
    // |** 4 **| Create the indentation string to add & whitespace string to split on
    var leftPadSpaces = ' '.repeat(leftPadSize);
    var initialIndent = ' '.repeat(shortestIndent);
    // |** 5 **| Cut out the required number of spaces
    var linesPrepped = lines.map(function (line) { return line.replace(new RegExp("^" + initialIndent, 'm'), leftPadSpaces); });
    // |** 6 **| Convert array back to string & return.
    return linesPrepped.join("\n");
}
exports.withLeftIndent = withLeftIndent;
;
/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of 'len' number of  repeats of 'charToRepeat'.
 * @param {number} len - number of repeats of charToRepeat in output string
 * @param {string} charToRepeat - Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat.
 */
var repeatChars = function (repChar, len) { return array_1.arrayN(len, repChar).join(''); };
exports.repeatChar = repeatChars;
/*************************************** FILE PATH STRINGS ****************************************/
/**
 * If given string ends in given substring preceded by a '.', returns true.
 * Note: only works for extensions with up to 4 parts. e.g. .b.c.d.e
 *
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @param {string} ext - Any string, but it's meant to be a file extension (e.g. js).
 * @return {boolean} true if file ends in given extension.
 *
 * @example endsWithExt('ok.tsx', 'tsx') // => true
 */
exports.endsWithExt = function (inode, ext) {
    var cleanExt = (ext.match(/^\./)) ? array_1.withoutFirst(ext.split(/\./g)).join() : ext;
    var extArrLen = cleanExt.split(/\./g).length;
    var inodeArrRev = inode.split(/\./g).reverse();
    if (extArrLen === 1) {
        return inodeArrRev[0] === cleanExt;
    }
    if (extArrLen === 2) {
        if (inodeArrRev.length < 2)
            return false;
        return inodeArrRev[1] + "." + inodeArrRev[0] === cleanExt;
    }
    if (extArrLen === 3) {
        if (inodeArrRev.length < 3)
            return false;
        return inodeArrRev[2] + "." + inodeArrRev[1] + "." + inodeArrRev[0] === cleanExt;
    }
    if (extArrLen === 4) {
        if (inodeArrRev.length < 4)
            return false;
        return inodeArrRev[3] + "." + inodeArrRev[2] + "." + inodeArrRev[1] + "." + inodeArrRev[0] ===
            cleanExt;
    }
    return false;
};
/**
 * If given string ends in .js, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .js.
 */
exports.endsInDotJs = function (inode) { return exports.endsWithExt(inode, 'js'); };
/**
 * If given string ends in .jsx, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .jsx.
 */
exports.endsInDotJsx = function (inode) { return exports.endsWithExt(inode, 'jsx'); };
/**
 * If given string ends in .ts, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .ts.
 */
exports.endsInDotTs = function (inode) { return exports.endsWithExt(inode, 'ts'); };
/**
 * If given string ends in .tsx, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .tsx.
 */
exports.endsInDotTsx = function (inode) { return exports.endsWithExt(inode, 'tsx'); };
/**
 * If given string ends in .json, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .json.
 */
exports.endsInDotJson = function (inode) { return exports.endsWithExt(inode, 'json'); };
/**
 * If given string ends in .hbs, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .hbs.
 */
exports.endsInDotHbs = function (inode) { return exports.endsWithExt(inode, 'hbs'); };
/**
 * If given string ends in .css, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .css.
 */
exports.endsInDotCss = function (inode) { return exports.endsWithExt(inode, 'css'); };
/**
 * If given string ends in .scss, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .scss.
 */
exports.endsInDotScss = function (inode) { return exports.endsWithExt(inode, 'scss'); };
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
/**
 * Pad string to the given length, with additional characters added to the given side - or split
 * across both sides if side arg is 'center'. If initial string is longer than the width to pad
 * to, return initial string unmodified.
 *
 * @param {string} strToPad - Initial string to pad to given length with given char.
 * @param {number} outWidth - Width to increase the string to (by adding padding char repeatedly)
 * @param {string} padChar - Character to repeatedly add to left side of strToPad.
 * @param {Sides} side - Side to add padCharTo. Values: 'left', 'right', 'center'. For center,
 *                       adds char on each side, with the odd number extra added to the right.
 *
 * @return {string} strToPad padded to outWidth length via leftside repeats of padChar
 */
exports.pad = function (strToPad, outWidth, padChar, side) {
    if (strToPad === void 0) { strToPad = ''; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = ' '; }
    if (side === void 0) { side = 'center'; }
    var cleanStr = strToPad.toString();
    if (typeof outWidth === 'undefined' || outWidth == null)
        return cleanStr;
    var numCharsToAdd = outWidth - cleanStr.length;
    if (numCharsToAdd <= 0)
        return cleanStr;
    switch (side) {
        case 'left':
            return repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd) + cleanStr;
        case 'right':
            return cleanStr + repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd);
        case 'center':
        default:
            return exports._centerPad(cleanStr, outWidth, padChar);
    }
};
exports._centerPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ''; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = ' '; }
    var cleanStr = strToPad.toString();
    var padCharClean = _cleanCharToPadWith(padChar);
    var widthToAddToEachSide = (outWidth - cleanStr.length) / 2;
    var basePaddingWidth = Math.floor(widthToAddToEachSide);
    var basePadding = repeatChars(padCharClean, basePaddingWidth);
    return (basePaddingWidth === widthToAddToEachSide)
        ? basePadding + cleanStr + basePadding
        : basePadding + cleanStr + basePadding + padCharClean;
};
/**
 * Pad string to the given length, with additional characters added to left side. If
 * initial string is longer than the width to pad to, return initial string unmodified.
 *
 * @param {string} strToPad - Initial string to pad to given length with given char.
 * @param {number} outWidth - Width to increase the string to (by adding char to left side)
 * @param {string} padChar - Character to repeatedly add to left side of strToPad.
 *
 * @return {string} strToPad padded to outWidth length via leftside repeats of padChar
 */
exports.leftPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ''; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = ' '; }
    return exports.pad(strToPad, outWidth, padChar, 'left');
};
exports.padLeft = exports.leftPad;
/**
 * Pad string to the given length, with additional characters added to right side. If
 * initial string is longer than the width to pad to, return initial string unmodified.
 *
 * @param {string} strToPad - Initial string to pad to given length with given char.
 * @param {number} outWidth - Width to increase the string to (by adding char to right side)
 * @param {string} padChar - Character to repeatedly add to right side of strToPad.
 *
 * @return {string} strToPad padded to outWidth length via rightside repeats of padChar
 */
exports.rightPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ''; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = ' '; }
    return exports.pad(strToPad, outWidth, padChar, 'right');
};
exports.padRight = exports.rightPad;
/**
 * Pad string to the given length, with additional characters added to both sides. If
 * init string is longer than the width to pad to, return the initial string unmodified.
 * If an odd number of chars must be added, add the extra char on the right side
 *
 * @param {string} strToPad - Initial string to pad to given length with given char.
 * @param {number} outWidth - Width to extend string to (adds 1/2 of char reps on each side)
 * @param {string} padChar - char to pad with.
 *
 * @return {string} strToPad padded w/ padChar to outWidth (each side gets ~1/2 of the added chars)
 */
exports.centeredPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ''; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = ' '; }
    return exports.pad(strToPad, outWidth, padChar, 'center');
};
exports.centerPad = exports.centeredPad;
/*********************************** TEST EXPORTS ***********************************/
/**
 * Ensure proper char for padding was passed to rightPad, leftPad, and centeredPad.
 */
function _cleanCharToPadWith(padChar) {
    if (padChar === void 0) { padChar = ' '; }
    if (typeof padChar === 'number' && padChar === 0)
        return '0';
    if (typeof padChar !== 'undefined' && padChar !== null)
        return padChar.toString();
    return ' ';
}
exports._cleanCharToPadWith = _cleanCharToPadWith;
/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
var enum_1 = require("./enum");
exports.stringToEnumVal = enum_1.stringToEnumVal;
var array_2 = require("./array");
exports.splitLines = array_2.splitLines;
exports.first = array_2.first;
exports.first2 = array_2.first2;
exports.first3 = array_2.first3;
exports.firstN = array_2.firstN;
exports.last = array_2.last;
exports.last2 = array_2.last2;
exports.last3 = array_2.last3;
exports.lastN = array_2.lastN;
exports.without = array_2.without;
exports.withoutFirst = array_2.withoutFirst;
exports.withoutFirst2 = array_2.withoutFirst2;
exports.withoutFirst3 = array_2.withoutFirst3;
exports.withoutLast = array_2.withoutLast;
exports.withoutLast2 = array_2.withoutLast2;
exports.withoutLast3 = array_2.withoutLast3;
exports.withoutFirstN = array_2.withoutFirstN;
exports.withoutLastN = array_2.withoutLastN;
//# sourceMappingURL=string.js.map