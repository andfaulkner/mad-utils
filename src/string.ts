/******************************************** IMPORTS *********************************************/
import {StrOrNum} from './types-iso';
import {Int} from './number';
import {withoutFirst, arrayN} from './array';

export type Char = string;
export type Chars = string;
export type Character = string;
export type Characters = string;

/***************************************** LOCAL HELPERS ******************************************/
/**
 * Determine what item in a array of strings has the smallest indent
 * Purpose: to remove this amount of indent from all lines, thus preserving nested indentation
 * We can then define the indentation ourselves in a variable
 *
 * It's all about avoiding problems like this with multiline templates:
 *
 *         <body>
 *             <div id="project-wrapper">
 *                 <div id="react-root">
 *         <!-- Vomit -->
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
    // Ensure input is an array
    const lineArr = (Array.isArray(lines) ? lines : [lines]) as string[];

    // Set flag to exclude last line from comparison if it's an empty whitespace-only line
    const excludeLast = !!lines[lines.length - 1].match(/^\s+$/);

    return lineArr.reduce((acc: number, line: string, idx: number) => {
        // Exclude last line from comparison if it's an empty whitespace-only line
        if (excludeLast && idx === lines.length - 1) return acc;

        // If any line found with no indent, prevent comparisons for the remainder of the loop
        if (acc === 0) return acc;

        // Match on current line's indentation
        const match = line.match(/^\s+/m);

        // If there's no match, there's no indent - set to 0
        if (!match || !match.input || !match[0]) return 0;

        // If indent length is shorter than the prior shortest, return as new shortest length
        return match[0].length < acc ? match[0].length : acc;
    }, 120);
};

/**
 * Ensure left-size indent makes sense
 * It must be an integer, or string that can parse to an integer
 *
 * @param {number|string} leftPadSize Content of required interpolated item
 *                                    placed directly after the start quote
 * @return {never|void} Throw if leftPadSize is invalid
 */
const _validateWithLeftIndent = (leftPadSize: number | string): never | void => {
    const nullLeftPadSize = !leftPadSize && leftPadSize !== 0;
    const leftPadSizeNotNumberType = typeof parseInt(leftPadSize.toString(), 10) !== 'number';
    const leftPadSizeIsNaN = isNaN(parseInt(leftPadSize.toString(), 10));

    if (nullLeftPadSize || leftPadSizeNotNumberType || leftPadSizeIsNaN) {
        throw new Error(`
            withLeftIndent template strings must receive an interpolated value
            with an integer immediately after the template string starting token.
                E.g.: withLeftIndent\`\${4}
                          Some text goes here.
                          And also here.\n
                      \`
            `);
    }
};

/*********************************** EXPORTED STRING FUNCTIONS ************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase
 */
export const cap1LowerRest = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Capitalize the first letter of a string
 * If given a null value, returns ''
 */
export const capitalize = (str: string): string =>
    !str ? '' : str.charAt(0).toUpperCase() + str.slice(1);

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
export const replaceAll = (text: string, find: string | RegExp, replace: string) =>
    typeof find === 'string'
        ? text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
        : text.replace(find, replace);

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
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export const matches = (valToFind: StrOrNum | RegExp) => (valToSearchIn: StrOrNum): boolean => {
    if (typeof valToFind !== typeof valToSearchIn && !(valToFind instanceof RegExp)) {
        return false;
    }
    if (valToFind instanceof RegExp) {
        return valToFind.test(valToSearchIn.toString());
    }
    return !!valToSearchIn.toString().match(valToFind.toString());
};

/**
 * Get first substring to match the given string or RegExp
 * @param {string} strToSearchIn String to search for the string or RegExp
 * @param {string|RegExp} matcher String or RegExp to find in strToSearchIn
 * @return {string} first substring to match the given string or RegExp; '' if no matches found
 */
export const matchFirst = (strToSearchIn: string, matcher: string | RegExp): string => {
    const matches = strToSearchIn.match(matcher);
    return (matches && matches[0]) || '';
};

/**
 * Escape a string for use as a regex. Allows repeat matching on a single string
 * Converts string to form that lets it be used as a pure 'literal' string to match
 * against directly if passed to new RegExp (no special chars taken into account)
 *
 * It essentially escapes special regex characters/metacharacters (e.g. *, ., +) in such a
 * way that the regex builder ignores their special and instead seeks them literally
 *
 * @example escapeRegExp('*.js'); //=> '\\*\\.js'
 * @param {string} regexStr String to escape for use in literal form in a regex builder
 * @return {string} escaped string
 */
export const escapeRegExp = (regexStr: string): string =>
    regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1');

/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored
 * @param {string} matchAgainst String to match against
 * @return {boolean} true if a match is found
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
export const matchesIgnoreCase = (matchOn: string) => (val: string): boolean =>
    !!val.toLowerCase().match(matchOn.toLowerCase());

/**
 * String that creates a blank line without using \n
 */
export const newlineStr = `
`;

/**
 * Remove all spaces in the given string
 *
 * @example removeWhitespace(' my test  string   '); // => myteststring
 *
 * @param {string} str String to remove spaces from
 * @return {string} input string with spaces removed
 */
export const removeWhitespace = (str: string): string => str.replace(/ /g, '');

/**
 * Remove all chars in charsToChomp string from end of given string str
 * Defaults to eliminating carriage return and newline
 *
 * @param {string} str String to chomp (from end)
 * @param {string} charsToChomp String (acting as array of chars) containing all chars to chomp
 * @return {string} str with all chars in charsToChomp eliminated from end of string
 */
export const chomp = (str: string, charsToChomp: string = '\n\r'): string =>
    str.replace(new RegExp(`(${charsToChomp.split('').join('|')})+$`, 'g'), '');

/**
 * Convert camelCase, PascalCase, or dash-case to snake_case
 *
 * @param {string} str String to convert to snake_case
 * @param {boolean} consecUppercaseToLowercase If true, converts consecutive uppercase chars to
 *                  lowercase, rather than putting _ between them (the default behaviour)
 *                  e.g. newOSName -> new_os_name, instead of new_o_s_name
 * @return {string} given string converted to snake_case
 */
export const toSnakeCase = (str: string, consecUppercaseToLowercase = false): string => {
    // Conditionally deal with consecutive capital letters
    const cleanStr = consecUppercaseToLowercase
        ? str.replace(/([a-z])([A-Z]+)([A-Z])([a-z])/g, '$1_$2_$3$4').toLowerCase()
        : str;
    return (
        cleanStr
            .trim()
            //Remove apostrophes, quotes, commas, |, ?, and !
            .replace(/('|"|\!|\?|\`|,|\|)/g, '')
            // Replace . with _
            .replace(/(\.)/g, '_')
            // Replace ' ' with '_'
            .replace(/ /g, '_')
            // From PascalCase or camelCase
            .replace(/([A-Z])/g, '_$1')
            // From dash-case, including "Dash-Title-Case" (dash-case with caps)
            .replace(/(\-)([a-zA-Z0-9])/g, '_$2')
            // Replace slash (/ or \) with _
            .replace(/[\/\\]/g, '_')
            // Eliminate repeat, preceding, and trailing underscores, and stray dashes
            .replace(/(_{1,})?\-{1,}(_{1,})?/g, '_')
            .replace(/_{1,}/g, '_')
            .replace(/^(_|\-){1,}/, '')
            .replace(/(_|\-){1,}$/, '')
            // Remove caps (snake_case is always lowercase)
            .toLowerCase()
    );
};

/**
 * Converts any string to camelCase
 * This includes consistently making the first letter lowercase, capitalizing the 1st char after
 * each non-alphanumeric char, and eliminating all non-alphanumeric characters and whitespace
 * @param {string} str String to convert to camelCase
 * @return {string} String converted to camelCase format
 */
export const toCamelCase = (str: string) => {
    const midStr = str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, idx: number) => {
            if (+match === 0) return '';
            return idx == 0 ? match.toLowerCase() : match.toUpperCase();
        })
        .replace(/[\-.!@#_%^&*()\[\]{};:'"~`,?\|\/+=\\<>$]+/g, '');
    return midStr.charAt(0).toLowerCase() + midStr.slice(1);
};

/**
 * Return copy of string (str) with all instances of substring or regexp (matcherToRm) removed
 * @example removeMatchingText('asdfqwertyasdfuiopasdf', 'asdf'); // => 'qwertyuiop'
 * @param {string} str String to remove matches from
 * @param {string|RegExp} matcherToRm String to remove from str
 * @return {string} str with all instances of matcherToRm removed
 */
export const removeMatchingText = (str: string, matcherToRm: string | RegExp): string =>
    replaceAll(str, matcherToRm, '');

/************************************** STRING INTERPOLATION **************************************/
const deindentFormat = (str: string) => {
    let size = -1;
    return (
        str
            // Fix indents
            .replace(/\n([ \f\r\t\v]*)/g, (_, match) => {
                if (size < 0) size = match.replace(/\t/g, '    ').length;
                return '\n' + match.slice(Math.min(match.length, size));
            })
            // Remove 1 linebreak before the 1st line, & 1 after the last line
            .replace(/^\n/g, ``)
            .replace(/\n$/g, ``)
    );
};

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
export const deindent = (input, ...args: any[]): string | (() => string) => {
    if (typeof input === 'string') return deindentFormat(input);
    if (typeof input === 'function') return () => deindentFormat(input(...args));
    return deindentFormat(
        input
            .slice(0, args.length + 1)
            .map((text: string, idx: number) => `${idx === 0 ? `` : args[idx - 1]}${text}`)
            .join(``)
    );
};

/**
 * TODO MAKE IT WORK WITH INTERPOLATIONS
 * @export withLeftIndent
 *
 * WARNING: DOES NOT ALLOW INTERPOLATIONS
 *
 * Template string type that allows for properly-indented multiline strings
 *
 * Defines a template string type with the following behaviours:
 *     1. Eliminates all left-size indentation on each line;
 *     2. Can take a single interpolation variable to be placed directly after the start caret,
 *        which must contain an integer or string that can be parsed to an integer;
 *     3. Sets the final left-size indentation to equal the value of said interpolation variable
 *        - If interpolation variable is not given, the value defaults to 0
 *
 * Removes as much left-size whitespace as is present in the shortest indent, then adds the
 * requested number of spaces to the indent
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
 *               Note: ("|" is the left edge of the file)
 *
 * @return {string} Properly indented string
 */
export function withLeftIndent(strings, leftPadSize = 0, xz?) {
    _validateWithLeftIndent(leftPadSize);

    // |** 0 **| Detect position of first 'data' string in raw strings array
    const firstStringPos = typeof strings[1] !== 'undefined' && strings[1] != null ? 1 : 0;

    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n
    const lines: string[] = strings[firstStringPos].split('\n');

    // |** 2 **| Remove 1st element if it's '' (This is the 'pre-initial-variable' string)
    if (lines[0].length === 0) lines.shift();

    // |** 3 **| Determine which line has the shortest indent.
    const shortestIndent = _detectShortestIndentInArray(lines);

    // |** 4 **| Create the indentation string to add & whitespace string to split on
    const leftPadSpaces = ' '.repeat(leftPadSize);
    const initialIndent = ' '.repeat(shortestIndent);

    // |** 5 **| Cut out the required number of spaces
    const linesPreppedArr = lines.map((line: string) =>
        line.replace(new RegExp(`^${initialIndent}`, 'm'), leftPadSpaces)
    );

    // |** 6 **| Convert array back to string
    const linesPrepped = linesPreppedArr.join(`\n`);

    // |** 7 **| Remove trailing whitespace in empty lines, and return result
    return linesPrepped.replace(/^\s+$/gm, '');
}

/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of 'len' number of  repeats of 'charToRepeat'
 * @param {number} len Number of repeats of charToRepeat in output string
 * @param {string} charToRepeat Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat
 */
export const repeatChars = (repStr: string, len: Int): string => arrayN(len, repStr).join('');

/*************************************** FILE PATH STRINGS ****************************************/
/**
 * If given string ends in given substring preceded by a '.', returns true
 * Note: only works for extensions with up to 4 parts e.g. .b.c.d.e
 *
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @param {string} ext Any string, but it's meant to be a file extension (e.g. js)
 * @return {boolean} true if file ends in given extension
 *
 * @example endsWithExt('ok.tsx', 'tsx') // => true
 */
export const endsWithExt = (inode: string, ext: string) => {
    const cleanExt = ext.match(/^\./) ? withoutFirst(ext.split(/\./g)).join() : ext;
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
        return (
            `${inodeArrRev[3]}.${inodeArrRev[2]}.${inodeArrRev[1]}.${inodeArrRev[0]}` === cleanExt
        );
    }
    return false;
};

/**
 * If given string ends in .js, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .js
 */
export const endsInDotJs = (inode: string) => endsWithExt(inode, 'js');
/**
 * If given string ends in .jsx, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .jsx
 */
export const endsInDotJsx = (inode: string) => endsWithExt(inode, 'jsx');
/**
 * If given string ends in .ts, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .ts
 */
export const endsInDotTs = (inode: string) => endsWithExt(inode, 'ts');
/**
 * If given string ends in .tsx, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .tsx
 */
export const endsInDotTsx = (inode: string) => endsWithExt(inode, 'tsx');
/**
 * If given string ends in .json, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .json
 */
export const endsInDotJson = (inode: string) => endsWithExt(inode, 'json');
/**
 * If given string ends in .hbs, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .hbs
 */
export const endsInDotHbs = (inode: string) => endsWithExt(inode, 'hbs');
/**
 * If given string ends in .css, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .css
 */
export const endsInDotCss = (inode: string) => endsWithExt(inode, 'css');
/**
 * If given string ends in .scss, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .scss
 */
export const endsInDotScss = (inode: string) => endsWithExt(inode, 'scss');

/**
 * Return true if string doesn't have .min as a secondary extension (e.g. file.min.js, file.min.ts)
 * @param {string} inode Any string, but it's intended to be a file/directory path
 * @return {boolean} true if file doesn't end in .min.[anyExt] (e.g. a.min.json, b.min.css)
 */
export const isNonMinFile = (inode: string) => inode.split(/\./g).reverse()[1] !== 'min';

/**
 * Get the base filename from the given path
 * @example getBaseFilenameFromPath(./src/translations/en.json); // => en.json
 */
export const getBaseFilenameFromPath = (filePath: string) => filePath.split('/').slice(-1)[0];

/***************************************** STRING PADDING *****************************************/
export type Sides = 'left' | 'right' | 'center';

/**
 * Pad string to the given length, with additional characters added to the given
 * side - or split across both sides if side arg is 'center'
 * If initial string is longer than the width to pad to, return initial string unmodified
 *
 * @param {string} strToPad Initial string to pad to given length with given char
 * @param {number} outWidth Width to increase the string to (by adding padding char repeatedly)
 * @param {string} padChar Character to repeatedly add to left side of strToPad
 * @param {Sides} side Side to add padCharTo :: values: 'left', 'right', 'center'
 *                     For center, adds char on each side, w the odd number extra added to the right
 *
 * @return {string} strToPad padded to outWidth length via leftside repeats of padChar
 */
export const pad = (
    strToPad: string = '',
    outWidth: number = 0,
    padChar: string = ' ',
    side: Sides = 'center'
) => {
    const cleanStr = strToPad.toString();
    if (typeof outWidth === 'undefined' || outWidth == null) return cleanStr;

    const numCharsToAdd = outWidth - cleanStr.length;
    if (numCharsToAdd <= 0) return cleanStr;

    switch (side) {
        case 'left':
            return repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd) + cleanStr;
        case 'right':
            return cleanStr + repeatChars(_cleanCharToPadWith(padChar), numCharsToAdd);
        case 'center':
        default:
            return _centerPad(cleanStr, outWidth, padChar);
    }
};

const _centerPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') => {
    const cleanStr = strToPad.toString();
    const padCharClean = _cleanCharToPadWith(padChar);
    const widthToAddToEachSide = (outWidth - cleanStr.length) / 2;
    const basePaddingWidth = Math.floor(widthToAddToEachSide);
    const basePadding = repeatChars(padCharClean, basePaddingWidth);

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
export const leftPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') =>
    pad(strToPad, outWidth, padChar, 'left');

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
export const rightPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') =>
    pad(strToPad, outWidth, padChar, 'right');

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
export const centerPad = (strToPad: string = '', outWidth: number = 0, padChar: string = ' ') =>
    pad(strToPad, outWidth, padChar, 'center');

/**************************************** CHARACTER TESTS *****************************************/
/**
 * @return {boolean} If given string is a whitespace character, return true
 */
export const isWhitespaceChar = (matchChar: Char): boolean =>
    matchChar && matchChar.length === 1 && '\t\n '.indexOf(matchChar) >= 0;

/**
 * @return {boolean} If given string is a whitespace character, return true
 */
export const isAlphanumericChar = (matchChar: Char): boolean => /^[a-zA-Z0-9]$/.test(matchChar);

/**
 * @return {boolean} If given string is a operator character, return true
 */
export const isOperatorChar = (matchChar: Char): boolean =>
    !!matchChar && matchChar.length === 1 && `+-*=|&<>?:/!%^~]`.indexOf(matchChar) >= 0;

/**************************************** STRING -> REGEX *****************************************/
const RegExpFlags = 'yumig';

/**
 * If matching quotes found at left- & right-most positions of given string, remove them
 * If none found, returns string as-is
 * @param  {string} str String to check & remove from
 * @return {string} Input string with bookending quotes removed
 * @example removeSurroundingQuotes('"asdf"'); // => 'asdf'
 */
export const removeSurroundingQuotes = (str: string): string => {
    if (
        (str.length > 1 && (str[0] === '`' && str[str.length - 1] === '`')) ||
        (str[0] === "'" && str[str.length - 1] === "'") ||
        (str[0] === '"' && str[str.length - 1] === '"')
    ) {
        return str.replace(/(^['"`])|(['"`]$)/g, '');
    }
    return str;
};

/**
 * Returns true if string is a RegExp or string that can compile to RegExp
 * @param {string|RegExp} str Check if this is a RegExp or string in '/chars/flags' format
 * @return {boolean} True if input is a string in '/chars/flags' format, or a RegExp
 */
export const isRegexString = (str: string | RegExp): boolean =>
    str instanceof RegExp || !!str.match(/^\/[\s\S]+\/[yumig]{0,5}$/);

/**
 * Get flags from string in regex string format - i.e. "/regex_query/flags"
 * @param {string} str String to get flags from. Grabs from chars after the final /
 * @return {string|null} String of flag chars e.g. '', 'yum', 'g'. null if str isn't in regex form
 */
export const getFlagsFromRegexString = (str: string): string | null => {
    if (!isRegexString(str)) return null;

    // Get the actual flag 'section'
    const flagSect = str.split('/').reverse()[0];

    // Iterate through the section of the string past the last slash, 1 char at a time
    return flagSect.split('').reduce((acc, char) => {
        // See if any flag matches the current character
        const matchesFlag = RegExpFlags.match(char);

        // If the current char is not a flag, throw an error
        if (!matchesFlag) {
            console.warn(
                `Invalid RegExp string : ${str}. '${char}' is not a ` +
                    `flag - only y, u, m, i, and g are valid flags.`
            );
            return null;
        }

        // If current char is a flag that's already set, throw an error (no duplicate flags)
        if (acc && acc.split('').find(flag => flag === matchesFlag[0])) {
            console.warn(
                `Invalid RegExp string : ${str}. RegExp strings can ` +
                    `only contain one of each flag (y, u, m, i, and g).`
            );
            return null;
        }

        // Otherwise set the flag property to true in the flags object
        acc += matchesFlag[0];
        return acc;
    }, '');
};

/**
 * Remove left & right side '/', and all right-side flags from given regex in string form
 * @example removeSlashesFlagsSurroundingRegexString("/asdf/gi") // => "asdf"
 *
 * @param {string} str Regex string to remove slashes from (e.g. '/find_this_value/gm')
 * @return {string} Regex string with the flags and bookending '/' chars removed
 */
export const removeSlashesFlagsSurroundingRegexString = (str: string): string =>
    str.replace(/^\//, '').replace(/\/[yumig]{0,5}$/, '');

import {accentToNoneCharMap} from './internal/accent-to-none-char-map';

/**
 * Remove french accents from strings, as well as rare accents occurring in English
 */
export const deburrFrenchEnglish = (str: string): string => {
    if (!str) return '';
    let outArr = [];
    for (const char of str.split('')) {
        outArr.push(accentToNoneCharMap[char] || char);
    }
    return outArr.join('');
};

/**
 * Ensure proper char for padding was passed to rightPad, leftPad, and centerPad
 */
function _cleanCharToPadWith(padChar: string | number = ' ') {
    if (typeof padChar === 'number' && padChar === 0) return '0';
    if (typeof padChar !== 'undefined' && padChar !== null) return padChar.toString();
    return ' ';
}

export {leftPad as padLeft};
export {rightPad as padRight};

/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
export {countOccurrences as countChars} from './array';
export {countOccurrences as countCharOccurrences} from './array';
export {countOccurrences as charOccurrences} from './array';
export {countOccurrences as charCount} from './array';
export {removeDuplicates as uniqChars} from './array';
export {removeDuplicates as uniqueChars} from './array';
export {removeDuplicates as removeDuplicateChars} from './array';
