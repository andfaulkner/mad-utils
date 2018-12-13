export {escapeRegExp, matches, matchesIgnoreCase, replaceAll} from './string';

/**
 * Perform actual fuzzy search
 */
const fSearch = (needle: string, haystack: string) => {
    outerLoop: for (let nPos = 0, hPos = 0; nPos < needle.length; nPos++) {
        while (hPos < haystack.length) {
            if (haystack.charCodeAt(hPos) === needle.charCodeAt(nPos)) {
                continue outerLoop;
            }
            if (hPos > 0 && haystack.charCodeAt(hPos - 1) === needle.charCodeAt(nPos)) {
                continue outerLoop;
            }
            hPos++;
        }
        return false;
    }
    return true;
};

/**
 * Ultra-forgiving fuzzy search for {string} needle, in {string} haystack
 * Search is done both forwards and backwards to catch inverted key errors
 *
 * @param {string} needle Fuzzy-search for this string within string haystack
 * @param {string} haystack Fuzzy-search for string needle within this string
 * @return {boolean} True if needle found (roughly) in haystack
 */
export const fuzzySearch = (needle: string, haystack: string): boolean => {
    // If no needle, always return true
    if (!needle) return true;

    const needleLowercase = needle.toLowerCase();
    const haystackLowercase = haystack.toLowerCase();

    // Perform basic searches (for performance), return true on success
    const haystackLength = haystack.length;
    const needleLength = needle.length;
    if (!haystack || needleLength > haystackLength) return false;
    if (needleLength === haystackLength && needleLowercase === haystackLowercase) return true;

    // Perform fuzzy search
    return fSearch(needleLowercase, haystackLowercase);
};
