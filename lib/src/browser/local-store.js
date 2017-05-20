"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** LOGGING *********************************************/
var mad_logs_1 = require("mad-logs");
var log = mad_logs_1.logFactory()("general-utils.ts", mad_logs_1.logMarkers.checkmate);
/******************************************** BROWSER *********************************************/
/**
 * If given a "store" object, try to get item at given key from it. Next try to get it from browser
 * localStorage or sessionStorage. Finally, try key in 'this' binding. Return null if all fail.
 */
exports.getFromStorage = function (key, store) {
    // Use value from store param, if it was provided.
    if (store && store[key]) {
        return store[key];
    }
    // Try to grab value off the window storage objects
    try {
        if (window && window.sessionStorage && window.localStorage) {
            return window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
        }
    }
    catch (e) {
        log.error('getFromStorage: not in a browser environment, cannot use window object');
    }
    // Try to grab the value from 'this' binding.
    if (_this && _this[key]) {
        return _this[key];
    }
};
//# sourceMappingURL=local-store.js.map