"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src/react/hocs"));
__export(require("./src/react/components"));
/**
 * Log the value of a React Synthetic event's target component/element.
 * @param {string} callerName Name of function/method calling logSyntheticEvent.
 * @param {Function} logFn Function to use to perform the logging. Must accept at least 2 params.
 * @param {SyntheticEvent|any} event Event to log.
 */
exports.logSyntheticEventValue = function (callerName, logFn) {
    if (logFn === void 0) { logFn = console.log; }
    return function (event) {
        logFn(callerName + " :: event:", event);
        // Handle cases where event is not an object or function.
        if (typeof event === 'undefined' || event === null || (typeof event !== 'object' && typeof event !== 'function')) {
            return logFn(callerName + " :: event must be an object w key target. typeof event:", typeof event);
        }
        logFn(callerName + " :: event.target:", event.target);
        // Handle cases where event does not have key 'target'.
        if (!(event.target && (typeof event.target === 'object' || typeof event.target === 'function'))) {
            logFn(callerName + " :: value not present in event.target");
            // Handle cases where event *does* have key 'target' (happy path!).
        }
        else {
            logFn(callerName + " :: event.target['value']:", event.target['value']);
        }
    };
};
/********************************* EXPORT ALL FROM BROWSER UTILS **********************************/
__export(require("./browser"));
// Imported to appease exports below.
var browserUtils = require("./browser");
exports.browserUtils = browserUtils;
// Export the most commonly used functions in the browser (all exports not working for some reason).
exports.first = browserUtils.first, exports.last = browserUtils.last, exports.first2 = browserUtils.first2, exports.last2 = browserUtils.last2, exports.without = browserUtils.without, exports.withoutFirst = browserUtils.withoutFirst, exports.withoutLast = browserUtils.withoutLast, exports.withoutFirst2 = browserUtils.withoutFirst2, exports.withoutLast2 = browserUtils.withoutLast2, exports.rmAllFalsy = browserUtils.rmAllFalsy, exports.centerPad = browserUtils.centerPad, exports.leftPad = browserUtils.leftPad, exports.rightPad = browserUtils.rightPad, exports.eliminateWhitespace = browserUtils.eliminateWhitespace, exports.chomp = browserUtils.chomp, exports.getLangFromUrlPathname = browserUtils.getLangFromUrlPathname, exports.parseQueryParams = browserUtils.parseQueryParams, exports.parseUserAgent = browserUtils.parseUserAgent, exports.deepFreeze = browserUtils.deepFreeze, exports.assignFrozenClone = browserUtils.assignFrozenClone, exports.merge = browserUtils.merge, exports.isArray = browserUtils.isArray, exports.isBoolean = browserUtils.isBoolean, exports.isTrue = browserUtils.isTrue, exports.isFalse = browserUtils.isFalse, exports.isInteger = browserUtils.isInteger, exports.isIntegerLike = browserUtils.isIntegerLike, exports.isNumberLike = browserUtils.isNumberLike, exports.isStringOrNumber = browserUtils.isStringOrNumber, exports.isDateLike = browserUtils.isDateLike, exports.isMultilangTextObj = browserUtils.isMultilangTextObj, exports.isNonexistentOrString = browserUtils.isNonexistentOrString, exports.isDataEnumItem = browserUtils.isDataEnumItem, exports.isIndexEnumItem = browserUtils.isIndexEnumItem, exports.isNumericEnumItem = browserUtils.isNumericEnumItem, exports.castToNum = browserUtils.castToNum, exports.getFromStorage = browserUtils.getFromStorage, exports.uuid = browserUtils.uuid, exports.eachPair = browserUtils.eachPair, exports.replaceAll = browserUtils.replaceAll, exports.toSnakeCase = browserUtils.toSnakeCase, exports.toCamelCase = browserUtils.toCamelCase, exports.capitalize = browserUtils.capitalize, exports.cap1LowerRest = browserUtils.cap1LowerRest, exports.repeatChars = browserUtils.repeatChars, exports.condSwitch = browserUtils.condSwitch, exports.singleton = browserUtils.singleton, exports.isLeapYear = browserUtils.isLeapYear, exports.now = browserUtils.now, exports.hasKey = browserUtils.hasKey, exports.append = browserUtils.append;
exports.genLen6UUID = exports.uuid.len6;
exports.genLen8UUID = exports.uuid.len8;
//# sourceMappingURL=react.js.map