"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var array = require("./src/array");
exports.array = array;
__export(require("./src/array"));
var date = require("./src/date");
exports.date = date;
__export(require("./src/date"));
var decorator = require("./src/decorator");
exports.decorator = decorator;
__export(require("./src/decorator"));
var Enum = require("./src/enum");
exports.Enum = Enum;
__export(require("./src/enum"));
var error = require("./src/error");
exports.error = error;
__export(require("./src/error"));
var func = require("./src/function");
exports.func = func;
__export(require("./src/function"));
var locale = require("./src/locale");
exports.locale = locale;
__export(require("./src/locale"));
var number = require("./src/number");
exports.number = number;
__export(require("./src/number"));
var object = require("./src/object");
exports.object = object;
__export(require("./src/object"));
var url = require("./src/url");
exports.url = url;
__export(require("./src/url"));
var search = require("./src/search");
exports.search = search;
__export(require("./src/search"));
var string = require("./src/string");
exports.string = string;
__export(require("./src/string"));
var types = require("./src/types-iso");
exports.types = types;
__export(require("./src/types-iso"));
var dataTypes = require("./src/types-data-generic");
exports.dataTypes = dataTypes;
__export(require("./src/types-data-generic"));
var validation = require("./src/validation");
exports.validation = validation;
__export(require("./src/validation"));
var stream = require("./src/stream");
exports.stream = stream;
__export(require("./src/stream"));
// Import isNode (detect node vs browser)
var isNode = require("detect-node");
exports.isNode = isNode;
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: array,
    date: date,
    commonDataTypes: dataTypes,
    dataTypes: dataTypes,
    decorator: decorator,
    decorators: decorator,
    enum: Enum,
    Enum: Enum,
    error: error,
    find: search,
    func: func,
    function: func,
    functionUtils: func,
    genericDataTypes: dataTypes,
    isNode: isNode,
    locale: locale,
    math: number,
    num: number,
    number: number,
    numeric: number,
    object: object,
    url: url,
    search: search,
    srch: search,
    stacktrace: error,
    str: string,
    string: string,
    type: types,
    types: types,
    typing: types,
    validation: validation,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
/************************************ EXPORT COMMON FUNCTIONS *************************************/
exports.commonShared = {
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
    isNode: isNode,
};
exports.commonIso = exports.commonShared;
//# sourceMappingURL=shared.js.map