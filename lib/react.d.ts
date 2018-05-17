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
export { Int1To10, Int1To20, Int1To30, Int1To40, Int1To50, Int1To60, Integer } from './src/number';
export { PolyglotProps, StrOrNever, StrOrNum, NumLike, RealAny, Injection, MandatoryInjection, OptionalInjection } from './src/types-iso';
export { browserUtils };
export declare const first: typeof browserUtils.first, last: typeof browserUtils.last, first2: typeof browserUtils.first2, last2: typeof browserUtils.last2, without: {
    last: typeof browserUtils.withoutLast;
    last2: typeof browserUtils.withoutLast2;
    last3: typeof browserUtils.withoutLast3;
    lastN: typeof browserUtils.withoutLastN;
    first: typeof browserUtils.withoutFirst;
    first2: typeof browserUtils.withoutFirst2;
    first3: typeof browserUtils.withoutFirst3;
    firstN: typeof browserUtils.withoutFirstN;
}, withoutFirst: typeof browserUtils.withoutFirst, withoutLast: typeof browserUtils.withoutLast, withoutFirst2: typeof browserUtils.withoutFirst2, withoutLast2: typeof browserUtils.withoutLast2, rmAllFalsy: (arr: any[]) => any[], centerPad: (strToPad?: string, outWidth?: number, padChar?: string) => string, leftPad: (strToPad?: string, outWidth?: number, padChar?: string) => string, rightPad: (strToPad?: string, outWidth?: number, padChar?: string) => string, removeWhitespace: (str: string) => string, chomp: (str: string, charsToChomp?: string) => string, getLangFromUrlPathname: (urlPath?: string, supportedLangs?: string[], defaultLang?: string) => string, parseQueryParams: <T>(queryParamsStr?: string) => T, parseUserAgent: typeof browserUtils.parseUserAgent, deepFreeze: <T>(obj: T) => Readonly<T>, assignFrozenClone: <T>(...args: {}[]) => Readonly<T>, merge: typeof browserUtils.merge, isArray: <T = any>(val: any) => val is T[], isBoolean: <T extends boolean | Boolean = boolean>(val: any) => val is T, isTrue: <T extends string | true | String = true>(val: any, include1CharVal?: boolean) => val is T, isFalse: <T extends string | false | String = false>(val: any, include1CharVal?: boolean) => val is T, isInteger: <T extends string | number | String | Number = number>(val: any) => val is T, isIntegerLike: <T extends string | number | String | Number = number>(val: any) => val is T, isNumberLike: <T extends string | number | String | Number | (number | Number)[] = number>(val: any, allowArrayWith1Num?: boolean) => val is T, isStringOrNumber: (val: any) => val is string | number | String | Number, isDateLike: (val: any) => boolean, isMultilangTextObj: (obj: any) => boolean, isVoidOrString: (val: any) => val is string, isDataEnumItem: (val: any, Enum: any) => boolean, isIndexEnumItem: (val: any, Enum: any) => boolean, isNumericEnumItem: (val: any, Enum: any) => boolean, castToNum: (val: browserUtils.NumLike, throwOnFail?: boolean) => number | Error, getFromStorage: typeof browserUtils.getFromStorage, uuid: browserUtils.UUIDNamespace, eachPair: <T extends Object>(func: (val: T[keyof T], key?: keyof T) => any) => (obj: T) => T, replaceAll: (text: string, find: string | RegExp, replace: string) => string, toSnakeCase: (str: string, consecUppercaseToLowercase?: boolean) => string, toCamelCase: (str: string) => string, capitalize: (str: string) => string, cap1LowerRest: (str: string) => string, repeatChars: (repStr: string, len: number) => string, condSwitch: typeof browserUtils.condSwitch, singleton: <T extends browserUtils.ClassConstructor>(constructor: T) => browserUtils.SingletonInterface<any> & T, isLeapYear: typeof browserUtils.isLeapYear, now: (timeFormat?: string) => string, hasKey: <T extends Object>(obj: T, matchKey: string) => boolean, append: typeof browserUtils.append;
export declare const genLen6UUID: () => string;
export declare const genLen8UUID: () => string;
export { RequiredInjection } from './browser';
