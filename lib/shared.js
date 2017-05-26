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
var error_1 = require("./src/error");
exports.StackUtils = error_1.StackUtils;
var json = require("./src/json");
exports.json = json;
__export(require("./src/json"));
var locale = require("./src/locale");
exports.locale = locale;
__export(require("./src/locale"));
var number = require("./src/number");
exports.number = number;
__export(require("./src/number"));
var object = require("./src/object");
exports.object = object;
__export(require("./src/object"));
var query = require("./src/query");
exports.query = query;
__export(require("./src/query"));
var search = require("./src/search");
exports.search = search;
__export(require("./src/search"));
var string = require("./src/string");
exports.string = string;
__export(require("./src/string"));
var types = require("./src/types-iso");
exports.types = types;
__export(require("./src/types-iso"));
// Import isNode (detect node vs browser)
var isNode = require("detect-node");
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: array,
    date: date,
    decorator: decorator,
    decorators: decorator,
    enum: Enum,
    Enum: Enum,
    error: error,
    isNode: isNode,
    json: json,
    locale: locale,
    number: number,
    object: object,
    query: query,
    search: search,
    stacktrace: error_1.StackUtils,
    StackUtils: error_1.StackUtils,
    str: string,
    string: string,
    type: types,
    types: types,
    typing: types,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=shared.js.map