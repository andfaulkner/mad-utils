/******************************************** IMPORTS *********************************************/
import 'reflect-metadata';

import * as moment from 'moment';
import { expect } from 'chai';
import * as envVarHelpers from 'env-var-helpers';


/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('misc-utils::index.ts', colors.green.bgWhite));


/************************************ CORE LANGUAGE UTILITIES *************************************/
const isArray = (value: any): boolean => {
    // Fully compliant ES5, ES6, ES7, ES8 ES[+] environments
    if (Array.isArray) {
        return Array.isArray(value);
    }
    // Browsers
    return !!((value)
           && value.constructor
           && (value.constructor.name === 'Array'
               // All ES5 and higher environments
               || (Object.getPrototypeOf && Object.getPrototypeOf(value.constructor) === Array)
               // Pre-ES5 web browsers
               || (value.constructor.__proto__ && value.constructor.__proto__.name === 'Array')));
}

/**
 * Safely get the given prop (via array of path props or 'access string') from the given object.
 *
 * @param {string[]|string} propPath - String in 'key1.key2.etc' form, or array of strings where
 *                                      each item is a key to traverse into:
 *                                      e.g.: ['key1', 'key2', 'etc'] refers to key1.key2.etc
 * @param {Object} obj - Object to get the value from using the given path.
 * @return {any} Value found at the given path.
 */
const get = <T extends Object>(propPath: string[] | string, obj: T): any | void => {
    const propPathClean: string[] = (typeof propPath === 'string')
                                        ? propPath.split('.')
                                        : propPath;
    return propPathClean
        .map((prop) => typeof prop === 'number' ? parseInt(prop, 10) : prop)
        .reduce((obj, propPathPart: string) => {
            if (!(obj && obj[propPathPart])) return null;
            if (obj[propPathPart].constructor.name === 'array')
            return (obj && obj[propPathPart]) ? obj[propPathPart] : null
        }, obj);
}


/******************************************** ARRAYS **********************************************/
/**
 * Return last item in an array.
 */
export const last = <T>(arr: T[]): T => (arr.length >= 1) ? arr[arr.length - 1] : void 0;

/**
 * Return second last item in an array.
 */
export const secondLast = <T>(arr: T[]): T => (arr.length >= 2) ? arr[arr.length - 2] : void 0;

/**
 * Return third last item in an array.
 */
export const thirdLast = <T>(arr: T[]): T => (arr.length >= 3) ? arr[arr.length - 3] : void 0;

/**
 * Return last 2 items in an array.
 */
export function last2 <T>(arr: T[]): T[] {
    return (arr.length >= 2) ? [arr[arr.length - 2], arr[arr.length - 1]] : void 0;
}

/**
 * Return last 3 items in an array.
 */
export function last3 <T>(arr: T[]): T[] {
    return (arr.length >= 3) ? [arr[arr.length - 3], arr[arr.length - 2], arr[arr.length - 1]]
                             : void 0;
}

/**
 * Return last N items in an array.
 */
export function lastN <T>(arr: T[], n: number): T[] {
    return (arr.length >= n)
        ? arrayN(n).map((__, idx) => arr[arr.length - n + idx])
        : arr;
}

/**
 * Return first N items in an array. Returned undefined if you request too many items.
 */
export function firstN <T>(arr: T[], n: number): T[] {
    return (arr.length >= n)
        ? arrayN(n).map((__, idx) => arr[idx])
        : arr;
}

/**
 * Create empty array of given length.
 * @param {number} len - Length of array to create.
 */
const arrayN = (len: number): any[] => Array.from(Array(len));

/********************************************* DATE ***********************************************/
/**
 * Get the current date, formatted for display in the stream of Express logs to the CLI.
 *
 * @param {string} timestampFormat - [OPTIONAL] momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
 *                                   See https://momentjs.com/docs/#/parsing/string-format/
 * @return {string} Current date and time, formatted for use in a timestamp
 *
 * @example Return current date + time as default-formatted timestamp:
 *              now(); // => 2017/02/28 : 12:53:57
 *
 * @example Return current date + time as timestamp without day or second:
 *              now(`YYYY/MM hh:mm`); // => 2017/02 12:53
 */
export const now = (timestampFormat: string = `YYYY/MM/DD : hh:mm:ss`) => {
    return moment().format(timestampFormat);
};

/***************************************** TEST FUNCTIONS *****************************************/
/**
 * Expect that testValue is an empty object.
 */
const expectEmptyObject = (testValue: any) => {
    expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    expect(testValue).to.be.an('object');
    expect(testValue).to.not.be.null;
    expect(testValue).to.not.be.undefined;
};

/******************************************** BROWSER *********************************************/
/**
 * If given a "store" object, try to get item at given key from it. Next try to get it from browser
 * localStorage or sessionStorage. Finally, try key in 'this' binding. Return null if all fail.
 */
const getFromStorage = (key: string, store?: Object): string | null => {
    // Use value from store param, if it was provided.
    if (store && store[key]) {
        return store[key];
    }

    // Try to grab value off the window storage objects
    try {
        if (window && window.sessionStorage && window.localStorage) {
            return window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
        }
    } catch(e) {
        log.error('getFromStorage: not in a browser environment, cannot use window object');
    }

    // Try to grab the value from 'this' binding.
    if (this && this[key]) {
        return this[key];
    }
};

/***************************************** DATA UTILITIES *****************************************/
/**
 * Return true if argument is a multilanguage string object
 */
export const isMultilangTextObj = (val: any): boolean => {
    return !!(
        typeof val === 'object' &&
        Object.keys(val).length > 1 &&
        Object.keys(val).find(matches('en')) &&
        Object.keys(val).some(isNonexistentOrString) &&
        isNonexistentOrString(val.en)
    );
};

/**
 * Inversion of String.prototype.match, for usage as a predicate.
 */
const matches = (matchAgainst: string) => (val: string): boolean => !!val.match(matchAgainst);

/**
 *  Returns true if the value is null, undefined, or a string.
 */
const isNonexistentOrString = (val: any) => {
    return (val === null) || (typeof val === 'undefined') || (typeof val === 'string');
};

/******************************************* DECORATORS *******************************************/
/**
 * Method decorator. Marks method as not being usable in a web environment. Emits a warning if
 * method is called.
 * Automatically adds it into a Reflect.defineMetadata compartment marking web-unfriendly methods
 * on the class, when containing class is instantiated.
 */
export function notForWebUse(alternative?: string, envUsage = 'native mobile client or Java server') {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('nonWebMethods', `${target.name} :: ${propertyKey}`, target,
                               '${target.name}_${propertyKey}');

        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.warn(
                `Method ${propertyKey} on class ${target.constructor.name} cannot be used in a ` +
                `Javascript/Typescript environment - it is for ${envUsage} usage only. ` +
                (alternative ? ('Use ' + alternative + ' instead.') : '')
            );
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }
};


/******************************************** STRINGS *********************************************/
/**
 * Capitalize a string.
 * @param {string} str - String to capitalize.
 * @return {string} Capitalized string.
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}


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

    const logVerbose = getLogAtLevel(log, 'verbose');

    // |** 1 **| Convert single string with '\n' delimiting lines to an array split on \n.
    const lines: string[] = strings[1].split('\n');

    // |** 2 **| Remove 1st element if it's ''. This is the 'pre-initial-variable' string.
    if (lines[0].length === 0) lines.shift();

    // |** 3 **| Determine which line has the shortest indent.
    const shortestIndent = detectShortestIndentInArray(lines, log);

    // |** 4 **| Create the indentation string to add & whitespace string to split on
    const leftPadSpaces = ' '.repeat(leftPadSize);
    const initialIndent = ' '.repeat(shortestIndent);

    // |** 5 **| Cut out the required number of spaces
    const linesPrepped = lines.map(
        (line: string) => line.replace(new RegExp(`^${initialIndent}`, 'm'), leftPadSpaces)
    );

    // |** 6 **| Convert array back to string & return.
    const retStr = linesPrepped.join(`\n`);
    logVerbose(`withLeftIndent: retStr:\n${retStr}`);
    console.log('retStr as standalone:', retStr);
    console.log('typeof retStr:', typeof retStr);
    console.log(`isArray(retStr):`, isArray(retStr));

    return retStr;
}

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
export function detectShortestIndentInArray(lines: string[] | string, log?): number {
    const logSilly = getLogAtLevel(log, 'silly');
    const logVerbose = getLogAtLevel(log, 'verbose');

    // Ensure input is an array.
    const lineArr = (isArray(lines) ? lines : [lines]) as string[];

    const shortestIndent = lineArr.reduce((acc: number, line: string) => {
        // If any line found with no indent, prevent comparisons for the remainder of the loop.
        if (acc === 0) return acc;

        // Match on current line's indentation.
        const match = line.match(/^\s+/m);

        // If there's no match, there's no indent. Set to 0.
        if (!match || !match.input) return 0;

        // If indent length is shorter than the prior shortest, return as new shortest length.
        const currentShortestIndent = (match.input.length < acc) ? match.input.length : acc;
        logSilly(`detectShortestIndentInArray :: currentShortestIndent: ${currentShortestIndent}`);

        return currentShortestIndent;
    }, 120);

    logVerbose(`detectShortestIndentInArray: shortestIndent:`, shortestIndent);
    return shortestIndent;
}

type ErrorLevels = 'silly' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'wtf';

/**
 * Determine if there is a log object present containing the given log level as a method. If not,
 * check the current LOG_LEVEL with a helper (from env-var-helpers), and console.log if at the
 * right level or higher.
 */
function getLogAtLevel(log, level: ErrorLevels) {
    return ((log && log[level])
        ? log[level]
        : ((envVarHelpers[`is${capitalize(level)}`])
            ? console.log
            : (...args: any[]) => null));
}



//**************************************************************************************************
//
// NODE-ONLY HELPERS / UTILS
//
//

/******************************************* FILESYSTEM *******************************************/
import * as path from 'path';
import { ensureDirSync, copySync, readdirSync, readSync, lstatSync, readFileSync, writeFileSync } from 'fs-extra-promise';

/**
 * @param {string} fileOrDirPath - file system object being checked.
 * @return {boolean} true if given file system object is a directory (if false it's a file)
 */
export function isDir(fileOrDirPath: string): boolean {
    return lstatSync(fileOrDirPath).isDirectory();
};

/**
 * Replace matching location in given file.
 */
export function replaceInFile(filePath: string, findString: string, replace: string): string;
export function replaceInFile(filePath: string, findRegex: RegExp, replace: string): string;
export function replaceInFile(filePath: string, find: string | RegExp, replace: string): string {
    const fileData   = readFileSync(filePath).toString();
    // Hack required to make typings happy
    const cleanfileData = (typeof find === 'string') ? fileData.replace(find, replace)
                                                     : fileData.replace(find, replace);
    writeFileSync(filePath, cleanfileData, 'utf8');
    log.silly(`cleanjSweetBundleData: new ${filePath} contents:`, cleanfileData);
    return cleanfileData;
}
