import { NumLike } from './types-iso';
export declare type NumRange1To7 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6';
export declare const defaultTimestampFormat: string;
/**
 * True if the given year is a leap year. Throw if given value cannot be cast to an integer.
 * @param {NumLike} year - Determine if the given number is a leap year.
 * @return {boolean|number} True if a leap year; false if not; throw if invalid year given.
 */
export declare function isLeapYear(year: NumLike): boolean | never;
/**
 * Convert numeric day of the week to string day of the week.
 * Sunday is the 1st day (0 becomes 'Sunday', 1 becomes 'Tuesday', 6 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
export declare function convertDayOfWeekNumToString(day: NumRange1To7, doAbbreviate?: boolean): string | never;
/**
 * Get the current date, formatted for display in the stream of Express logs to the CLI.
 *
 * @param {string} timeFormat - [OPTIONAL] momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
 *                                   See https://momentjs.com/docs/#/parsing/string-format/
 * @return {string} Current date and time, formatted for use in a timestamp
 *
 * @example Return current date + time as default-formatted timestamp:
 *              now(); // => 2017/02/28 : 12:53:57
 *
 * @example Return current date + time as timestamp without day or second:
 *              now(`YYYY/MM hh:mm`); // => 2017/02 12:53
 */
export declare const now: (timeFormat?: string) => string;
export { isDateLike } from './types-iso';
