/******************************************** IMPORTS *********************************************/
import * as array from './src/array';
export * from './src/array';
export {array};

import * as date from './src/date';
export * from './src/date';
export {date};

import * as decorator from './src/decorator';
export * from './src/decorator';
export {decorator};

import * as Enum from './src/enum';
export * from './src/enum';
export {Enum};

import * as error from './src/error';
export * from './src/error';
export {error};

import * as func from './src/function';
export * from './src/function';
export {func};

import * as locale from './src/locale';
export * from './src/locale';
export {locale};

import * as number from './src/number';
export * from './src/number';
export {number};

import * as object from './src/object';
export * from './src/object';
export {object};

import * as url from './src/url';
export * from './src/url';
export {url};

import * as search from './src/search';
export * from './src/search';
export {search};

import * as string from './src/string';
export * from './src/string';
export {string};

import * as types from './src/types-iso';
export * from './src/types-iso';
export {types};

import * as dataTypes from './src/types-data-generic';
export * from './src/types-data-generic';
export {dataTypes};

import * as validation from './src/validation';
export * from './src/validation';
export {validation};

import * as stream from './src/stream';
export * from './src/stream';
export {stream};

// Import isNode (detect node vs browser)
import * as isNode from 'detect-node';
export {isNode};

/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
export const mUtils = {
    array,
    date,
    commonDataTypes: dataTypes,
    dataTypes,
    decorator,
    decorators: decorator,
    enum: Enum,
    Enum,
    error,
    find: search,
    func: func,
    function: func,
    functionUtils: func,
    genericDataTypes: dataTypes,
    isNode,
    locale,
    math: number,
    num: number,
    number,
    numeric: number,
    object,
    url,
    search,
    srch: search,
    stacktrace: error,
    str: string,
    string,
    type: types,
    types,
    typing: types,
    validation,
};

// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
export const __ = mUtils;
export const m_ = mUtils;
export const madUtils = mUtils;

/************************************ EXPORT COMMON FUNCTIONS *************************************/
export const commonShared = {
    first: array.first,
    last: array.last,
    first2: array.first2,
    last2: array.last2,
    without: array.without,
    withoutFirst: array.withoutFirst,
    withoutLast: array.withoutLast,
    withoutFirst2: array.withoutFirst2,
    withoutLast2: array.withoutLast2,
    removeMatches: array.removeMatches,
    rmAllFalsy: array.rmAllFalsy,
    isArray: array.isArray,

    isLeapYear: date.isLeapYear,
    now: date.now,

    condSwitch: func.condSwitch,

    uuid: number.uuid,

    hasKey: object.hasKey,
    eachPair: object.eachPair,
    assignFrozenClone: object.assignFrozenClone,
    deepFreeze: object.deepFreeze,

    parseQueryParams: url.parseQueryParams,
    getLangFromUrlPathname: url.getLangFromUrlPathname,
    urlMinusQueryParams: url.urlMinusQueryParams,

    toSnakeCase: string.toSnakeCase,
    cap1LowerRest: string.cap1LowerRest,
    capitalize: string.capitalize,
    replaceAll: string.replaceAll,
    removeWhitespace: string.removeWhitespace,
    chomp: string.chomp,
    matchesIgnoreCase: string.matchesIgnoreCase,
    removeMatchingText: string.removeMatchingText,
    repeatChars: string.repeatChars,
    endsWithExt: string.endsWithExt,
    leftPad: string.leftPad,
    rightPad: string.rightPad,
    centerPad: string.centerPad,

    isVoidOrString: types.isVoidOrString,
    isNumberLike: types.isNumberLike,
    isBoolean: types.isBoolean,
    isDateLike: types.isDateLike,
    isTrue: types.isTrue,
    castToNum: types.castToNum,

    CharInputStream: stream.CharInputStream,
    isNode,
};

export {commonShared as commonIso};
