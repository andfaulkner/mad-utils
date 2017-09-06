/*********************************** EXPORTED STRING FUNCTIONS ************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
export declare const cap1LowerRest: (str: string) => string;
/**
 * Capitalize the first letter of a string.
 * If given a null value, returns ''.
 */
export declare const capitalize: (str: string) => string;
/**
 * Replace all matching strings in a text segment with a given replacement string. Can also match
 * against a regex. Main benefit: *ALL* matching strings get replaced.
 * @param {string} text - string to search and replace in.
 * @param {string|RegExp} find - string or RegExp to match against
 * @param {string} replace - replacement text
 * @return {string} original text with replacements made.
 */
export declare const replaceAll: (text: string, find: string | RegExp, replace: string) => string;
/**
 * Inversion of String.prototype.match, for usage as a predicate, but also works for searching
 * with a RegExp or number. The type of the item to find for & the item being searched must match,
 * unless valToFind is a RegExp.
 * @param {string|number|RegExp} valToFind - Value to search for in valToSearchIn.
 * @param {string|number} valToSearchIn - string or number to match against.
 * @return {boolean} true if a match is found.
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export declare const matches: (valToFind: string | number | RegExp) => (valToSearchIn: string | number) => boolean;
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
export declare const escapeRegExp: (regexStr: string) => string;
/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
export declare const matchesIgnoreCase: (matchOn: string) => (val: string) => boolean;
/**
 * String that creates a blank line without using \n.
 */
export declare const newlineStr: string;
/**
 * Remove all spaces in the given string.
 *
 * @param {string} str - String to remove spaces from
 * @return {string} input string with spaces removed
 *
 * @example elminateWhitespace(' my test  string   ');
 *          // => myteststring
 */
export declare const removeWhitespace: (str: string) => string;
/** Alias for removeWhitespace */
export declare const eliminateWhitespace: (str: string) => string;
/** Alias for removeWhitespace */
export declare const rmWhitespace: (str: string) => string;
/** Alias for removeWhitespace */
export declare const rmSpaces: (str: string) => string;
/**
 * Remove all chars in charsToChomp string from end of given string str.
 * Defaults to eliminating carriage return and newline.
 * @param {string} str - String to chomp (from end)
 * @param {string} charsToChomp - String (acting as array of chars) containing all chars to chomp.
 * @return {string} str with all chars in charsToChomp eliminated from end of string.
 */
export declare const chomp: (str: string, charsToChomp?: string) => string;
/**
 * Convert camelCase, PascalCase, or dash-case to snake_case.
 * @param {string} str - String to convert to snake_case.
 * @param {boolean} consecUppercaseToLowercase - if true, converts consecutive uppercase chars to
 *                  lowercase, rather than putting _ between them (the default behaviour)
 *                  e.g. newOSName -> new_os_name, instead of new_o_s_name.
 * @return {string} given string converted to snake_case.
 */
export declare const toSnakeCase: (str: string, consecUppercaseToLowercase?: boolean) => string;
export declare const toSnakecase: (str: string, consecUppercaseToLowercase?: boolean) => string;
/**
 * Return copy of string (str) with all instances of substring or regexp (matcherToRm) removed.
 * @example removeMatchingText('asdfqwertyasdfuiopasdf', 'asdf'); // => 'qwertyuiop'
 * @param {string} str - String to remove matches from.
 * @param {string|RegExp} matcherToRm - String to remove from str.
 * @return {string} str with all instances of matcherToRm removed.
 */
export declare const removeMatchingText: (str: string, matcherToRm: string | RegExp) => string;
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
export declare function withLeftIndent(strings: any, leftPadSize?: number, xz?: any): string;
/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of 'len' number of  repeats of 'charToRepeat'.
 * @param {number} len - number of repeats of charToRepeat in output string
 * @param {string} charToRepeat - Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat.
 */
export declare const repeatChars: (repChar: string, len: number) => string;
/**
 * Alias for repeatChar
 */
export { repeatChars as repeatChar };
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
export declare const endsWithExt: (inode: string, ext: string) => boolean;
/**
 * If given string ends in .js, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .js.
 */
export declare const endsInDotJs: (inode: string) => boolean;
/**
 * If given string ends in .jsx, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .jsx.
 */
export declare const endsInDotJsx: (inode: string) => boolean;
/**
 * If given string ends in .ts, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .ts.
 */
export declare const endsInDotTs: (inode: string) => boolean;
/**
 * If given string ends in .tsx, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .tsx.
 */
export declare const endsInDotTsx: (inode: string) => boolean;
/**
 * If given string ends in .json, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .json.
 */
export declare const endsInDotJson: (inode: string) => boolean;
/**
 * If given string ends in .hbs, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .hbs.
 */
export declare const endsInDotHbs: (inode: string) => boolean;
/**
 * If given string ends in .css, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .css.
 */
export declare const endsInDotCss: (inode: string) => boolean;
/**
 * If given string ends in .scss, returns true.
 * @param {string} inode - Any string, but it's intended for a file/directory path.
 * @return {boolean} true if file ends in .scss.
 */
export declare const endsInDotScss: (inode: string) => boolean;
/**
 * Return true if string doesn't have .min as a secondary extension (e.g. file.min.js, file.min.ts)
 * @param {string} inode - Any string, but it's intended to be a file/directory path.
 * @return {boolean} true if file doesn't end in .min.[anyExt] (e.g. a.min.json, b.min.css)
 */
export declare const isNonMinFile: (inode: string) => boolean;
/**
 * Get the base filename from the given path.
 * @example getBaseFilenameFromPath(./src/translations/en.json); // => en.json
 */
export declare const getBaseFilenameFromPath: (filePath: string) => string;
/**
 * Pad string to given width by repeatedly adding the pad char (default: ' ') on the left.
 * @param {string} strToPad - String to pad to the given width
 * @param {number} width - Final length of the output string
 * @param {string} padChar - Character
 */
/***************************************** STRING PADDING *****************************************/
export declare type Sides = 'left' | 'right' | 'center';
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
export declare const pad: (strToPad?: string, outWidth?: number, padChar?: string, side?: Sides) => string;
export declare const _centerPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
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
export declare const leftPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
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
export declare const rightPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
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
export declare const centeredPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
export { centeredPad as centerPad };
/*********************************** TEST EXPORTS ***********************************/
/**
 * Ensure proper char for padding was passed to rightPad, leftPad, and centeredPad.
 */
declare function _cleanCharToPadWith(padChar?: string | number): string;
export { _cleanCharToPadWith };
export { leftPad as padLeft };
export { rightPad as padRight };
/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
export { stringToEnumVal } from './enum';
export { splitLines, first, first2, first3, firstN, last, last2, last3, lastN, without, withoutFirst, withoutFirst2, withoutFirst3, withoutLast, withoutLast2, withoutLast3, withoutFirstN, withoutLastN } from './array';
