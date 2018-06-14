/******************************** EXPORT ALL FROM REACT SRC FILES *********************************/
export * from './src/react/types-react';
export * from './src/react/hocs';
export * from './src/react/components';

type FuncW2OrMoreArgs = (arg1: any, ...args: any[]) => (any | void);

/**
 * Log the value of a React Synthetic event's target component/element.
 * @param {string} callerName Name of function/method calling logSyntheticEvent.
 * @param {Function} logFn Function to use to perform the logging. Must accept at least 2 params.
 * @param {SyntheticEvent|any} event Event to log.
 */
export const logSyntheticEventValue = (callerName: string, logFn: FuncW2OrMoreArgs = console.log) => (event): void => {
    logFn(`${callerName} :: event:`, event)

    // Handle cases where event is not an object or function.
    if (typeof event === 'undefined' || event === null || (typeof event !== 'object' && typeof event !== 'function')) {
        return logFn(`${callerName} :: event must be an object w key target. typeof event:`, typeof event);
    }

    logFn(`${callerName} :: event.target:`, event.target)

    // Handle cases where event does not have key 'target'.
    if (!(event.target && (typeof event.target === 'object' || typeof event.target === 'function'))) {
        logFn(`${callerName} :: value not present in event.target`);

    // Handle cases where event *does* have key 'target' (happy path!).
    } else {
        logFn(`${callerName} :: event.target['value']:`, event.target['value']);
    }
};


/********************************* EXPORT ALL FROM BROWSER UTILS **********************************/
export * from './browser';

// Imported to appease exports below.
import * as browserUtils from './browser';
import * as arrayUtils from './src/array';
import * as objUtils from './src/object';
import * as urlUtils from './src/url';
import * as domUtils from './src/browser/dom';
import * as localStoreUtils from './src/browser/local-store';
import * as numberUtils from './src/number';
import * as functionUtils from './src/function';
import * as dateUtils from './src/date';
import * as decoratorUtils from './src/decorator';
import * as stringUtils from './src/string';
import * as isoTypesUtils from './src/types-iso';

// Export types
export { Int1To10, Int1To20, Int1To30, Int1To40, Int1To50, Int1To60, Integer } from './src/number';
export { PolyglotProps, StrOrNever, StrOrNum,
         RealAny, Injection, MandatoryInjection, OptionalInjection } from './src/types-iso';

export { browserUtils }

// Export the most commonly used functions in the browser (all exports not working for some reason).
export const {
    first, last, first2, last2,
    without, withoutFirst, withoutLast, withoutFirst2, withoutLast2,
    rmAllFalsy,
    centerPad, leftPad, rightPad, removeWhitespace, chomp,
    getLangFromUrlPathname, parseQueryParams, parseUserAgent,
    deepFreeze, assignFrozenClone, merge,
    isArray, isBoolean, isTrue, isFalse, isInteger, isIntegerLike, isNumberLike, isStringOrNumber,
    isDateLike, isMultilangTextObj, isVoidOrString,
    isDataEnumItem, isIndexEnumItem, isNumericEnumItem, castToNum,
    getFromStorage,
    uuid,
    eachPair,
    replaceAll,
    toSnakeCase, toCamelCase, capitalize, cap1LowerRest, repeatChars,
    condSwitch,
    singleton,
    isLeapYear, now,
    hasKey, append } = browserUtils;

export const genLen6UUID = uuid.len6;
export const genLen8UUID = uuid.len8;

export { RequiredInjection } from './browser';
