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
//# sourceMappingURL=react.js.map