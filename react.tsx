import {Moment} from 'moment';

/******************************** EXPORT ALL FROM REACT SRC FILES *********************************/
export * from './src/react/types-react';
export * from './src/react/hocs';
export * from './src/react/components';

type FuncW2OrMoreArgs = (arg1: any, ...args: any[]) => any | void;

/**
 * Log the value of a React Synthetic event's target component/element
 * @param {string} callerName Name of function/method calling logSyntheticEvent
 * @param {Function} logFn Function to use to perform the logging. Must accept at least 2 params
 * @param {SyntheticEvent|any} event Event to log
 */
export const logSyntheticEventValue = (
    callerName: string,
    logFn: FuncW2OrMoreArgs = console.log
) => (event): void => {
    logFn(`${callerName} :: event:`, event);

    // Handle cases where event is not an object or function
    if (
        typeof event === 'undefined' ||
        event === null ||
        (typeof event !== 'object' && typeof event !== 'function')
    ) {
        return logFn(
            `${callerName} :: event must be an object w key target. typeof event:`,
            typeof event
        );
    }

    logFn(`${callerName} :: event.target:`, event.target);

    if (
        // Handle cases where event does not have key 'target'
        !(event.target && (typeof event.target === 'object' || typeof event.target === 'function'))
    ) {
        logFn(`${callerName} :: value not present in event.target`);
    } else {
        // Handle cases where event *does* have key 'target' (happy path!)
        logFn(`${callerName} :: event.target['value']:`, event.target['value']);
    }
};

/********************************* EXPORT ALL FROM BROWSER UTILS **********************************/
export * from './browser';

// Imported to appease exports below
import browserUtils from './browser';
import arrayUtils from './src/array';
import objUtils from './src/object';
import urlUtils from './src/url';
import domUtils from './src/browser/dom';
import localStoreUtils from './src/browser/local-store';
import numberUtils from './src/number';
import functionUtils from './src/function';
import dateUtils from './src/date';
import decoratorUtils from './src/decorator';
import stringUtils from './src/string';
import isoTypesUtils from './src/types-iso';

// Export types
export {Int1To10, Int1To20, Int1To30, Int1To40, Int1To50, Int1To60, Integer} from './src/number';
export {
    StrOrNever,
    StrOrNum,
    RealAny,
    Injection,
    MandatoryInjection,
    OptionalInjection,
} from './src/types-iso';

export {browserUtils};

// Export the most commonly used functions in the browser (all exports not working for some reason)
export const {
    first,
    last,
    first2,
    last2,
    without,
    withoutFirst,
    withoutLast,
    withoutFirst2,
    withoutLast2,
    rmAllFalsy,
    centerPad,
    leftPad,
    rightPad,
    removeWhitespace,
    chomp,
    getLangFromUrlPathname,
    parseQueryParams,
    parseUserAgent,
    deepFreeze,
    assignFrozenClone,
    isArray,
    isBoolean,
    isTrue,
    isFalse,
    isInteger,
    isIntegerLike,
    isNumberLike,
    isStringOrNumber,
    isDateLike,
    isVoidOrString,
    isDataEnumItem,
    isIndexEnumItem,
    isNumericEnumItem,
    getFromStorage,
    uuid,
    eachPair,
    replaceAll,
    toSnakeCase,
    toCamelCase,
    capitalize,
    cap1LowerRest,
    repeatChars,
    switchExpr,
    singleton,
    isLeapYear,
    now,
    hasKey,
} = browserUtils;

export const genLen6UUID = uuid.len6;
export const genLen8UUID = uuid.len8;

export {RequiredInjection} from './browser';
