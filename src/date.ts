import * as moment from 'moment';
import {dateTime} from 'common-constants';
import {rmFalsyVals} from './array';
import {isDateLike, StrOrNum, isInt, isNumberLike, StrOrNever} from './types-iso';

export type NumRange0To6 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6';

export const defaultTimestampFormat = `YYYY/MM/DD : HH:mm:ss`;

/**
 * True if the given year is a leap year
 * Throw if given value cannot be cast to an integer
 *
 * @param {NumLike} year Determine if the given number is a leap year
 * @return {boolean|number} True if a leap year; false if not; throw if invalid year given
 */
export function isLeapYear(year: StrOrNum): boolean | never {
    const yearClean = typeof year === 'string' ? parseInt(year) : year;
    if (yearClean instanceof Error || !isInt(yearClean) || isNaN(yearClean)) {
        throw new Error(`mad-utils::isLeapYear must receive integer or value parsable to integer`);
    }
    if (yearClean % 4 === 0 && (yearClean % 400 === 0 || yearClean % 100 !== 0)) return true;
    return false;
}

/**
 * WARNING: Only works for English
 *
 * Convert numeric day of the week to string day of the week
 * Sunday is the 1st day (0 becomes 'Sunday', 1 becomes 'Monday', 6 becomes 'Saturday')
 * Given day must be a number between 0 and 6
 *
 * @param {NumRange0To6} day Number from 0 to 6
 * @param {boolean} abbreviate If true, return the shorthand day names (e.g. 'Mon' vs 'Monday')
 * @return {string} given day of the week in string form - Throws if invalid input given
 */
export const convertDayOfWeekNumToString = (day: NumRange0To6, abbreviate = false): StrOrNever => {
    const fnErrStr =
        `mad-utils :: convertDayOfWeekNumToString :: Invalid day of week given. Must` +
        `be number from 0 to 6 (or 0-6 in string form e.g. '0'). Received: ${day}`;
    if (typeof day === 'undefined' || day == null) {
        throw new Error(fnErrStr);
    }
    switch (day.toString()) {
        case '0':
            return abbreviate ? 'Sun' : 'Sunday';
        case '1':
            return abbreviate ? 'Mon' : 'Monday';
        case '2':
            return abbreviate ? 'Tues' : 'Tuesday';
        case '3':
            return abbreviate ? 'Wed' : 'Wednesday';
        case '4':
            return abbreviate ? 'Thurs' : 'Thursday';
        case '5':
            return abbreviate ? 'Fri' : 'Friday';
        case '6':
            return abbreviate ? 'Sat' : 'Saturday';
        default:
            throw new Error(fnErrStr);
    }
};

/**
 * Get the current date, formatted for display in the stream of Express logs to the CLI
 *
 * @param {string} timeFormat [OPTIONAL] momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
 *                            See https://momentjs.com/docs/#/parsing/string-format/
 * @return {string} Current date and time, formatted for use in a timestamp
 *
 * @example Return current date + time as default-formatted timestamp:
                now(); // => 2017/05/28 : 02:51:39
 *
 * @example Return current date + time as timestamp without day or second:
 *              now(`YYYY/MM hh:mm`); // => 2017/02 12:53
 */
export const now = (timeFormat: string = defaultTimestampFormat): string =>
    moment().format(timeFormat);

/********************************************* CONFIG *********************************************/
// Date part regexes
const dateRegex = /(^[0-9]$)|(^[0-2][0-9]$)|(^3[01]$)/gi;
const yearRegex = /[0-9]{4}/gi;

// Add all types of month matches
const allMonthStrs = (momentLib: typeof moment, locale: string) =>
    momentLib
        .localeData(locale)
        .monthsShort()
        .map(mn => mn.replace(/\.$/gi, '')) // Remove dots from end
        .concat(momentLib.localeData(locale).months())
        .map(mn => mn.toLowerCase()); // Make all lowercase

/********************************* CONVERSION TO moment.js OBJECT *********************************/
/**
 * If dateStringWithMonthTextToMoment gets invalid [date] string, log warning & return null
 */
const _invalidDateStringHandler = (date: string) => {
    console.warn(`[mad-utils] dateStringWithMonthTextToMoment: INVALID DATE STRING GIVEN: ${date}`);
    return null;
};

/**
 * Performs fallback behaviour for dateStringWithMonthTextToMoment
 * See dateStringWithMonthTextToMoment for more info
 */
const _dateStringWithMonthTextToMomentFallback = (
    date: string,
    dateParts?: string[],
    locale?: string,
    fallbackFormat: string | boolean = true
) => {
    if (dateParts.length !== 3) {
        if (typeof fallbackFormat === 'string') {
            const retVal = moment(date, fallbackFormat, locale);
            if (retVal.isValid && retVal.isValid()) return retVal;
        }
        return _invalidDateStringHandler(date);
    }

    // Create month & date strings that can handle single digit inputs
    const month = (dateParts[1].length === 1) ? `0${dateParts[1]}` : dateParts[1];
    const dateOfMonth = (dateParts[2].length === 1) ? `0${dateParts[2]}` : dateParts[2];


    // If no fallbackFormat string given & it's not set to false, & the date matches ISO format
    if (
        fallbackFormat === true &&
        dateParts.length === 3 &&
        (dateParts[0].length === 4 && !isNaN(dateParts[0] as any)) &&
        (month.length === 2 && !isNaN(month as any)) &&
        (dateOfMonth.length === 2 && !isNaN(dateOfMonth as any))
    ) {
        const retVal = moment(date, undefined, locale);
        if (retVal.isValid && retVal.isValid()) return retVal;
    }

    // If fallbackFormat string given
    else if (typeof fallbackFormat === 'string') {
        const retVal = moment(date, fallbackFormat, locale);
        if (retVal.isValid && retVal.isValid()) return retVal;
    }

    console.warn(`[mad-utils] dateStringWithMonthTextToMoment: INVALID DATE STRING GIVEN: ${date}`);
    return null;
};

/**
 ************************ WARNING: SOMEWHAT EXPERIMENTAL ***********************
 ************************ CONSIDER THIS FUNCTION 'ALPHA' ***********************
 *
 * Convert [date] strings containing month text to moment
 * Returns moment objects as-is
 * Assumes strings only contain 4-digit year
 *
 * Uses currently set locale in moment unless a new [locale] string is provided
 *
 * If no month found:
 * - If [opts.fallbackFormat] is given, it tries to use it to format the string
 * - If no [opts.fallbackFormat] given, it tries to parse string in ISO format
 * - If false is given as [opts.fallbackFormat], it returns null
 *
 * Example strings this can handle:
 *     25 juil 2018
 *     25 juil. 2018
 *     25 juillet 1980
 *     25 février 2018
 *     25 Février 2018
 *     25 june 2018
 *     25 June 2018
 *     25 October 2018
 *     25 oct 2018
 *     25 oct. 2018
 *     June 30, 2018
 *     Février 25, 2018
 *     2018 January 13
 *     2018, 31 Dec
 *     2018-10-15
 *     15-10-2018  <- if opts.fallbackFormat = 'DD-MM-YYYY'
 */
export const dateStringWithMonthTextToMoment = (
    date: string | moment.Moment,
    opts: {locale?: string; fallbackFormat?: string | boolean} = {}
) => {
    // Return date as-is if it's already a moment date
    if (moment.isMoment(date)) return date;

    // Handle empty strings & null (return null, with a warning)
    if (!date) return _invalidDateStringHandler(date);

    // Extract default props
    const {locale} = opts;
    const fallbackFormat = opts.fallbackFormat || true;
    const lc = locale || moment.locale();

    // Split string into date, month, year substrings, removing "." if found in month
    const dateParts = date.match(/(\b[^\d\s\-\\/.,:;~+]+)|([0-9]+)/gi).map(pt => pt.toLowerCase());

    // If there's no month string in the output, use the fallback behaviour
    if (!dateParts || dateParts.length !== 3 || !dateParts.some(pt => isNaN(pt as any))) {
        return _dateStringWithMonthTextToMomentFallback(date, dateParts, lc, fallbackFormat);
    }

    /*********** Month ***********/
    const monthStrs = allMonthStrs(moment, lc);
    const monthDatePtsIdx = dateParts.findIndex(pt => monthStrs.some(moStr => pt.includes(moStr)));
    const monthStr = monthDatePtsIdx !== -1 ? dateParts.splice(monthDatePtsIdx, 1)[0] : null;
    const monthMatchNum = monthStrs.findIndex(curMonth => curMonth === monthStr);
    // Get the numeric month position, from 1-12
    const month = monthMatchNum !== -1 ? (monthMatchNum % 12) + 1 : null;

    /*********** Year ***********/
    const yearDatePtsIdx = dateParts.findIndex(pt => !!pt.match(yearRegex));
    const yearStr = yearDatePtsIdx !== -1 ? dateParts.splice(yearDatePtsIdx, 1)[0] : null;
    const year = parseInt(yearStr);

    /*********** Date (of month) ***********/
    const dateDatePtsIdx = dateParts.findIndex(pt => !!pt.match(dateRegex));
    const dateStr = dateDatePtsIdx !== -1 ? dateParts.splice(dateDatePtsIdx, 1)[0] : null;
    const dateOfMonth = parseInt(dateStr);

    // If no match found for month, year, or date, this was a bad date string, so return null
    if (!month || !year || !dateOfMonth) {
        return _invalidDateStringHandler(date);
    }

    // Build & return final output moment object
    const retVal = moment({date: dateOfMonth, month: month - 1, year}, undefined, lc);
    if (retVal && retVal.isValid && retVal.isValid()) {
        return retVal;
    }

    // If invalid moment date produced, return null
    else {
        return _invalidDateStringHandler(date);
    }
};
