
/******************************************** STRINGS *********************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
export function cap1LowerRest(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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
export function replaceAll(text: string, find: string | RegExp, replace: string) {
    return (typeof find === 'string')
            ? text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
            : text.replace(find, replace);
}

/**
 * Inversion of String.prototype.match, for usage as a predicate.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export const matches = (matchAgainst: string) => (val: string): boolean => !!val.match(matchAgainst);

/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * TODO test this.
 */
export function escapeRegExp(regexStr: string) {
    return regexStr.replace(/([\/\\()\[\]{}.*+^$?|=:!])/g, '\\$1');
}

/**
 * Inversion of String.prototype.match, for usage as a predicate, where case is ignored.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', 'HeLLo'].find(matchesIgnoreCase('hello')); // => true
 */
export const matchesIgnoreCase = (matchAgainst: string) => (val: string): boolean => {
    return !!val.toLowerCase().match(matchAgainst.toLowerCase());
};

/**
 * Create a string that creates a blank line without using \n.
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
export const eliminateWhitespace = (str: string): string => str.replace(/ /g, '');
