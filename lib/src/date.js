"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var common_constants_1 = require("common-constants");
/**
 * True if the given year is a leap year.
 */
function isLeapYear(year) {
    if (year % 4 === 0 && year % 100 !== 0)
        return true;
    if (year % 400 === 0)
        return true;
    return false;
}
exports.isLeapYear = isLeapYear;
/**
 * Convert numeric day of the week to string day of the week.
 * Monday is the 1st day (1 becomes 'Monday', 2 becomes 'Tuesday', 7 becomes 'Sunday')
 * Given day must be a number between 1 and 7.
 */
function convertDayOfWeekNumToString(day) {
    switch (day.toString()) {
        case '0': return 'Sunday';
        case '1': return 'Monday';
        case '2': return 'Tuesday';
        case '3': return 'Wednesday';
        case '4': return 'Thursday';
        case '5': return 'Friday';
        case '6': return 'Saturday';
        default: {
            throw new Error("INVALID DAY OF WEEK: MUST BE NUMBER FROM 0 TO 6. Input day: " + day);
        }
    }
}
exports.convertDayOfWeekNumToString = convertDayOfWeekNumToString;
/**
 * Split a date into a more convenient date info object
 */
exports.parseDate = function (date) {
    var year = date.getFullYear();
    var ms = date.getMilliseconds();
    var isLeap = isLeapYear(year);
    var dayOfWeek = date.getDay();
    return {
        dateObj: date,
        date: date.getDate(),
        year: year,
        month: date.getMonth() + 1,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: ms,
        ms: ms,
        isLeapYear: isLeap,
        daysInYear: (isLeap ? 366 : 365),
        dayOfWeekNum: dayOfWeek,
        dayOfWeekName: convertDayOfWeekNumToString(dayOfWeek),
        dayOfWeekShortName: date.toString().split(' ')[0],
        timezoneOffset: date.getTimezoneOffset() / common_constants_1.dateTime.minutesPerHour,
        unixTimestampMs: date.getTime(),
    };
};
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
exports.now = function (timestampFormat) {
    if (timestampFormat === void 0) { timestampFormat = "YYYY/MM/DD : hh:mm:ss"; }
    return moment_1.default().format(timestampFormat);
};
//# sourceMappingURL=date.js.map