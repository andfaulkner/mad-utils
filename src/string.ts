/******************************************** IMPORTS *********************************************/
import { StrOrNum } from './types-iso';
import { withoutFirst, arrayN } from './array';

export type char = string;
export type chars = string;

export type character = string;
export type characters = string;

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
const _detectShortestIndentInArray = (lines: string[] | string): number => {
    // Ensure input is an array.
    const lineArr = (Array.isArray(lines) ? lines : [lines]) as string[];

    // Set flag to exclude last line from comparison if it's an empty whitespace-only line.
    const excludeLast = !!(lines[lines.length - 1].match(/^\s+$/));

    return lineArr.reduce((acc: number, line: string, idx: number) => {
        // Exclude last line from comparison if it's an empty whitespace-only line.
        if (excludeLast && idx === lines.length - 1) return acc;

        // If any line found with no indent, prevent comparisons for the remainder of the loop.
        if (acc === 0) return acc;

        // Match on current line's indentation.
        const match = line.match(/^\s+/m);

        // If there's no match, there's no indent. Set to 0.
        if (!match || !match.input || !match[0]) return 0;

        // If indent length is shorter than the prior shortest, return as new shortest length.
        return (match[0].length < acc) ? match[0].length : acc;
    }, 120);
};

/**
 * Ensure left-size indent makes sense. It must be an integer, or string that
 * can parse to an integer.
 * @param {number|string} leftPadSize - Content of required interpolated item
 *                                      placed directly after the start quote.
 * @return {never|void} Throw if leftPadSize is invalid.
 */
const _validateWithLeftIndent = (leftPadSize: number | string): never | void => {
    const nullLeftPadSize          = !leftPadSize && leftPadSize !== 0;
    const leftPadSizeNotNumberType = typeof parseInt(leftPadSize.toString(), 10) !== 'number';
    const leftPadSizeIsNaN         = isNaN(parseInt(leftPadSize.toString(), 10));

    if (nullLeftPadSize || leftPadSizeNotNumberType || leftPadSizeIsNaN) {
        throw new Error(`
            withLeftIndent template strings must receive an interpolated value
            with an integer immediately after the template string starting token.
                E.g.: withLeftIndent\`\${4}
                          Some text goes here.
                          And also here.\n
                      \`
            `
        );
    }
};


/*********************************** EXPORTED STRING FUNCTIONS ************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
export const cap1LowerRest = (str: string): string => str.charAt(0).toUpperCase() +
                                                      str.slice(1).toLowerCase();

/**
 * Capitalize the first letter of a string.
 * If given a null value, returns ''.
 */
export const capitalize = (str: string): string => {
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
export const replaceAll = (text: string, find: string | RegExp, replace: string) =>
    (typeof find === 'string')
        ? text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
        : text.replace(find, replace);

/**
 * Inversion of String.prototype.match, for usage as a predicate, but also works for searching
 * with a RegExp or number. The type of the item to find for & the item being searched must match,
 * unless valToFind is a RegExp.
 * @param {string|number|RegExp} valToFind - Value to search for in valToSearchIn.
 * @param {string|number} valToSearchIn - string or number to match against.
 * @return {boolean} true if a match is found.
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export const matches = (valToFind: StrOrNum | RegExp) => (valToSearchIn: StrOrNum): boolean => {
    if ((typeof valToFind !== typeof valToSearchIn) && !(valToFind instanceof RegExp)) {
      return false;
    }
    if (valToFind instanceof RegExp) {
      return valToFind.test(valToSearchIn.toString());
    }
    return !!valToSearchIn.toString().match(valToFind.toString());
}

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
export const escapeRegExp =
    (regexStr: string): string => regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1');

/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
export const matchesIgnoreCase =
    (matchOn: string) => (val: string): boolean => !!val.toLowerCase().match(matchOn.toLowerCase());

/**
 * String that creates a blank line without using \n.
 */
export const newlineStr = `
`;

/**
 * Remove all spaces in the given string.
 *
 * @param {string} str - String to remove spaces from
 * @return {string} input string with spaces removed
 *
 * @example elminateWhitespace(' my test  string   ');
 *          // => myteststring
 */
export const removeWhitespace = (str: string): string => str.replace(/ /g, '');

/** Alias for removeWhitespace */
export const eliminateWhitespace = removeWhitespace;
/** Alias for removeWhitespace */
export const rmWhitespace = removeWhitespace;
/** Alias for removeWhitespace */
export const rmSpaces = removeWhitespace;

/**
 * Remove all chars in charsToChomp string from end of given string str.
 * Defaults to eliminating carriage return and newline.
 * @param {string} str - String to chomp (from end)
 * @param {string} charsToChomp - String (acting as array of chars) containing all chars to chomp.
 * @return {string} str with all chars in charsToChomp eliminated from end of string.
 */
export const chomp = (str: string, charsToChomp: string = '\n\r'): string => {
    const charsToChompRegexStr = charsToChomp.split('').join('|');
    return str.replace(new RegExp(`(${charsToChompRegexStr})+$`, 'g'), '');
};

/**
 * Convert camelCase, PascalCase, or dash-case to snake_case.
 * @param {string} str - String to convert to snake_case.
 * @param {boolean} consecUppercaseToLowercase - if true, converts consecutive uppercase chars to
 *                  lowercase, rather than putting _ between them (the default behaviour)
 *                  e.g. newOSName -> new_os_name, instead of new_o_s_name.
 * @return {string} given string converted to snake_case.
 */
export const toSnakeCase = (str: string, consecUppercaseToLowercase = false): string => {
    // Conditionally deal with consecutive capital letters.
    const cleanStr = consecUppercaseToLowercase
                         ? str.replace(/([a-z])([A-Z]+)([A-Z])([a-z])/g, '$1_$2_$3$4').toLowerCase()
                         : str;
    let retStr =
        cleanStr.trim()
           //Remove apostrophes, quotes, commas, |, ?, !, and ,
           .replace(/('|"|\!|\?|\`|,|\|)/g, '')
           // Replace periods with _s
           .replace(/(\.)/g, '_')
           // From sentence e.g. Let's go to the store
           .replace(/ /g, '_')
           // From PascalCase or camelCase
           .replace(/([A-Z])/g, "_$1")
           // From dash-case, including "Dash-Title-Case" (dash-case with caps)
           .replace(/(\-)([a-zA-Z0-9])/g, '_$2')
           // Eliminate repeat, preceding, and trailing underscores, and stray dashes.
           .replace(/(_{1,})?\-{1,}(_{1,})?/g, '_')
           .replace(/_{1,}/g, '_')
           .replace(/^(_|\-){1,}/, '')
           .replace(/(_|\-){1,}$/, '')
           // Remove caps (snake_case is always lowercase)
           .toLowerCase()
    return retStr;
}

export const toSnakecase = toSnakeCase;

/**
 * Converts any string to camelCase.
 * This includes consistently making the first letter lowercase, capitalizing the 1st char after
 * each non-alphanumeric char, and eliminating all non-alphanumeric characters and whitespace.
 * @param {string} str String to convert to camelCase
 * @return {string} String converted to camelCase format.
 */
export const toCamelCase = (str: string) => {
    const midStr = str
        .replace(
            /(?:^\w|[A-Z]|\b\w|\s+)/g,
            (match: string, idx: number) => {
                if (+match === 0) return "";
                return idx == 0 ? match.toLowerCase() : match.toUpperCase();
            }
        )
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
export const removeMatchingText = (str: string, matcherToRm: string | RegExp): string =>
    replaceAll(str, matcherToRm, '');

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
export function withLeftIndent(strings, leftPadSize = 0, xz?) {
    _validateWithLeftIndent(leftPadSize);

    // |** 0 **| Detect position of first 'data' string in raw strings array.
    const firstStringPos = (typeof strings[1] !== 'undefined' && strings[1] != null) ? 1 : 0;

    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n.
    const lines: string[] = strings[firstStringPos].split('\n');

    // |** 2 **| Remove 1st element if it's ''. This is the 'pre-initial-variable' string.
    if (lines[0].length === 0) lines.shift();

    // |** 3 **| Determine which line has the shortest indent.
    const shortestIndent = _detectShortestIndentInArray(lines);

    // |** 4 **| Create the indentation string to add & whitespace string to split on
    const leftPadSpaces = ' '.repeat(leftPadSize);
    const initialIndent = ' '.repeat(shortestIndent);

    // |** 5 **| Cut out the required number of spaces
    const linesPreppedArr = lines.map(
        (line: string) => line.replace(new RegExp(`^${initialIndent}`, 'm'), leftPadSpaces)
    );

    // |** 6 **| Convert array back to string.
    const linesPrepped = linesPreppedArr.join(`\n`);

    // |** 7 **| Remove trailing whitespace in empty lines, and return result.
    return linesPrepped.replace(/^\s+$/gm, '');
};

/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of 'len' number of  repeats of 'charToRepeat'.
 * @param {number} len - number of repeats of charToRepeat in output string
 * @param {string} charToRepeat - Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat.
 */
export const repeatChars = (repChar: string, len: number): string => arrayN(len, repChar).join('');

/**
 * Alias for repeatChar
 */
export { repeatChars as repeatChar }

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
export const endsWithExt = (inode: string, ext: string) => {
    const cleanExt = (ext.match(/^\./)) ? withoutFirst(ext.split(/\./g)).join() : ext;
    const extArrLen = cleanExt.split(/\./g).length;
    const inodeArrRev = inode.split(/\./g).reverse();

    if (extArrLen === 1) {
        return inodeArrRev[0] === cleanExt;
    }
    if (extArrLen === 2) {
        if (inodeArrRev.length < 2) return false;
        return `${inodeArrRev[1]}.${inodeArrRev[0]}` === cleanExt;
    }
    if (extArrLen === 3) {
        if (inodeArrRev.length < 3) return false;
        return `${inodeArrRev[2]}.${inodeArrRev[1]}.${inodeArrRev[0]}` === cleanExt;
    }
    if (extArrLen === 4) {
        if (inodeArrRev.length < 4) return false;
        return `${inodeArrRev[3]}.${inodeArrRev[2]}.${inodeArrRev[1]}.${inodeArrRev[0]}` ===
            cleanExt;
    }
    return false;
};

/**
 * If given string ends in .js, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .js.
 */
export const endsInDotJs = (inode: string) => endsWithExt(inode, 'js');
/**
 * If given string ends in .jsx, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .jsx.
 */
export const endsInDotJsx = (inode: string) => endsWithExt(inode, 'jsx');
/**
 * If given string ends in .ts, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .ts.
 */
export const endsInDotTs = (inode: string) => endsWithExt(inode, 'ts');
/**
 * If given string ends in .tsx, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .tsx.
 */
export const endsInDotTsx = (inode: string) => endsWithExt(inode, 'tsx');
/**
 * If given string ends in .json, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .json.
 */
export const endsInDotJson = (inode: string) => endsWithExt(inode, 'json');
/**
 * If given string ends in .hbs, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .hbs.
 */
export const endsInDotHbs = (inode: string) => endsWithExt(inode, 'hbs');
/**
 * If given string ends in .css, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .css.
 */
export const endsInDotCss = (inode: string) => endsWithExt(inode, 'css');
/**
 * If given string ends in .scss, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .scss.
 */
export const endsInDotScss = (inode: string) => endsWithExt(inode, 'scss');

/**
 * Return true if string doesn't have .min as a secondary extension (e.g. file.min.js, file.min.ts)
 * @param {string} inode - Any string, but it's intended to be a file/directory path.
 * @return {boolean} true if file doesn't end in .min.[anyExt] (e.g. a.min.json, b.min.css)
 */
export const isNonMinFile = (inode: string) => inode.split(/\./g).reverse()[1] !== 'min';

/**
 * Get the base filename from the given path.
 * @example getBaseFilenameFromPath(./src/translations/en.json); // => en.json
 */
export const getBaseFilenameFromPath = (filePath: string) => filePath.split('/').slice(-1)[0];

/**
 * Pad string to given width by repeatedly adding the pad char (default: ' ') on the left.
 * @param {string} strToPad - String to pad to the given width
 * @param {number} width - Final length of the output string
 * @param {string} padChar - Character
 */
// export const padLeft = (strToPad: string, width: number, padChar: string = ' '): string => {
//     // if (padChar.length !== 1) throw new TypeError('mad-utils::padLeft must receive a character, not a string')

//     return strToPad.length >= width ? strToPad : padLeft(padChar + strToPad, width, padChar);
// }

/***************************************** STRING PADDING *****************************************/
export type Sides = 'left' | 'right' | 'center';

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
export const pad =
    (strToPad: string = '', outWidth: number = 0, padChar: string = ' ', side: Sides = 'center') =>
{
    const cleanStr = strToPad.toString();
    if (typeof outWidth === 'undefined' || outWidth == null) return cleanStr;

    const numCharsToAdd = outWidth - cleanStr.length;
    if (numCharsToAdd <= 0) return cleanStr;

    switch(side) {
        case 'left':
            return repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd) + cleanStr;
        case 'right':
            return cleanStr + repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd);
        case 'center': default:
            return _centerPad(cleanStr, outWidth, padChar);
    }
};


export const _centerPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') => {
    const cleanStr = strToPad.toString();
    const padCharClean = _cleanCharToPadWith(padChar);
    const widthToAddToEachSide = (outWidth - cleanStr.length) / 2;
    const basePaddingWidth = Math.floor(widthToAddToEachSide);
    const basePadding = repeatChars(padCharClean, basePaddingWidth);

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
export const leftPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') =>
    pad(strToPad, outWidth, padChar, 'left');

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
export const rightPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') =>
    pad(strToPad, outWidth, padChar, 'right');

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
export const centeredPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') =>
    pad(strToPad, outWidth, padChar, 'center');

export { centeredPad as centerPad }

/*********************************** TEST EXPORTS ***********************************/
/**
 * Ensure proper char for padding was passed to rightPad, leftPad, and centeredPad.
 */
function _cleanCharToPadWith(padChar: string | number = ' ') {
    if (typeof padChar === 'number' && padChar === 0) return '0';
    if (typeof padChar !== 'undefined' && padChar !== null) return padChar.toString();
    return ' ';
}
/*<<~@@TEST_EXPORT~>>*/ export { _cleanCharToPadWith }

// Aliases
export { leftPad as padLeft }
export { rightPad as padRight }

/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
export { stringToEnumVal } from './enum';
export { splitLines, first, first2, first3, firstN, last, last2, last3, lastN, without,
         withoutFirst, withoutFirst2, withoutFirst3, withoutLast, withoutLast2, withoutLast3,
         withoutFirstN, withoutLastN } from './array';
