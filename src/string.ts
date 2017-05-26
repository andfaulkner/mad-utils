/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers } from 'mad-logs';
const log = logFactory()(`string.ts`, logMarkers.lakeLouise);


/******************************************** STRINGS *********************************************/
/**
 * Capitalize the first letter of a string, and convert other letters in the string to lowercase.
 */
export const cap1LowerRest = (str: string): string => str.charAt(0).toUpperCase() +
                                                      str.slice(1).toLowerCase();

/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

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
export const replaceAll = (text: string, find: string | RegExp, replace: string) =>
    (typeof find === 'string')
        ? text.replace(new RegExp(escapeRegExp(find), 'g'), replace)
        : text.replace(find, replace);

/**
 * Inversion of String.prototype.match, for usage as a predicate.
 * @param {string} matchAgainst - string to match against.
 * @return {boolean} true if a match is found.
 *
 * @example USAGE ::  ['gr', hello'].find(matches('hello')); // => true
 */
export const matches =
    (matchAgainst: string) => (val: string): boolean => !!val.match(matchAgainst);

/**
 * Escape a string for use as a regex. Allows repeat matching on a single string.
 * TODO test this.
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
export const eliminateWhitespace = (str: string): string => str.replace(/ /g, '');


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
export function withLeftIndent(strings, leftPadSize, log?) {
    _validateWithLeftIndent(leftPadSize);

    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n.
    const lines: string[] = strings[1].split('\n');

    // |** 2 **| Remove 1st element if it's ''. This is the 'pre-initial-variable' string.
    if (lines[0].length === 0) lines.shift();

    // |** 3 **| Determine which line has the shortest indent.
    const shortestIndent = _detectShortestIndentInArray(lines, log);

    // |** 4 **| Create the indentation string to add & whitespace string to split on
    const leftPadSpaces = ' '.repeat(leftPadSize);
    const initialIndent = ' '.repeat(shortestIndent);

    // |** 5 **| Cut out the required number of spaces
    const linesPrepped = lines.map(
        (line: string) => line.replace(new RegExp(`^${initialIndent}`, 'm'), leftPadSpaces)
    );

    // |** 6 **| Convert array back to string & return.
    const retStr = linesPrepped.join(`\n`);
    log.verbose(`withLeftIndent: retStr:\n${retStr}`);

    return retStr;
}


/***************************************** LOCAL HELPERS ******************************************/
/**
 * Ensure left-size indent makes sense. It must be an integer, or string that
 * can parse to an integer.
 *
 * @param {number|string} leftPadSize - Content of required interpolated item
 *                                      placed directly after the start quote.
 *
 * @return {never|void} Throw if leftPadSize is invalid.
 */
function _validateWithLeftIndent(leftPadSize: number | string): never | void {
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
}

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
function _detectShortestIndentInArray(lines: string[] | string, log?): number {
    // Ensure input is an array.
    const lineArr = (Array.isArray(lines) ? lines : [lines]) as string[];

    const shortestIndent = lineArr.reduce((acc: number, line: string) => {
        // If any line found with no indent, prevent comparisons for the remainder of the loop.
        if (acc === 0) return acc;

        // Match on current line's indentation.
        const match = line.match(/^\s+/m);

        // If there's no match, there's no indent. Set to 0.
        if (!match || !match.input) return 0;

        // If indent length is shorter than the prior shortest, return as new shortest length.
        const currentShortestIndent = (match.input.length < acc) ? match.input.length : acc;
        log.silly(`_detectShortestIndentInArray: currentShortestIndent: ${currentShortestIndent}`);

        return currentShortestIndent;
    }, 120);

    log.verbose(`_detectShortestIndentInArray: shortestIndent:`, shortestIndent);
    return shortestIndent;
}


/*********************************** EXPORTS FROM OTHER MODULES ***********************************/
export { stringToEnumVal } from './enum';
export { splitLines } from './array';
