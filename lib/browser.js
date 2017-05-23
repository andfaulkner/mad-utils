"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared modules
var shared_1 = require("./shared");
exports.array = shared_1.array;
exports.date = shared_1.date;
exports.decorator = shared_1.decorator;
exports.Enum = shared_1.Enum;
exports.error = shared_1.error;
exports.json = shared_1.json;
exports.number = shared_1.number;
exports.object = shared_1.object;
exports.query = shared_1.query;
exports.search = shared_1.search;
exports.string = shared_1.string;
__export(require("./src/array"));
__export(require("./src/date"));
__export(require("./src/decorator"));
__export(require("./src/enum"));
__export(require("./src/error"));
__export(require("./src/json"));
__export(require("./src/object"));
__export(require("./src/query"));
__export(require("./src/search"));
__export(require("./src/string"));
var detect_node_1 = require("detect-node");
exports.isNode = detect_node_1.isNode;
// Import DOM module
var dom = require("./src/browser/dom");
exports.dom = dom;
__export(require("./src/browser/dom"));
// Import event module
var event = require("./src/browser/event");
exports.event = event;
__export(require("./src/browser/event"));
// Import local-store module
var localStore = require("./src/browser/local-store");
exports.localStore = localStore;
__export(require("./src/browser/local-store"));
// Import browser-types (including merged-in types from types-iso)
var browserTypes = require("./src/browser/types-browser");
__export(require("./src/browser/types-browser"));
__export(require("./src/types-iso"));
// Build final browser types object by merging isomorphic types with browser-specific types.
exports.types = Object.assign({}, shared_1.types, browserTypes);
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module (namespace)
 */
exports.mUtils = {
    array: shared_1.array,
    date: shared_1.date,
    decorator: shared_1.decorator,
    decorators: shared_1.decorator,
    dom: dom,
    enum: shared_1.Enum,
    Enum: shared_1.Enum,
    error: shared_1.error,
    event: event,
    isNode: detect_node_1.isNode,
    json: shared_1.json,
    localStore: localStore,
    number: shared_1.number,
    object: shared_1.object,
    query: shared_1.query,
    search: shared_1.search,
    stacktrace: shared_1.error.StackUtils,
    str: shared_1.string,
    string: shared_1.string,
    type: exports.types,
    types: exports.types,
    typing: exports.types,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=browser.js.map