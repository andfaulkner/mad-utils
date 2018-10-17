import { StrOrNum } from './types-iso';
export declare type Char = string;
export declare type Chars = string;
export declare type Character = string;
export declare type Characters = string;
/*********************************** EXPORTED STRING FUNCTIONS ************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase
 */
export declare const cap1LowerRest: (str: string) => string;
/**
 * Capitalize the first letter of a string
 * If given a null value, returns ``
 */
export declare const capitalize: (str: string) => string;
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
export declare const replaceAll: (text: string, find: string | RegExp, replace: string) => string;
/**
 * Inversion of String.prototype.match, for usage as a predicate, but also
 * works for searching with a RegExp or number
 *
 * The type of the item to find for & the item being searched must match, unless
 * valToFind is a RegExp
 *
 * Example usage: [`gr`, `hello`].find(matches(`hello`)); // => true
 *
 * @param {string|number|RegExp} valToFind Value to search for in valToSearchIn
 * @param {string|number} valToSearchIn string or number to match against
 * @return {boolean} true if a match is found
 */
export declare const matches: (valToFind: string | number | RegExp) => (valToSearchIn: StrOrNum) => boolean;
/**
 * Get first substring to match the given string or RegExp
 *
 * @param {string} haystack String to search for the string or RegExp
 * @param {string|RegExp} needle String or RegExp to find in haystack
 * @return {string} 1st substring of haystack to match needle; `` if no matches found
 */
export declare const matchFirst: (haystack: string, needle: string | RegExp) => string;
/**
 * Escape a string for use as a regex
 * Allows repeat char matching on a single string (e.g. `/?+` emits `\\/\\?\\+`)
 * Converts string to form that lets it be used as a pure 'literal' string to match
 * against directly if passed to new RegExp (no special chars taken into account)
 *
 * It essentially escapes special regex characters/metacharacters (e.g. *, ., +) in such a
 * way that the regex builder ignores their special and instead seeks them literally
 *
 * Example: escapeRegExp(`*.js`); //=> `\\*\\.js`
 *
 * @param {string} regexStr String to escape for use in literal form in a regex builder
 * @return {string} escaped string
 */
export declare const escapeRegExp: (regexStr: string) => string;
/**
 * Curried (for use as a predicate) & case-insensitive version of String.prototype.match
 * @param {string} matchAgainst String to match against
 * @return {boolean} true if a match is found
 *
 * Example usage: [`gr`, `HeLLo`].find(matchesIgnoreCase(`hello`)); // => true
 */
export declare const matchesIgnoreCase: (matchOn: string) => (val: string) => boolean;
/**
 * String that creates a blank line without using \n
 */
export declare const newlineStr = "\n";
/**
 * Remove all spaces in the given string
 *
 * Example: removeWhitespace(` my test  string   `); // => myteststring
 *
 * @param {string} str String to remove spaces from
 * @return {string} input string with spaces removed
 */
export declare const removeWhitespace: (str: string) => string;
/**
 * Remove all characters in [charsToChomp] string from end of given string [str]
 * Defaults to eliminating carriage return and newline characters
 *
 * @param {string} str String to chomp (from end)
 * @param {string} charsToChomp String (acting as array of chars) containing
 *                              all chars to chomp
 * @return {string} str with all chars in charsToChomp removed from end of string
 */
export declare const chomp: (str: string, charsToChomp?: string) => string;
/**
 * Convert camelCase, PascalCase, or dash-case to snake_case
 *
 * @param {string} str String to convert to snake_case
 * @param {boolean} consecUppercaseToLowercase If true, converts consecutive uppercase chars to
 *                  lowercase, rather than putting _ between them (the default behaviour)
 *                  e.g. newOSName -> new_os_name, instead of new_o_s_name
 * @return {string} given string converted to snake_case
 */
export declare const toSnakeCase: (str: string) => string;
/**
 * Converts any string (in snake_case, PascalCase, Title Case, etc) to dash-case
 * @param {string} str Input string to convert to dash-case
 * @return {string} input string in dash-case
 */
export declare const toDashCase: (str: string) => string;
/**
 * Converts any string (snake_case, PascalCase, dash-case) to camelCase
 *
 * Transforms:
 * - Makes the 1st character lowercase
 * - Capitalizes the 1st character after each non-alphanumeric char
 * - Eliminates all non-alphanumeric characters and whitespace
 *
 * @param {string} str String to convert to camelCase
 * @return {string} String converted to camelCase format
 */
export declare const toCamelCase: (str: string) => string;
/**
 * Return string [str] with all instances of substring or regexp [matcherToRm]
 * removed
 *
 * Example: removeMatchingText(`asdfqwertyasdfuiopasdf`, `asdf`); // => `qwertyuiop`
 *
 * @param {string} str String to remove matches from
 * @param {string|RegExp} matcherToRm String to remove from str
 * @return {string} str with all instances of matcherToRm removed
 */
export declare const removeMatchingText: (str: string, matcherToRm: string | RegExp) => string;
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
export declare const deindent: (input: Function | TemplateStringsArray, ...args: any[]) => string | (() => string);
/****************************************** REPEAT CHARS ******************************************/
/**
 * Create string consisting of [len] number of repeats of [charToRepeat] character
 *
 * @param {number} len Number of repeats of charToRepeat in output string
 * @param {string} charToRepeat Character to repeat in the output string
 * @return {string} string consisting of len repeats of charToRepeat
 */
export declare const repeatChars: (repStr: string, len: number) => string;
/*************************************** FILE PATH STRINGS ****************************************/
/**
 * If given string ends in given substring preceded by a `.`, returns true
 * Note: only works for extensions with up to 4 parts e.g. .b.c.d.e
 *
 * Example: endsWithExt(`ok.tsx`, `tsx`) // => true
 *
 * @param {string} inode Any string, but intended to be a file/directory path
 * @param {string} ext Any string, but meant to be a file extension (e.g. js)
 * @return {boolean} true if file ends in given extension
 */
export declare const endsWithExt: (inode: string, ext: string) => boolean;
/**
 * If given string ends in .js, returns true
 * @param {string} inode Any string, but it's intended for a file/directory path
 * @return {boolean} true if file ends in .js
 */
export declare const endsInDotJs: (inode: string) => boolean;
/**
 * If given string ends in .jsx, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .jsx
 */
export declare const endsInDotJsx: (inode: string) => boolean;
/**
 * If given string ends in .ts, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .ts
 */
export declare const endsInDotTs: (inode: string) => boolean;
/**
 * If given string ends in .tsx, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .tsx
 */
export declare const endsInDotTsx: (inode: string) => boolean;
/**
 * If given string ends in .json, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .json
 */
export declare const endsInDotJson: (inode: string) => boolean;
/**
 * If given string ends in .hbs, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .hbs
 */
export declare const endsInDotHbs: (inode: string) => boolean;
/**
 * If given string ends in .css, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .css
 */
export declare const endsInDotCss: (inode: string) => boolean;
/**
 * If given string ends in .scss, returns true
 * @param {string} inode Any string, but it`s intended for a file/directory path
 * @return {boolean} true if file ends in .scss
 */
export declare const endsInDotScss: (inode: string) => boolean;
/**
 * Return true if string doesn't have .min as a secondary extension
 * e.g. returns false for `file.min.js` and `file.min.ts`
 *      returns true for `file.js` and `file.ts`
 *
 * @param {string} inode Any string, but it's intended to be a file/directory path
 * @return {boolean} true if file doesn't end in .min.[anyExt]
 *                        e.g. returns false for `a.min.json`, `b.min.css`
 */
export declare const isNonMinFile: (inode: string) => boolean;
/**
 * Get the base filename from given path [filePath]
 * Example: getBaseFilenameFromPath(./src/translations/en.json); // => en.json
 */
export declare const getBaseFilenameFromPath: (filePath: string) => string;
/***************************************** STRING PADDING *****************************************/
export declare type Sides = 'left' | 'right' | 'center';
/**
 * Pad string to the given length, with additional characters added to the given
 * side - or split across both sides if side arg is `center`
 * If initial string is longer than the width to pad to, return initial string
 * unmodified
 *
 * @param {string} strToPad Initial string to pad to given length with given char
 * @param {number} outWidth Width to increase the string to (by adding padding char
 *                          repeatedly)
 * @param {string} padChar Character to repeatedly add to left side of strToPad
 * @param {Sides} side Side to add padCharTo :: values: `left`, `right`, `center`
 *                     For center, adds char on each side, w the odd number extra
 *                     added to the right
 *
 * @return {string} strToPad padded to outWidth length via leftside repeats of padChar
 */
export declare const pad: (strToPad?: string, outWidth?: number, padChar?: string, side?: Sides) => string;
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
export declare const leftPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
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
export declare const rightPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
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
export declare const centerPad: (strToPad?: string, outWidth?: number, padChar?: string) => string;
/**************************************** CHARACTER TESTS *****************************************/
/**
 * @return {boolean} If given string is a whitespace character, return true
 */
export declare const isWhitespaceChar: (matchChar: string) => boolean;
/**
 * @return {boolean} If given string is a whitespace character, return true
 */
export declare const isAlphanumericChar: (matchChar: string) => boolean;
/**
 * @return {boolean} If given string is a operator character, return true
 */
export declare const isOperatorChar: (matchChar: string) => boolean;
/**
 * If matching quotes found at left- & right-most positions of given string, remove them
 * If none found, returns string as-is
 * Example: removeSurroundingQuotes(`"asdf"`); // => `asdf`
 *
 * @param  {string} str String to check & remove from
 * @return {string} Input string with bookending quotes removed
 */
export declare const removeSurroundingQuotes: (str: string) => string;
/**
 * Returns true if string is a RegExp or string that can compile to RegExp
 * @param {string|RegExp} str Check if this is a RegExp or string in `/chars/flags` format
 * @return {boolean} True if input is a string in `/chars/flags` format, or a RegExp
 */
export declare const isRegexString: (str: string | RegExp) => boolean;
/**
 * Get flags from string in regex string format - i.e. `/regex_query/flags`
 * @param {string} str String to get flags from. Grabs from chars after the final /
 * @return {string|null} String of flag chars e.g. ``, `mi`, `g`; or null if str not in regex form
 */
export declare const getFlagsFromRegexString: (str: string) => string;
/**
 * Remove left & right side `/`, and all right-side flags from given regex in string form
 * Example: removeSlashesFlagsSurroundingRegexString(`/asdf/gi`) // => `asdf`
 *
 * @param {string} str Regex string to remove slashes from (e.g. `/find_this_value/gm`)
 * @return {string} Regex string with the flags and bookending `/` chars removed
 */
export declare const removeSlashesFlagsSurroundingRegexString: (str: string) => string;
/**
 * Remove french accents from strings, as well as rare accents occurring in English
 */
export declare const deburrFrenchEnglish: (str: string) => string;
export { leftPad as padLeft };
export { rightPad as padRight };
/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
export { countOccurrences as countChars } from './array';
export { countOccurrences as countCharOccurrences } from './array';
export { countOccurrences as charOccurrences } from './array';
export { countOccurrences as charCount } from './array';
export { removeDuplicates as uniqChars } from './array';
export { removeDuplicates as uniqueChars } from './array';
export { removeDuplicates as removeDuplicateChars } from './array';
