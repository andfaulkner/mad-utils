"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared modules, and re-export them for top-level access
var shared_1 = require("./shared");
exports.array = shared_1.array;
exports.date = shared_1.date;
exports.decorator = shared_1.decorator;
exports.Enum = shared_1.Enum;
exports.error = shared_1.error;
exports.func = shared_1.func;
exports.json = shared_1.json;
exports.locale = shared_1.locale;
exports.number = shared_1.number;
exports.object = shared_1.object;
exports.url = shared_1.url;
exports.search = shared_1.search;
exports.string = shared_1.string;
exports.validation = shared_1.validation;
exports.stream = shared_1.stream;
__export(require("./src/array"));
__export(require("./src/date"));
__export(require("./src/decorator"));
__export(require("./src/enum"));
__export(require("./src/error"));
__export(require("./src/function"));
__export(require("./src/json"));
__export(require("./src/locale"));
__export(require("./src/number"));
__export(require("./src/object"));
__export(require("./src/url"));
__export(require("./src/search"));
__export(require("./src/stream"));
__export(require("./src/string"));
__export(require("./src/validation"));
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
exports.localStorage = localStore;
exports.localStoreUtils = localStore;
exports.localStorageUtils = localStore;
__export(require("./src/browser/local-store"));
// Import browser-types (including merged-in types from types-iso)
var browserTypes = require("./src/browser/types-browser");
__export(require("./src/browser/types-browser"));
__export(require("./src/types-iso"));
__export(require("./src/types-data-generic"));
// Build final browser types object by merging isomorphic types with browser-specific types
exports.types = Object.assign(shared_1.types, browserTypes, shared_1.dataTypes);
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module (namespace)
 */
exports.mUtils = {
    array: shared_1.array,
    commonDataTypes: shared_1.dataTypes,
    dataTypes: shared_1.dataTypes,
    date: shared_1.date,
    decorator: shared_1.decorator,
    decorators: shared_1.decorator,
    dom: dom,
    enum: shared_1.Enum,
    Enum: shared_1.Enum,
    err: shared_1.error,
    error: shared_1.error,
    event: event,
    func: shared_1.func,
    function: shared_1.func,
    functionUtils: shared_1.func,
    genericDataTypes: shared_1.dataTypes,
    isNode: detect_node_1.isNode,
    json: shared_1.json,
    jsonUtils: shared_1.json,
    locale: shared_1.locale,
    localStore: localStore,
    localStoreUtils: localStore,
    localStorage: localStore,
    localStorageUtils: localStore,
    number: shared_1.number,
    object: shared_1.object,
    url: shared_1.url,
    search: shared_1.search,
    stacktrace: shared_1.error,
    stream: shared_1.stream,
    str: shared_1.string,
    string: shared_1.string,
    type: exports.types,
    types: exports.types,
    typing: exports.types,
    validation: shared_1.validation,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
/************************************ COMMON FUNCTION EXPORTS *************************************/
var shared_2 = require("./shared");
/**
 * Most common functions from mad-utils used in browser
 */
exports.common = Object.assign({}, shared_2.commonShared, {
    parseUserAgent: dom.parseUserAgent,
    getFromStorage: localStore.getFromStorage,
});
//# sourceMappingURL=browser.js.map