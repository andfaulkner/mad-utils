"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var accent_to_none_char_map_1 = require("./internal/accent-to-none-char-map");
var array_1 = require("./array");
/*********************************** EXPORTED STRING FUNCTIONS ************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase
 */
exports.cap1LowerRest = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
/**
 * Capitalize the first letter of a string
 * If given a null value, returns ``
 */
exports.capitalize = function (str) {
    return !str ? "" : str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Replace all matching strings in a text segment with a given replacement string
 * Can also match against a regex
 * Main benefit: *ALL* matching strings get replaced
 *
 * @param {string} text String to search and replace in
 * @param {string|RegExp} find String or RegExp to match against
 * @param {string} replace Replacement text
 * @return {string} original text with replacements made
 */
exports.replaceAll = function (text, find, replace) {
    return typeof find === "string"
        ? text.replace(new RegExp(exports.escapeRegExp(find), "g"), replace)
        : text.replace(find, replace);
};
/**
 * Inversion of String.prototype.match, for usage as a predicate, but also
 * works for searching with a RegExp or number
 *
 * The type of the item to find for & the item being searched must match, unless
 * valToFind is a RegExp
 *
 * @param {string|number|RegExp} valToFind Value to search for in valToSearchIn
 * @param {string|number} valToSearchIn string or number to match against
 * @return {boolean} true if a match is found
 * @example USAGE ::  [`gr`, `hello`].find(matches(`hello`)); // => true
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
 * Get first substring to match the given string or RegExp
 *
 * @param {string} haystack String to search for the string or RegExp
 * @param {string|RegExp} needle String or RegExp to find in haystack
 * @return {string} 1st substring of haystack to match needle; `` if no matches found
 */
exports.matchFirst = function (haystack, needle) {
    var matchArr = haystack.match(needle);
    return (matchArr && matchArr[0]) || "";
};
/**
 * Escape a string for use as a regex
 * Allows repeat char matching on a single string (e.g. `/?+` emits `\\/\\?\\+`)
 * Converts string to form that lets it be used as a pure 'literal' string to match
 * against directly if passed to new RegExp (no special chars taken into account)
 *
 * It essentially escapes special regex characters/metacharacters (e.g. *, ., +) in such a
 * way that the regex builder ignores their special and instead seeks them literally
 *
 * @example escapeRegExp(`*.js`); //=> `\\*\\.js`
 * @param {string} regexStr String to escape for use in literal form in a regex builder
 * @return {string} escaped string
 */
exports.escapeRegExp = function (regexStr) {
    return regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, "\\$1");
};
/**
 * Curried (for use as a predicate) & case-insensitive version of String.prototype.match
 * @param {string} matchAgainst String to match against
 * @return {boolean} true if a match is found
 *
 * @example USAGE ::  [`gr`, `HeLLo`].find(matchesIgnoreCase(`hello`)); // => true
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
 * @example removeWhitespace(` my test  string   `); // => myteststring
 *
 * @param {string} str String to remove spaces from
 * @return {string} input string with spaces removed
 */
exports.removeWhitespace = function (str) { return str.replace(/ /g, ""); };
/**
 * Remove all characters in [charsToChomp] string from end of given string [str]
 * Defaults to eliminating carriage return and newline characters
 *
 * @param {string} str String to chomp (from end)
 * @param {string} charsToChomp String (acting as array of chars) containing all chars to chomp
 * @return {string} str with all chars in charsToChomp removed from end of string
 */
exports.chomp = function (str, charsToChomp) {
    if (charsToChomp === void 0) { charsToChomp = "\n\r"; }
    return str.replace(new RegExp("(" + charsToChomp.split("").join("|") + ")+$", "g"), "");
};
/**
 * Convert camelCase, PascalCase, or dash-case to snake_case
 *
 * @param {string} str String to convert to snake_case
 * @param {boolean} consecUppercaseToLowercase If true, converts consecutive uppercase chars to
 *                  lowercase, rather than putting _ between them (the default behaviour)
 *                  e.g. newOSName -> new_os_name, instead of new_o_s_name
 * @return {string} given string converted to snake_case
 */
exports.toSnakeCase = function (str, consecUppercaseToLowercase) {
    if (consecUppercaseToLowercase === void 0) { consecUppercaseToLowercase = false; }
    // Conditionally deal with consecutive capital letters
    var cleanStr = consecUppercaseToLowercase
        ? str.replace(/([a-z])([A-Z]+)([A-Z])([a-z])/g, "$1_$2_$3$4").toLowerCase()
        : str;
    return (cleanStr
        .trim()
        //Remove apostrophes, quotes, commas, |, ?, and !
        .replace(/('|"|\!|\?|\`|,|\|)/g, "")
        // Replace . with _
        .replace(/(\.)/g, "_")
        // Replace ` ` with `_`
        .replace(/ /g, "_")
        // From PascalCase or camelCase
        .replace(/([A-Z])/g, "_$1")
        // From dash-case, including "Dash-Title-Case" (dash-case with caps)
        .replace(/(\-)([a-zA-Z0-9])/g, "_$2")
        // Replace slash (/ or \) with _
        .replace(/[\/\\]/g, "_")
        // Eliminate repeat, preceding, and trailing underscores, and stray dashes
        .replace(/(_{1,})?\-{1,}(_{1,})?/g, "_")
        .replace(/_{1,}/g, "_")
        .replace(/^(_|\-){1,}/, "")
        .replace(/(_|\-){1,}$/, "")
        // Remove caps (snake_case is always lowercase)
        .toLowerCase());
};
/**
 * Converts any string (snake_case, PascalCase, dash-case) to camelCase
 * Consistently makes the 1st letter lowercase, capitalizes the 1st char after each
 * non-alphanumeric char, & eliminates all non-alphanumeric chars & whitespace
 * @param {string} str String to convert to camelCase
 * @return {string} String converted to camelCase format
 */
exports.toCamelCase = function (str) {
    var midStr = str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, idx) {
        if (+match === 0)
            return "";
        return idx === 0 ? match.toLowerCase() : match.toUpperCase();
    })
        .replace(/[\-.!@#_%^&*()\[\]{};:'"~`,?\|\/+=\\<>$]+/g, "");
    return "" + midStr.charAt(0).toLowerCase() + midStr.slice(1);
};
/**
 * Return copy of string (str) with all instances of substring or regexp (matcherToRm) removed
 * @example removeMatchingText(`asdfqwertyasdfuiopasdf`, `asdf`); // => `qwertyuiop`
 * @param {string} str String to remove matches from
 * @param {string|RegExp} matcherToRm String to remove from str
 * @return {string} str with all instances of matcherToRm removed
 */
exports.removeMatchingText = function (str, matcherToRm) {
    return exports.replaceAll(str, matcherToRm, "");
};
/************************************** STRING INTERPOLATION **************************************/
/**
 * Perform string deindenting for exported deindent function
 */
var deindentStr = function (str) {
    var size = -1;
    return (str
        // Fix indents
        .replace(/\n([ \f\r\t\v]*)/g, function (_, match) {
        if (size < 0)
            size = match.replace(/\t/g, "    ").length;
        return "\n" + match.slice(Math.min(match.length, size));
    })
        // Remove 1 linebreak before the 1st line, & 1 after the last line
        .replace(/^\n/g, "")
        .replace(/\n$/g, ""));
};
// deindent inspired by https://github.com/deanlandolt/deindent
/**
 * Remove extra indents from string
 * Changes indentation to start at lowest level of indent in the string
 * Eliminate linebreak on first and last line (if present)
 * Leave pre-text indent for single-line strings
 *
 * Example:
 *       | deindent`
 *       |     Hello,
 *       |         Is it biscotti I'm looking for?
 *       |             Hello?
 *       |     Sincerely, The Cookie Monster
 *       | `
 *
 *     Output:
 *       | Hello,
 *       |     Is it biscotti I'm looking for?
 *       |         Hello?
 *       | Sincerely, The Cookie Monster
 */
exports.deindent = function (input) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (typeof input === "string")
        return deindentStr(input);
    if (typeof input === "function")
        return function () { return deindentStr(input.apply(void 0, args)); };
    return deindentStr(input
        .slice(0, args.length + 1)
        .map(function (text, idx) { return "" + (idx === 0 ? "" : args[idx - 1]) + text; })
        .join(""));
};
/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of 'len' number of repeats of 'charToRepeat'
 * @param {number} len Number of repeats of charToRepeat in output string
 * @param {string} charToRepeat Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat
 */
exports.repeatChars = function (repStr, len) { return array_1.arrayN(len, repStr).join(""); };
/*************************************** FILE PATH STRINGS ****************************************/
/**
 * If given string ends in given substring preceded by a `.`, returns true
 * Note: only works for extensions with up to 4 parts e.g. .b.c.d.e
 *
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @param {string} ext Any string, but it's meant to be a file extension (e.g. js)
 * @return {boolean} true if file ends in given extension
 *
 * @example endsWithExt(`ok.tsx`, `tsx`) // => true
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
 * If given string ends in .js, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .js
 */
exports.endsInDotJs = function (inode) { return exports.endsWithExt(inode, "js"); };
/**
 * If given string ends in .jsx, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .jsx
 */
exports.endsInDotJsx = function (inode) { return exports.endsWithExt(inode, "jsx"); };
/**
 * If given string ends in .ts, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .ts
 */
exports.endsInDotTs = function (inode) { return exports.endsWithExt(inode, "ts"); };
/**
 * If given string ends in .tsx, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .tsx
 */
exports.endsInDotTsx = function (inode) { return exports.endsWithExt(inode, "tsx"); };
/**
 * If given string ends in .json, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .json
 */
exports.endsInDotJson = function (inode) { return exports.endsWithExt(inode, "json"); };
/**
 * If given string ends in .hbs, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .hbs
 */
exports.endsInDotHbs = function (inode) { return exports.endsWithExt(inode, "hbs"); };
/**
 * If given string ends in .css, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .css
 */
exports.endsInDotCss = function (inode) { return exports.endsWithExt(inode, "css"); };
/**
 * If given string ends in .scss, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .scss
 */
exports.endsInDotScss = function (inode) { return exports.endsWithExt(inode, "scss"); };
/**
 * Return true if string doesn't have .min as a secondary extension (e.g. file.min.js, file.min.ts)
 * @param {string} inode Any string, but it's intended to be a file/directory path
 * @return {boolean} true if file doesn't end in .min.[anyExt] (e.g. a.min.json, b.min.css)
 */
exports.isNonMinFile = function (inode) { return inode.split(/\./g).reverse()[1] !== "min"; };
/**
 * Get the base filename from the given path
 * @example getBaseFilenameFromPath(./src/translations/en.json); // => en.json
 */
exports.getBaseFilenameFromPath = function (filePath) { return filePath.split("/").slice(-1)[0]; };
/**
 * Pad string to the given length, with additional characters added to the given
 * side - or split across both sides if side arg is `center`
 * If initial string is longer than the width to pad to, return initial string unmodified
 *
 * @param {string} strToPad Initial string to pad to given length with given char
 * @param {number} outWidth Width to increase the string to (by adding padding char repeatedly)
 * @param {string} padChar Character to repeatedly add to left side of strToPad
 * @param {Sides} side Side to add padCharTo :: values: `left`, `right`, `center`
 *                     For center, adds char on each side, w the odd number extra added to the right
 *
 * @return {string} strToPad padded to outWidth length via leftside repeats of padChar
 */
exports.pad = function (strToPad, outWidth, padChar, side) {
    if (strToPad === void 0) { strToPad = ""; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = " "; }
    if (side === void 0) { side = "center"; }
    var cleanStr = strToPad.toString();
    if (typeof outWidth === "undefined" || outWidth == null)
        return cleanStr;
    var numCharsToAdd = outWidth - cleanStr.length;
    if (numCharsToAdd <= 0)
        return cleanStr;
    switch (side) {
        case "left":
            return exports.repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd) + cleanStr;
        case "right":
            return cleanStr + exports.repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd);
        case "center":
        default:
            return _centerPad(cleanStr, outWidth, padChar);
    }
};
var _centerPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ""; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = " "; }
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
 * Pad string to the given length, with additional characters added to left side
 * If initial string is longer than the width to pad to, return initial string unmodified
 *
 * @param {string} strToPad Initial string to pad to given length with given char
 * @param {number} outWidth Width to increase the string to (by adding char to left side)
 * @param {string} padChar Character to repeatedly add to left side of strToPad
 *
 * @return {string} strToPad padded to outWidth length via leftside repeats of padChar
 */
exports.leftPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ""; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = " "; }
    return exports.pad(strToPad, outWidth, padChar, "left");
};
exports.padLeft = exports.leftPad;
/**
 * Pad string to the given length, with additional characters added to right side
 * If initial string is longer than the width to pad to, return initial string unmodified
 *
 * @param {string} strToPad Initial string to pad to given length with given char
 * @param {number} outWidth Width to increase the string to (by adding char to right side)
 * @param {string} padChar Character to repeatedly add to right side of strToPad
 *
 * @return {string} strToPad padded to outWidth length via rightside repeats of padChar
 */
exports.rightPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ""; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = " "; }
    return exports.pad(strToPad, outWidth, padChar, "right");
};
exports.padRight = exports.rightPad;
/**
 * Pad string to the given length, with additional characters added to both sides
 * If init string is longer than the width to pad to, return the initial string unmodified
 * If an odd number of chars must be added, add the extra char on the right side
 *
 * @param {string} strToPad Initial string to pad to given length with given char
 * @param {number} outWidth Width to extend string to (adds 1/2 of char reps on each side)
 * @param {string} padChar char to pad with
 *
 * @return {string} strToPad padded w/ padChar to outWidth (each side gets ~1/2 of the added chars)
 */
exports.centerPad = function (strToPad, outWidth, padChar) {
    if (strToPad === void 0) { strToPad = ""; }
    if (outWidth === void 0) { outWidth = 0; }
    if (padChar === void 0) { padChar = " "; }
    return exports.pad(strToPad, outWidth, padChar, "center");
};
/**************************************** CHARACTER TESTS *****************************************/
/**
 * @return {boolean} If given string is a whitespace character, return true
 */
exports.isWhitespaceChar = function (matchChar) {
    return matchChar && matchChar.length === 1 && "\t\n ".indexOf(matchChar) >= 0;
};
/**
 * @return {boolean} If given string is a whitespace character, return true
 */
exports.isAlphanumericChar = function (matchChar) { return /^[a-zA-Z0-9]$/.test(matchChar); };
/**
 * @return {boolean} If given string is a operator character, return true
 */
exports.isOperatorChar = function (matchChar) {
    return !!matchChar && matchChar.length === 1 && "+-*=|&<>?:/!%^~]".indexOf(matchChar) >= 0;
};
/**************************************** STRING -> REGEX *****************************************/
var RegExpFlags = "yumig";
/**
 * If matching quotes found at left- & right-most positions of given string, remove them
 * If none found, returns string as-is
 * @param  {string} str String to check & remove from
 * @return {string} Input string with bookending quotes removed
 * @example removeSurroundingQuotes(`"asdf"`); // => `asdf`
 */
exports.removeSurroundingQuotes = function (str) {
    if ((str.length > 1 && (str[0] === '`' && str[str.length - 1] === '`')) ||
        (str[0] === "'" && str[str.length - 1] === "'") ||
        (str[0] === "\"" && str[str.length - 1] === "\"")) {
        return str.replace(/(^['"`])|(['"`]$)/g, "");
    }
    return str;
};
/**
 * Returns true if string is a RegExp or string that can compile to RegExp
 * @param {string|RegExp} str Check if this is a RegExp or string in `/chars/flags` format
 * @return {boolean} True if input is a string in `/chars/flags` format, or a RegExp
 */
exports.isRegexString = function (str) {
    return str instanceof RegExp || !!str.match(/^\/[\s\S]+\/[yumig]{0,5}$/);
};
/**
 * Get flags from string in regex string format - i.e. `/regex_query/flags`
 * @param {string} str String to get flags from. Grabs from chars after the final /
 * @return {string|null} String of flag chars e.g. ``, `mi`, `g`; or null if str not in regex form
 */
exports.getFlagsFromRegexString = function (str) {
    if (!exports.isRegexString(str))
        return null;
    // Get the actual flag section of regex string (e.g. `gi`)
    var flagSect = str.split("/").reverse()[0];
    // Iterate through the section of the string past the last slash, 1 char at a time
    return flagSect.split("").reduce(function (acc, char) {
        // See if any flag matches the current character
        var matchesFlag = RegExpFlags.match(char);
        // If the current char is not a flag, throw an error
        if (!matchesFlag) {
            console.warn("Invalid RegExp string : " + str + ". '" + char + "' is not a " +
                "flag - only y, u, m, i, and g are valid flags.");
            return null;
        }
        // If current char is a flag that's already set, throw an error (no duplicate flags)
        if (acc && acc.split("").find(function (flag) { return flag === matchesFlag[0]; })) {
            console.warn("Invalid RegExp string : " + str + ". RegExp strings can " +
                "only contain one of each flag (y, u, m, i, and g).");
            return null;
        }
        // Otherwise set the flag property to true in the flags object
        return acc.concat(matchesFlag[0]);
    }, "");
};
/**
 * Remove left & right side `/`, and all right-side flags from given regex in string form
 * @example removeSlashesFlagsSurroundingRegexString(`/asdf/gi`) // => `asdf`
 *
 * @param {string} str Regex string to remove slashes from (e.g. `/find_this_value/gm`)
 * @return {string} Regex string with the flags and bookending `/` chars removed
 */
exports.removeSlashesFlagsSurroundingRegexString = function (str) {
    return str.replace(/^\//, "").replace(/\/[yumig]{0,5}$/, "");
};
/**
 * Remove french accents from strings, as well as rare accents occurring in English
 */
exports.deburrFrenchEnglish = function (str) {
    if (!str)
        return "";
    var outArr = [];
    for (var _i = 0, _a = str.split(""); _i < _a.length; _i++) {
        var char = _a[_i];
        outArr.push(accent_to_none_char_map_1.accentToNoneCharMap[char] || char);
    }
    return outArr.join("");
};
/**
 * Ensure proper char for padding was passed to rightPad, leftPad, and centerPad
 */
function _cleanCharToPadWith(padChar) {
    if (padChar === void 0) { padChar = " "; }
    if (typeof padChar === "number" && padChar === 0)
        return "0";
    if (typeof padChar !== "undefined" && padChar !== null)
        return padChar.toString();
    return " ";
}
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