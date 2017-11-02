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
__export(require("./src/node/node-error"));
__export(require("./src/object"));
__export(require("./src/url"));
__export(require("./src/search"));
__export(require("./src/stream"));
__export(require("./src/string"));
__export(require("./src/validation"));
var detect_node_1 = require("detect-node");
exports.isNode = detect_node_1.isNode;
// Import middleware (and middleware-handling) module
var middleware = require("./src/node/middleware");
exports.middleware = middleware;
exports.middlewares = middleware;
exports.mware = middleware;
exports.MW = middleware;
__export(require("./src/node/middleware"));
var nodeError = require("./src/node/node-error");
exports.nodeError = nodeError;
__export(require("./src/node/node-error"));
var errorShared = require("./shared");
var shared_2 = require("./shared");
exports.errorShared = shared_2.error;
var err = Object.assign({}, errorShared, nodeError);
exports.err = err;
exports.error = err;
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
exports.types = Object.assign(shared_1.types, nodeTypes, shared_1.dataTypes);
__export(require("./src/types-iso"));
__export(require("./src/types-data-generic"));
// Import Webpack utilities/helpers/plugins module.
var webpack = require("./src/node/webpack");
exports.webpack = webpack;
exports.webpackUtils = webpack;
__export(require("./src/node/webpack"));
// Import ExpressJS routing helpers module.
var expressRouting = require("./src/node/express-routing");
exports.expressRouting = expressRouting;
__export(require("./src/node/express-routing"));
/********************************************* EXPORT *********************************************/
/**
 * @export mUtils - module
 */
exports.mUtils = {
    array: shared_1.array,
    commonDataTypes: shared_1.dataTypes,
    dataTypes: shared_1.dataTypes,
    date: shared_1.date,
    decorator: shared_1.decorator,
    decorators: shared_1.decorator,
    enum: shared_1.Enum,
    Enum: shared_1.Enum,
    error: err,
    err: err,
    errorShared: errorShared,
    expressRouting: expressRouting,
    file: file,
    func: shared_1.func,
    'function': shared_1.func,
    functionUtils: shared_1.func,
    genericDataTypes: shared_1.dataTypes,
    isNode: detect_node_1.isNode,
    json: shared_1.json,
    jsonUtils: shared_1.json,
    locale: shared_1.locale,
    middleware: middleware,
    nodeErr: nodeError,
    nodeError: nodeError,
    number: shared_1.number,
    object: shared_1.object,
    url: shared_1.url,
    search: shared_1.search,
    stacktrace: err,
    stream: shared_1.stream,
    str: shared_1.string,
    string: shared_1.string,
    test: test,
    type: exports.types,
    types: exports.types,
    typing: exports.types,
    validation: shared_1.validation,
    webpack: webpack,
    webpackUtils: webpack,
};
// Easier to access the 'pseudo-namespaced' mUtils/madUtils module.
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
/************************************ COMMON FUNCTION EXPORTS *************************************/
var shared_3 = require("./shared");
var middleware_1 = require("./src/node/middleware");
/**
 * Most common functions from mad-utils used in Node.
 */
exports.common = Object.assign({}, shared_3.commonShared, {
    isDir: file.isDir,
    pathFromRoot: file.pathFromRoot,
    replaceInFile: file.replaceInFile,
    getJsFilesInDir: file.getJsFilesInDir,
    isFileInDir: file.isFileInDir,
    useMiddlewareInProdOnly: middleware_1.useMiddlewareInProdOnly,
    composeExpressMiddlewares: middleware.composeExpressMiddlewares,
    expectEmptyObject: test.expectEmptyObject,
    expectFuncExists: test.expectFuncExists,
    expectNonEmptyObjectExists: test.expectNonEmptyObjectExists,
});
//# sourceMappingURL=node.js.map