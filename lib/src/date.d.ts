import { NumLike } from './types-iso';
export declare type NumRange1To7 = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare const defaultTimestampFormat: string;
/**
 * True if the given year is a leap year. Throw if given value cannot be cast to an integer.
 * @param {NumLike} year - Determine if the given number is a leap year.
 * @return {boolean|number} True if a leap year; false if not; throw if invalid year given.
 */
export declare function isLeapYear(year: NumLike): boolean | never;
/**
 * Convert numeric day of the week to string day of the week.
 * Monday is the 1st day (1 becomes 'Monday', 2 becomes 'Tuesday', 7 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
export declare function convertDayOfWeekNumToString(day: NumRange1To7): string | never;
export declare type ParsedDate = {
    dateObj: Date;
    date: number;
    year: number;
    month: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
    ms: number;
    isLeapYear: boolean;
    daysInYear: number;
    dayOfWeekNum: NumRange1To7;
    dayOfWeekName: string;
    dayOfWeekShortName: string;
    timezoneOffset: number;
    unixTimestampMs: number;
};
/**
 * Split a date into a more convenient date info object
 */
export declare const parseDate: (date: Date) => ParsedDate;
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
