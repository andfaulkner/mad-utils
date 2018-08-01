/******************************************** IMPORTS *********************************************/
import { RealAny } from './types-iso';
import { newlineStr } from './string';
import { isVerbose } from 'env-var-helpers';

const fn = `mad-utils::enum --`;

/******************************************** EXPORTS *********************************************/
/**
 * Stringify, while keeping the functions in position by pre-converting them to strings.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified form of JSON.stringify with functions kept around.
 */
export const jsonStringifyWFuncs = (obj: Object): string =>
    JSON.stringify(obj, (key: string, value: RealAny) =>
        typeof value === 'function' ? value.toString() : value);

/**
 * Initial common set of cleaning tasks for prepping stringified functions of any type (lambda
 * arrow functions vs classic function declarations or assignments) for use in new Function.
 * @param {string} valStr - Stringified function, to perform clean on.
 * @return {string} partially cleaned function string.
 */
const _baseCleanFuncStrForNewFunc =
    (valStr: string): string => valStr.replace(/\}$/, '}').replace(/\'/g, '"')
                                      .replace(/\n/g, newlineStr);

/**
 * Extract arguments from a function converted to a string (i.e. from the
 * function source code text).
 * @param {Function} valStr - Stringified function.
 * @return {string[]} Arguments pulled from the stringified function
 */
const _extractArgsFromFuncStr =
    (valStr: string): string[] => valStr.match(/^[^\(]*\([^\)]*\)/)[0]
                                        .replace(/^[^\(]*\(/, '')
                                        .replace(/\)/g, '')
                                        .split(/,\s*/);
