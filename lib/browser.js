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
/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus browser-specific namespaces
 */
exports.mUtils = __assign({}, shared_1.m_, { dom: dom,
    event: event,
    localStore: localStore, localStoreUtils: localStore, localStorage: localStore, localStorageUtils: localStore });
exports.__ = exports.mUtils;
exports.m_ = exports.mUtils;
exports.madUtils = exports.mUtils;
//# sourceMappingURL=browser.js.map