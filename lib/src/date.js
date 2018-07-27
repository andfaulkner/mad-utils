"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var types_iso_1 = require("./types-iso");
exports.defaultTimestampFormat = "YYYY/MM/DD : HH:mm:ss";
/**
 * True if the given year is a leap year
 * Throw if given value cannot be cast to an integer
 *
 * @param {NumLike} year Determine if the given number is a leap year
 * @return {boolean|number} True if a leap year; false if not; throw if invalid year given
 */
function isLeapYear(year) {
    var yearClean = types_iso_1.castToNum(year);
    if (yearClean instanceof Error || !types_iso_1.isInt(yearClean)) {
        throw new Error('mad-utils::isLeapYear must receive integer or value parsable to integer');
    }
    if (yearClean % 4 === 0 && (yearClean % 400 === 0 || yearClean % 100 !== 0))
        return true;
    return false;
}
exports.isLeapYear = isLeapYear;
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
exports.convertDayOfWeekNumToString = function (day, abbreviate) {
    if (abbreviate === void 0) { abbreviate = false; }
    var fnErrStr = "mad-utils :: convertDayOfWeekNumToString :: Invalid day of week given. Must" +
        ("be number from 0 to 6 (or 0-6 in string form e.g. '0'). Received: " + day);
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
exports.now = function (timeFormat) {
    if (timeFormat === void 0) { timeFormat = exports.defaultTimestampFormat; }
    return moment().format(timeFormat);
};
/********************************************* CONFIG *********************************************/
// Date part regexes
var dateRegex = /(^[0-9]$)|(^[0-2][0-9]$)|(^3[01]$)/gi;
var yearRegex = /[0-9]{4}/gi;
// Add all types of month matches
var allMonthStrs = function (momentLib, locale) {
    return momentLib
        .localeData(locale)
        .monthsShort()
        .map(function (mn) { return mn.replace(/\.$/gi, ''); }) // Remove dots from end
        .concat(momentLib.localeData(locale).months())
        .map(function (mn) { return mn.toLowerCase(); });
}; // Make all lowercase
/**
 * Performs fallback behaviour for dateStringWithMonthTextToMoment
 * See dateStringWithMonthTextToMoment for more info
 */
var _dateStringWithMonthTextToMomentFallback = function (date, dateParts, locale, fallbackFormat) {
    if (fallbackFormat === void 0) { fallbackFormat = true; }
    // If no fallbackFormat string given & it's not set to false, & the date matches ISO format
    if (fallbackFormat === true &&
        dateParts.length === 3 &&
        (dateParts[0].length === 4 && !isNaN(dateParts[0])) &&
        (dateParts[1].length === 2 && !isNaN(dateParts[1])) &&
        (dateParts[2].length === 2 && !isNaN(dateParts[2]))) {
        var retVal = moment(date, undefined, locale);
        return (retVal.isValid && retVal.isValid()) ? retVal : null;
    }
    // If fallbackFormat string given
    if (typeof fallbackFormat === 'string') {
        var retVal = moment(date, fallbackFormat, locale);
        return (retVal.isValid && retVal.isValid()) ? retVal : null;
    }
    return null;
};
/**
 ************************ WARNING: SOMEWHAT EXPERIMENTAL ***********************
 ************************ CONSIDER THIS FUNCTION 'ALPHA' ***********************
 *
 * Convert [date] strings containing month text to moment
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
exports.dateStringWithMonthTextToMoment = function (date, opts) {
    if (opts === void 0) { opts = {}; }
    var locale = opts.locale;
    var fallbackFormat = opts.fallbackFormat || true;
    var lc = locale || moment.locale();
    // Handle empty strings & null
    if (!date)
        return null;
    // Split string into date, month, year substrings, removing "." if found in month
    var dateParts = date.match(/(\b[^\d\s\-\\/.,:;~+]+)|([0-9]+)/gi).map(function (pt) { return pt.toLowerCase(); });
    // If there's no month string in the output, use the fallback behaviour
    if (!dateParts || dateParts.length !== 3 || !dateParts.some(function (pt) { return isNaN(pt); })) {
        return _dateStringWithMonthTextToMomentFallback(date, dateParts, lc, fallbackFormat);
    }
    /*********** Month ***********/
    var monthStrs = allMonthStrs(moment, lc);
    var monthDatePtsIdx = dateParts.findIndex(function (pt) { return monthStrs.some(function (moStr) { return pt.includes(moStr); }); }); //monthRegex.test(pt));
    var monthStr = monthDatePtsIdx !== -1 ? dateParts.splice(monthDatePtsIdx, 1)[0] : null;
    var monthMatchNum = monthStrs.findIndex(function (curMonth) { return curMonth === monthStr; });
    // Get the numeric month position, from 1-12
    var month = monthMatchNum !== -1 ? (monthMatchNum % 12) + 1 : null;
    /*********** Year ***********/
    var yearDatePtsIdx = dateParts.findIndex(function (pt) { return !!pt.match(yearRegex); });
    var yearStr = yearDatePtsIdx !== -1 ? dateParts.splice(yearDatePtsIdx, 1)[0] : null;
    var year = parseInt(yearStr);
    /*********** Date (of month) ***********/
    var dateDatePtsIdx = dateParts.findIndex(function (pt) { return !!pt.match(dateRegex); });
    var dateStr = dateDatePtsIdx !== -1 ? dateParts.splice(dateDatePtsIdx, 1)[0] : null;
    var dateOfMonth = parseInt(dateStr);
    // If no match found for month, year, or date, this was a bad date string, so return null
    if (!month || !year || !dateOfMonth) {
        console.warn("[mad-utils] dateStringWithMonthTextToMoment: INVALID DATE STRING GIVEN: " + date);
        return null;
    }
    // Build final output object
    var finalOutput = moment({ date: dateOfMonth, month: month - 1, year: year }, undefined, lc);
    return finalOutput;
};
//# sourceMappingURL=date.js.map