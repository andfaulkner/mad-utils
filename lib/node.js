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
// Import shared modules, and re-export them for top-level access
var shared_1 = require("./shared");
__export(require("./shared"));
// Import shared modules for usage in typings
var shared_2 = require("./shared");
/***** Merge shared & Node error handling and export *****/
var nodeError = require("./src/node/node-error");
exports.nodeError = nodeError;
__export(require("./src/node/node-error"));
var shared_3 = require("./shared");
var shared_4 = require("./shared");
exports.errorShared = shared_4.error;
var err = __assign({}, shared_3.error, nodeError);
exports.err = err;
exports.error = err;
/***** Export Node-specific modules/namespaces *****/
// Import & export middleware (and middleware-handling) module/namespace
var middleware = require("./src/node/middleware");
exports.middleware = middleware;
exports.middlewares = middleware;
exports.mware = middleware;
exports.MW = middleware;
__export(require("./src/node/middleware"));
// Import & export test module/namespace
var test = require("./src/node/test");
exports.test = test;
__export(require("./src/node/test"));
// Import & export file & file-handling module/namespace
var file = require("./src/node/file");
exports.file = file;
__export(require("./src/node/file"));
// Import ExpressJS routing helpers module
var expressRouting = require("./src/node/express-routing");
exports.expressRouting = expressRouting;
__export(require("./src/node/express-routing"));
/***** Build & export Node-specific types *****/
// Build final NodeJS types object by merging isomorphic types with Node-specific types
// Export all, including merged-in types from types-iso
var nodeTypes = require("./src/node/types-node");
exports.types = Object.assign(shared_2.types, nodeTypes, shared_2.dataTypes);
/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus node-specific namespaces
 */
exports.mUtils = __assign({}, shared_1.m_, { expressRouting: expressRouting,
    file: file,
    middleware: middleware, nodeErr: nodeError, nodeError: nodeError,
    search: shared_2.search,
    stream: shared_2.stream,
    test: test, type: exports.types, types: exports.types, typing: exports.types });
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=node.js.map