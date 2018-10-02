"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var typesIso = require("./src/types-iso");
exports.typesIso = typesIso;
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
// Build final types object by merging isomorphic types with data types
// Note that this excludes straight types (it only includes type utils)
exports.types = __assign({}, typesIso, dataTypes);
/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus browser-specific namespaces
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
    err: error,
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
    stream: stream,
    object: object,
    url: url,
    search: search,
    srch: search,
    stacktrace: error,
    str: string,
    string: string,
    type: exports.types,
    types: exports.types,
    typing: exports.types,
    validation: validation,
};
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=shared.js.map