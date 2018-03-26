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
    // Set flag to exclude last line from comparison if it's an empty whitespace-only line.
    var excludeLast = !!lines[lines.length - 1].match(/^\s+$/);
    return lineArr.reduce(function (acc, line, idx) {
        // Exclude last line from comparison if it's an empty whitespace-only line.
        if (excludeLast && idx === lines.length - 1)
            return acc;
        // If any line found with no indent, prevent comparisons for the remainder of the loop.
        if (acc === 0)
            return acc;
        // Match on current line's indentation.
        var match = line.match(/^\s+/m);
        // If there's no match, there's no indent. Set to 0.
        if (!match || !match.input || !match[0])
            return 0;
        // If indent length is shorter than the prior shortest, return as new shortest length.
        return match[0].length < acc ? match[0].length : acc;
    }, 120);
};
/**
 * Ensure left-size indent makes sense. It must be an integer, or string that
 * can parse to an integer.
 * @param {number|string} leftPadSize - Content of required interpolated item
 *                                      placed directly after the start quote.
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
exports.cap1LowerRest = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
/**
 * Capitalize the first letter of a string.
 * If given a null value, returns ''.
 */
exports.capitalize = function (str) {
    return !str ? '' : str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Replace all matching strings in a text segment with a given replacement string. Can also match
 * against a regex. Main benefit: *ALL* matching strings get replaced.
 * @param {string} text - string to search and replace in.
 * @param {string|RegExp} find - string or RegExp to match against
 * @param {string} replace - replacement text
 * @return {string} original text with replacements made.
 */
exports.replaceAll = function (text, find, replace) {
    return typeof find === 'string'
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
    if (typeof valToFind !== typeof valToSearchIn && !(valToFind instanceof RegExp)) {
        return false;
    }
    if (valToFind instanceof RegExp) {
        return valToFind.test(valToSearchIn.toString());
    }
    return !!valToSearchIn.toString().match(valToFind.toString());
}; };
/**
 * Get first substring to match the given string or RegExp.
 * @param {string} strToSearchIn String to search for the string or RegExp
 * @param {string|RegExp} matcher String or RegExp to find in strToSearchIn.
 * @return {string} first substring to match the given string or RegExp; '' if no matches found.
 */
exports.matchFirst = function (strToSearchIn, matcher) {
    var matches = strToSearchIn.match(matcher);
    return (matches && matches[0]) || '';
};
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
exports.escapeRegExp = function (regexStr) {
    return regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1');
};
/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
exports.matchesIgnoreCase = function (matchOn) { return function (val) {
    return !!val.toLowerCase().match(matchOn.toLowerCase());
}; };
/**
 * String that creates a blank line without using \n
 */
exports.newlineStr = "\n";
/**
 * Remove all spaces in the given string
 *
 * @example removeWhitespace(' my test  string   '); // => myteststring
 *
 * @param {string} str String to remove spaces from
 * @return {string} input string with spaces removed
 */
exports.removeWhitespace = function (str) { return str.replace(/ /g, ''); };
/**
 * Remove all chars in charsToChomp string from end of given string str.
 * Defaults to eliminating carriage return and newline.
 * @param {string} str - String to chomp (from end)
 * @param {string} charsToChomp - String (acting as array of chars) containing all chars to chomp.
 * @return {string} str with all chars in charsToChomp eliminated from end of string.
 */
exports.chomp = function (str, charsToChomp) {
    if (charsToChomp === void 0) { charsToChomp = '\n\r'; }
    return str.replace(new RegExp("(" + charsToChomp.split('').join('|') + ")+$", 'g'), '');
};
/**
 * Convert camelCase, PascalCase, or dash-case to snake_case.
 * @param {string} str - String to convert to snake_case.
 * @param {boolean} consecUppercaseToLowercase - if true, converts consecutive uppercase chars to
 *                  lowercase, rather than putting _ between them (the default behaviour)
 *                  e.g. newOSName -> new_os_name, instead of new_o_s_name.
 * @return {string} given string converted to snake_case.
 */
exports.toSnakeCase = function (str, consecUppercaseToLowercase) {
    if (consecUppercaseToLowercase === void 0) { consecUppercaseToLowercase = false; }
    // Conditionally deal with consecutive capital letters.
    var cleanStr = consecUppercaseToLowercase
        ? str.replace(/([a-z])([A-Z]+)([A-Z])([a-z])/g, '$1_$2_$3$4').toLowerCase()
        : str;
    return cleanStr
        .trim()
        .replace(/('|"|\!|\?|\`|,|\|)/g, '')
        .replace(/(\.)/g, '_')
        .replace(/ /g, '_')
        .replace(/([A-Z])/g, '_$1')
        .replace(/(\-)([a-zA-Z0-9])/g, '_$2')
        .replace(/[\/\\]/g, '_')
        .replace(/(_{1,})?\-{1,}(_{1,})?/g, '_')
        .replace(/_{1,}/g, '_')
        .replace(/^(_|\-){1,}/, '')
        .replace(/(_|\-){1,}$/, '')
        .toLowerCase();
};
/**
 * Converts any string to camelCase.
 * This includes consistently making the first letter lowercase, capitalizing the 1st char after
 * each non-alphanumeric char, and eliminating all non-alphanumeric characters and whitespace.
 * @param {string} str String to convert to camelCase
 * @return {string} String converted to camelCase format.
 */
exports.toCamelCase = function (str) {
    var midStr = str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, idx) {
        if (+match === 0)
            return '';
        return idx == 0 ? match.toLowerCase() : match.toUpperCase();
    })
        .replace(/[\-.!@#_%^&*()\[\]{};:'"~`,?\|\/+=\\<>$]+/g, '');
    return midStr.charAt(0).toLowerCase() + midStr.slice(1);
};
/**
 * Return copy of string (str) with all instances of substring or regexp (matcherToRm) removed.
 * @example removeMatchingText('asdfqwertyasdfuiopasdf', 'asdf'); // => 'qwertyuiop'
 * @param {string} str - String to remove matches from.
 * @param {string|RegExp} matcherToRm - String to remove from str.
 * @return {string} str with all instances of matcherToRm removed.
 */
exports.removeMatchingText = function (str, matcherToRm) {
    return exports.replaceAll(str, matcherToRm, '');
};
/************************************** STRING INTERPOLATION **************************************/
/**
 * TODO MAKE IT WORK WITH INTERPOLATIONS
 * @export withLeftIndent
 *
 * WARNING: DOES NOT ALLOW INTERPOLATIONS
 *
 * Template string type that allows for properly-indented multiline strings.
 *
 * Defines a template string type with the following behaviours:
 *     1. Eliminates all left-size indentation on each line;
 *     2. Can take a single interpolation variable to be placed directly after the start caret,
 *        which must contain an integer or string that can be parsed to an integer;
 *     3. Sets the final left-size indentation to equal the value of said interpolation variable.
 *        - If interpolation variable is not given, the value defaults to 0.
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
    if (leftPadSize === void 0) { leftPadSize = 0; }
    _validateWithLeftIndent(leftPadSize);
    // |** 0 **| Detect position of first 'data' string in raw strings array.
    var firstStringPos = typeof strings[1] !== 'undefined' && strings[1] != null ? 1 : 0;
    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n.
    var lines = strings[firstStringPos].split('\n');
    // |** 2 **| Remove 1st element if it's ''. This is the 'pre-initial-variable' string.
    if (lines[0].length === 0)
        lines.shift();
    // |** 3 **| Determine which line has the shortest indent.
    var shortestIndent = _detectShortestIndentInArray(lines);
    // |** 4 **| Create the indentation string to add & whitespace string to split on
    var leftPadSpaces = ' '.repeat(leftPadSize);
    var initialIndent = ' '.repeat(shortestIndent);
    // |** 5 **| Cut out the required number of spaces
    var linesPreppedArr = lines.map(function (line) {
        return line.replace(new RegExp("^" + initialIndent, 'm'), leftPadSpaces);
    });
    // |** 6 **| Convert array back to string.
    var linesPrepped = linesPreppedArr.join("\n");
    // |** 7 **| Remove trailing whitespace in empty lines, and return result.
    return linesPrepped.replace(/^\s+$/gm, '');
}
exports.withLeftIndent = withLeftIndent;
/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of 'len' number of  repeats of 'charToRepeat'.
 * @param {number} len - number of repeats of charToRepeat in output string
 * @param {string} charToRepeat - Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat.
 */
exports.repeatChars = function (repStr, len) { return array_1.arrayN(len, repStr).join(''); };
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
    var cleanExt = ext.match(/^\./) ? array_1.withoutFirst(ext.split(/\./g)).join() : ext;
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
        return (inodeArrRev[3] + "." + inodeArrRev[2] + "." + inodeArrRev[1] + "." + inodeArrRev[0] === cleanExt);
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
            return exports.repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd) + cleanStr;
        case 'right':
            return cleanStr + exports.repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd);
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
    var basePadding = exports.repeatChars(padCharClean, basePaddingWidth);
    return basePaddingWidth === widthToAddToEachSide
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
/**************************************** CHARACTER TESTS *****************************************/
/**
 * TODO Unit test matchCharInChars
 * @example matchChars('\t\n\s ', 'hello everyone'); // => true
 * @return {boolean} true if matchChar is one of the characters in charsToMatchAgainst
 */
exports.matchCharInChars = function (charsToMatchAgainst, matchChar) {
    return matchChar && matchChar.length === 1 && charsToMatchAgainst.indexOf(matchChar) >= 0;
};
exports.isOneOfChars = exports.matchCharInChars;
exports.matchOneOfChars = exports.matchCharInChars;
/**
 * @return {boolean} If given string is a whitespace character, return true.
 */
exports.isWhitespaceChar = function (matchChar) {
    return matchChar && matchChar.length === 1 && '\t\n '.indexOf(matchChar) >= 0;
};
/**
 * @return {boolean} If given string is a whitespace character, return true.
 */
exports.isAlphanumericChar = function (matchChar) { return /^[a-zA-Z0-9]$/.test(matchChar); };
/**
 * @return {boolean} If given string is a operator character, return true.
 */
exports.isOperatorChar = function (matchChar) {
    return !!matchChar && matchChar.length === 1 && exports.matchCharInChars('+-*=|&<>?:/!%^~]', matchChar);
};
/**************************************** STRING -> REGEX *****************************************/
var RegExpFlags = 'yumig';
/**
 * If matching quotes found at left- & right-most positions of given string, remove them.
 * If none found, returns string as-is.
 * @param  {string} str String to check & remove from
 * @return {string} Input string with bookending quotes removed.
 * @example removeSurroundingQuotes('"asdf"'); // => 'asdf'
 */
exports.removeSurroundingQuotes = function (str) {
    if ((str.length > 1 && (str[0] === '`' && str[str.length - 1] === '`')) ||
        (str[0] === "'" && str[str.length - 1] === "'") ||
        (str[0] === '"' && str[str.length - 1] === '"')) {
        return str.replace(/(^['"`])|(['"`]$)/g, '');
    }
    return str;
};
exports.withoutSurroundingQuotes = exports.removeSurroundingQuotes;
/**
 * Returns true if string is a RegExp or string that can compile to RegExp.
 * @param {string|RegExp} str Check if this is a RegExp or string in '/chars/flags' format.
 * @return {boolean} True if input is a string in '/chars/flags' format, or a RegExp.
 */
exports.isRegexString = function (str) {
    return str instanceof RegExp || !!str.match(/^\/[\s\S]+\/[yumig]{0,5}$/);
};
exports.isRegexStr = exports.isRegexString;
/**
 * Get flags from string in regex string format - i.e. "/regex_query/flags".
 * @param {string} str String to get flags from. Grabs from chars after the final /.
 * @return {string|null} String of flag chars e.g. '', 'yum', 'g'. null if str isn't in regex form.
 */
exports.getFlagsFromRegexString = function (str) {
    if (!exports.isRegexString(str))
        return null;
    // Get the actual flag 'section'
    var flagSect = str.split('/').reverse()[0];
    // Iterate through the section of the string past the last slash, 1 char at a time.
    return flagSect.split('').reduce(function (acc, char) {
        // See if any flag matches the current character
        var matchesFlag = RegExpFlags.match(char);
        // If the current char is not a flag, throw an error
        if (!matchesFlag) {
            console.warn("Invalid RegExp string : " + str + ". '" + char + "' is not a " +
                "flag - only y, u, m, i, and g are valid flags.");
            return null;
        }
        // If current char is a flag that's already set, throw an error (no duplicate flags)
        if (acc && acc.split('').find(function (flag) { return flag === matchesFlag[0]; })) {
            console.warn("Invalid RegExp string : " + str + ". RegExp strings can " +
                "only contain one of each flag (y, u, m, i, and g).");
            return null;
        }
        // Otherwise set the flag property to true in the flags object.
        acc += matchesFlag[0];
        return acc;
    }, '');
};
exports.getFlagsFromRegexStr = exports.getFlagsFromRegexString;
/**
 * Remove left & right side '/', and all right-side flags from given regex string.
 * @param {string} str Regex string to remove slashes from (e.g. '/find_this_value/gm')
 * @return {string} Regex string with the flags and bookending '/' chars removed.
 */
exports.removeSurroundingRegexSlashes = function (str) {
    return str.replace(/^\//, '').replace(/\/[yumig]{0,5}$/, '');
};
exports.withoutSurroundingRegexSlashes = exports.removeSurroundingRegexSlashes;
exports.withoutRegexSlashesAndFlags = exports.removeSurroundingRegexSlashes;
exports.removeRegexSlashesAndFlags = exports.removeSurroundingRegexSlashes;
exports.removeRegexLiteralChars = exports.removeSurroundingRegexSlashes;
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
var array_2 = require("./array");
exports.countChars = array_2.countOccurrences;
var array_3 = require("./array");
exports.countCharOccurrences = array_3.countOccurrences;
var array_4 = require("./array");
exports.charOccurrences = array_4.countOccurrences;
var array_5 = require("./array");
exports.charCount = array_5.countOccurrences;
var array_6 = require("./array");
exports.uniqChars = array_6.removeDuplicates;
var array_7 = require("./array");
exports.uniqueChars = array_7.removeDuplicates;
var array_8 = require("./array");
exports.removeDuplicateChars = array_8.removeDuplicates;
//# sourceMappingURL=string.js.map