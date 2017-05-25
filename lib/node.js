"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared modules, and re-export them for top-level access.
var shared_1 = require("./shared");
exports.array = shared_1.array;
exports.date = shared_1.date;
exports.decorator = shared_1.decorator;
exports.Enum = shared_1.Enum;
exports.error = shared_1.error;
exports.json = shared_1.json;
exports.locale = shared_1.locale;
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
__export(require("./src/locale"));
__export(require("./src/number"));
__export(require("./src/object"));
__export(require("./src/query"));
__export(require("./src/search"));
__export(require("./src/string"));
var detect_node_1 = require("detect-node");
exports.isNode = detect_node_1.isNode;
// Import middleware (and middleware-handling) module
var middleware = require("./src/node/middleware");
exports.middleware = middleware;
exports.middlewares = middleware;
exports.mware = middleware;
exports.MW = middleware;
__export(require("./src/node/middleware"));
// Import test module
var test = require("./src/node/test");
exports.test = test;
__export(require("./src/node/test"));
// Import file & file-handling module
var file = require("./src/node/file");
exports.file = file;
__export(require("./src/node/file"));
// Build final NodeJS types object by merging isomorphic types with Node-specific types.
// Export all, including merged-in types from types-iso.
var nodeTypes = require("./src/node/types-node");
exports.types = Object.assign(shared_1.types, nodeTypes);
__export(require("./src/types-iso"));
var webpack = require("./src/node/webpack");
exports.webpack = webpack;
exports.webpackUtils = webpack;
__export(require("./src/node/webpack"));
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: shared_1.array,
    date: shared_1.date,
    decorator: shared_1.decorator,
    decorators: shared_1.decorator,
    enum: shared_1.Enum,
    Enum: shared_1.Enum,
    error: shared_1.error,
    file: file,
    isNode: detect_node_1.isNode,
    json: shared_1.json,
    locale: shared_1.locale,
    middleware: middleware,
    number: shared_1.number,
    object: shared_1.object,
    query: shared_1.query,
    search: shared_1.search,
    stacktrace: shared_1.error.StackUtils,
    str: shared_1.string,
    string: shared_1.string,
    test: test,
    type: exports.types,
    types: exports.types,
    typing: exports.types,
    webpack: webpack,
    webpackUtils: webpack,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=node.js.map