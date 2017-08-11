"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var types_iso_1 = require("./types-iso");
exports.defaultTimestampFormat = "YYYY/MM/DD : HH:mm:ss";
/**
 * True if the given year is a leap year. Throw if given value cannot be cast to an integer.
 * @param {NumLike} year - Determine if the given number is a leap year.
 * @return {boolean|number} True if a leap year; false if not; throw if invalid year given.
 */
function isLeapYear(year) {
    var yearClean = types_iso_1.castToNum(year);
    if (!types_iso_1.isInt(yearClean) || yearClean instanceof Error) {
        throw new Error('mad-utils::isLeapYear must receive integer or value parsable to integer');
    }
    if (yearClean % 4 === 0 && ((yearClean % 400 === 0) || (yearClean % 100 !== 0)))
        return true;
    return false;
}
exports.isLeapYear = isLeapYear;
/**
 * Convert numeric day of the week to string day of the week.
 * Sunday is the 1st day (0 becomes 'Sunday', 1 becomes 'Monday', 6 becomes 'Saturday')
 * Given day must be a number between 0 and 6.
 * @param {NumRange0To6} day - Number from 0 to 6
 * @param {boolean} abbreviate - If true, return the shorthand day names (e.g. 'Mon' vs. 'Monday')
 * @return {string} given day of the week in string form. Throws if invalid input given.
 */
exports.convertDayOfWeekNumToString = function (day, abbreviate) {
    if (abbreviate === void 0) { abbreviate = false; }
    var fnErrStr = "mad-utils :: convertDayOfWeekNumToString :: Invalid day of week given. Must" +
        ("be number from 0 to 6 (or 0-6 in string form e.g. '0'). Received: " + day);
    if (typeof day === 'undefined' || day == null) {
        throw new Error(fnErrStr);
    }
    switch (day.toString()) {
        case '0': return abbreviate ? 'Sun' : 'Sunday';
        case '1': return abbreviate ? 'Mon' : 'Monday';
        case '2': return abbreviate ? 'Tues' : 'Tuesday';
        case '3': return abbreviate ? 'Wed' : 'Wednesday';
        case '4': return abbreviate ? 'Thurs' : 'Thursday';
        case '5': return abbreviate ? 'Fri' : 'Friday';
        case '6': return abbreviate ? 'Sat' : 'Saturday';
        default: throw new Error(fnErrStr);
    }
};
/**
 * Get the current date, formatted for display in the stream of Express logs to the CLI.
 *
 * @param {string} timeFormat - [OPTIONAL] momentJS timestamp format e.g. `MM/DD::hh:mm:ss`
 *                                   See https://momentjs.com/docs/#/parsing/string-format/
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
var types_iso_2 = require("./types-iso");
exports.isDateLike = types_iso_2.isDateLike;
//# sourceMappingURL=date.js.map