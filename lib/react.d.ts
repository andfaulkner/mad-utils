/******************************** EXPORT ALL FROM REACT SRC FILES *********************************/
export * from './src/react/types-react';
export * from './src/react/hocs';
export * from './src/react/components';
/**
 * Log the value of a React Synthetic event's target component/element.
 * @param {string} callerName Name of function/method calling logSyntheticEvent.
 * @param {Function} logFn Function to use to perform the logging. Must accept at least 2 params.
 * @param {SyntheticEvent|any} event Event to log.
 */
export declare const logSyntheticEventValue: (callerName: string, logFn?: (arg1: any, ...args: any[]) => any) => (event: any) => void;
/********************************* EXPORT ALL FROM BROWSER UTILS **********************************/
export * from './browser';
import * as browserUtils from './browser';
import * as arrayUtils from './src/array';
import * as objUtils from './src/object';
import * as domUtils from './src/browser/dom';
import * as localStoreUtils from './src/browser/local-store';
import * as numberUtils from './src/number';
import * as functionUtils from './src/function';
import * as dateUtils from './src/date';
import * as isoTypesUtils from './src/types-iso';
export { Int1To10, Int1To20, Int1To30, Int1To40, Int1To50, Int1To60, Integer } from './src/number';
export { PolyglotProps, StrOrNever, StrOrNum, NumLike, RealAny, Injection, MandatoryInjection, OptionalInjection } from './src/types-iso';
export { browserUtils };
export declare const first: typeof arrayUtils.first, last: typeof arrayUtils.last, first2: typeof arrayUtils.first2, last2: typeof arrayUtils.last2, without: {
    last: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    last2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    last3: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    lastN: {
        <T>(str: string, numToRm: number): string;
        <T>(arr: T[], numToRm: number): T[];
    };
    first: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    first2: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    first3: {
        <T>(str: string): string;
        <T>(arr: T[]): T[];
    };
    firstN: {
        <T>(str: string, numToRm: number): string;
        <T>(arr: T[], numToRm: number): T[];
    };
}, withoutFirst: typeof arrayUtils.withoutFirst, withoutLast: typeof arrayUtils.withoutLast, withoutFirst2: typeof arrayUtils.withoutFirst2, withoutLast2: typeof arrayUtils.withoutLast2, rmAllFalsy: (arr: any[]) => any[], centerPad: (strToPad?: string, outWidth?: number, padChar?: string) => string, leftPad: (strToPad?: string, outWidth?: number, padChar?: string) => string, rightPad: (strToPad?: string, outWidth?: number, padChar?: string) => string, eliminateWhitespace: (str: string) => string, chomp: (str: string, charsToChomp?: string) => string, getLangFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string, parseQueryParams: <T>(queryParamsStr?: string) => T, parseUserAgent: typeof domUtils.parseUserAgent, deepFreeze: <T>(obj: T) => Readonly<T>, assignFrozenClone: <T>(...args: {}[]) => Readonly<T>, merge: typeof objUtils.merge, isArray: (val: any) => val is any[], isBoolean: (val: any) => val is boolean, isTrue: (val: any, include1CharVal?: boolean) => val is true, isFalse: (val: any, include1CharVal?: boolean) => val is false, isInteger: (val: any) => val is string | number | String | Number, isIntegerLike: (val: any) => val is string | number | String | Number, isNumberLike: (val: any, allowArrayWith1Num?: boolean) => boolean, isStringOrNumber: (val: any) => val is string | number | String | Number, isDateLike: (val: any) => boolean, isMultilangTextObj: (obj: any) => boolean, isNonexistentOrString: (val: any) => val is string, isDataEnumItem: (val: any, Enum: any) => boolean, isIndexEnumItem: (val: any, Enum: any) => boolean, isNumericEnumItem: (val: any, Enum: any) => boolean, castToNum: (numLike: isoTypesUtils.NumLike, throwOnFail?: boolean) => number | Error, getFromStorage: typeof localStoreUtils.getFromStorage, uuid: numberUtils.UUIDNamespace, eachPair: <T extends Object>(func: (val: T[keyof T], key?: keyof T) => any) => (obj: T) => T, replaceAll: (text: string, find: string | RegExp, replace: string) => string, toSnakecase: (str: string, consecUppercaseToLowercase?: boolean) => string, toCamelCase: (str: string) => string, capitalize: (str: string) => string, cap1LowerRest: (str: string) => string, repeatChars: (repStr: string, len: number) => string, condSwitch: typeof functionUtils.condSwitch, singleton: <T extends isoTypesUtils.ClassConstructor>(constructor: T) => isoTypesUtils.SingletonInterface<any> & T, isLeapYear: typeof dateUtils.isLeapYear, now: (timeFormat?: string) => string, hasKey: <T extends Object>(obj: T, matchKey: string) => boolean, append: typeof arrayUtils.append;
export declare const genLen6UUID: () => string;
export declare const genLen8UUID: () => string;
export { RequiredInjection } from './browser';
