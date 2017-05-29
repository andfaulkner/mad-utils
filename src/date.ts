import moment from 'moment';
import { dateTime } from 'common-constants';
import { isDateLike, castToNum, NumLike, isInt, isNumberLike } from './types-iso';

export type NumRange1To7 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6';

export const defaultTimestampFormat = `YYYY/MM/DD : hh:mm:ss`;

/**
 * True if the given year is a leap year. Throw if given value cannot be cast to an integer.
 * @param {NumLike} year - Determine if the given number is a leap year.
 * @return {boolean|number} True if a leap year; false if not; throw if invalid year given.
 */
export function isLeapYear(year: NumLike): boolean | never {
    const yearClean = castToNum(year);
    if (!isInt(year) || yearClean instanceof Error) {
         throw new Error('mad-utils::isLeapYear must receive integer or value parsable to integer');
    }
    if (yearClean % 4 === 0 && ((yearClean % 400 === 0) || (yearClean % 100 !== 0))) return true;
    return false;
}

/**
 * Convert numeric day of the week to string day of the week.
 * Sunday is the 1st day (0 becomes 'Sunday', 1 becomes 'Tuesday', 6 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
export function convertDayOfWeekNumToString(day: NumRange1To7, doAbbreviate = false): string | never {
    const fnErrStr = `mad-utils :: convertDayOfWeekNumToString :: Invalid day of week given. Must` +
                     `be number from 0 to 6 (or 0-6 in string form e.g. '0'). Received: ${day}`;
    if (typeof day === 'undefined' || day == null) {
        throw new Error(fnErrStr)
    }
    switch(day.toString()) {
        case '0':  return doAbbreviate ? 'Sun'   : 'Sunday';
        case '1':  return doAbbreviate ? 'Mon'   : 'Monday';
        case '2':  return doAbbreviate ? 'Tues'  : 'Tuesday';
        case '3':  return doAbbreviate ? 'Wed'   : 'Wednesday';
        case '4':  return doAbbreviate ? 'Thurs' : 'Thursday';
        case '5':  return doAbbreviate ? 'Fri'   : 'Friday';
        case '6':  return doAbbreviate ? 'Sat'   : 'Saturday';
        default: throw new Error(fnErrStr);
    }
}

export type ParsedDate = {
    dateObj            : Date,
    date               : number,
    year               : number,
    month              : number,
    hour               : number,
    minute             : number,
    second             : number,
    millisecond        : number,
    ms                 : number,
    isLeapYear         : boolean,
    daysInYear         : number,
    dayOfWeekNum       : NumRange1To7,
    dayOfWeekName      : string,
    dayOfWeekShortName : string,
    timezoneOffset     : number,
    unixTimestampMs    : number,
}

/**
 * Split a date into a more convenient date info object
 */
export const parseDate = (date: Date): ParsedDate => {
    const year = date.getFullYear();
    const ms = date.getMilliseconds();
    const isLeap = isLeapYear(year);
    const dayOfWeek = date.getDay() as NumRange1To7;

    return {
        dateObj            : date,

        date               : date.getDate(),
        year               : year,
        month              : date.getMonth() + 1, // month is 1 less than you'd expect.

        hour               : date.getHours(),
        minute             : date.getMinutes(),
        second             : date.getSeconds(),
        millisecond        : ms,
        ms                 : ms,

        isLeapYear         : isLeap,
        daysInYear         : (isLeap ? 366 : 365),
        dayOfWeekNum       : dayOfWeek,
        dayOfWeekName      : convertDayOfWeekNumToString(dayOfWeek),
        dayOfWeekShortName : date.toString().split(' ')[0],

        timezoneOffset     : date.getTimezoneOffset() / dateTime.minutesPerHour,
        unixTimestampMs    : date.getTime(), // milliseconds since 01-01-1970
    };
};

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
export const now = (timeFormat: string = defaultTimestampFormat) => moment().format(timeFormat);

export { isDateLike } from './types-iso';
