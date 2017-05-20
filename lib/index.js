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
var event = require("./src/event");
exports.event = event;
__export(require("./src/event"));
var json = require("./src/json");
exports.json = json;
__export(require("./src/json"));
var object = require("./src/object");
exports.object = object;
__export(require("./src/object"));
var query = require("./src/query");
exports.query = query;
__export(require("./src/query"));
var string = require("./src/string");
exports.string = string;
__export(require("./src/string"));
var test = require("./src/test");
exports.test = test;
__export(require("./src/test"));
var types = require("./src/types");
exports.types = types;
__export(require("./src/types"));
// Import isNode (detect node vs browser)
var isNode = require("detect-node");
// Import DOM module
var dom = require("./src/dom");
exports.dom = dom;
var dom_1 = require("./src/dom");
exports.$ = dom_1.$;
/******************************** EXPORT - WITH PSEUDO-NAMESPACES *********************************/
var str = Object.assign({}, { stringToEnumVal: Enum.stringToEnumVal }, string);
var arr = Object.assign({}, array, {
    without: {
        last: array.withoutLast,
        last2: array.withoutLast2,
        last3: array.withoutLast3,
        lastN: array.withoutLastN,
        first: array.withoutFirst,
        first2: array.withoutFirst2,
        first3: array.withoutFirst3,
        firstN: array.withoutFirstN,
    }
});
var typeMethods = Object.assign({}, types, {
    isMultilangTextObj: object.isMultilangTextObj,
    matches: string.matches,
    matchesIgnoreCase: string.matchesIgnoreCase,
    isNonexistentOrString: types.isNonexistentOrString,
});
var decorators = Object.assign({}, decorator, {
    DecoratorError: error.DecoratorError,
    singleton: types.singleton,
});
var search = {
    escapeRegExp: string.escapeRegExp,
    matches: string.matches,
    matchesIgnoreCase: string.matchesIgnoreCase,
    replaceAll: string.replaceAll,
};
var number = {
    isInt: types.isInt,
    isNumberLike: types.isNumberLike,
};
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: arr,
    date: date,
    decorator: decorators,
    decorators: decorators,
    dom: dom,
    enum: Enum,
    Enum: Enum,
    error: error,
    event: event,
    isNode: isNode,
    json: json,
    number: number,
    object: object,
    query: query,
    search: search,
    str: str,
    string: str,
    test: test,
    type: typeMethods,
    types: typeMethods,
    typing: typeMethods,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=index.js.map