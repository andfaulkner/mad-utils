"use strict";
//
// Loosely based on https://github.com/letsrock-today/mock-local-storage
// Thanks letsrock-today!
//
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Construct a mock Storage (localStorage / sessionStorage) object. Should be
 * bound to a global, to act as a shim for browser localStorage or sessionStorage
 * in a NodeJS environment.
 *
 * @return {Storage} New 'Storage' object
 * @example window.localStorage = mockBrowserStorage();
 */
exports.mockBrowserStorage = function mockBrowserStorage() {
    var store = {};
    var noopCallback = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    var _itemInsertionCallback = noopCallback;
    store.setItem = function (k, val) {
        k = k + '';
        if (!store.hasOwnProperty(k)) {
            _itemInsertionCallback(store.length);
        }
        store[k] = val + '';
    };
    store.getItem = function (k) {
        k = k + '';
        if (store.hasOwnProperty(k)) {
            return store[k];
        }
        else {
            return null;
        }
    };
    store.removeItem = function (k) {
        k = k + '';
        if (store.hasOwnProperty(k)) {
            delete store[k];
        }
    };
    store.clear = function () {
        for (var k in store) {
            if (store.hasOwnProperty(k)) {
                delete store[k];
            }
        }
    };
    Object.defineProperty(store, 'length', {
        enumerable: true,
        value: function () {
            return Object.keys(store).length;
        },
    });
    Object.defineProperty(store, 'key', {
        enumerable: true,
        value: function (k) {
            var key = Object.keys(store)[k];
            return (!key) ? null : key;
        },
    });
    Object.defineProperty(store, 'itemInsertionCallback', {
        get: function () {
            return _itemInsertionCallback;
        },
        set: function (val) {
            if (!val || typeof val != 'function') {
                val = noopCallback;
            }
            _itemInsertionCallback = val;
        }
    });
    return store;
};
// NOTE: this is a bit evil - instantiating just to get typings. This is due to
// a Typescript limitation, sadly.
var baseMockBrowserStorage = exports.mockBrowserStorage();
/**
 * Attempt to automatically bind localStorage and sessionStorage globally.
 * @return {boolean} true if it succeeds, false if it doesn't.
 */
exports.bindBrowserStorageGlobally = function () {
    if (typeof global !== 'undefined') {
        if (typeof global.window === 'undefined') {
            global.window = {
                localStorage: exports.mockBrowserStorage(),
                sessionStorage: exports.mockBrowserStorage(),
            };
        }
        else {
            global.window.localStorage = exports.mockBrowserStorage();
            global.window.sessionStorage = exports.mockBrowserStorage();
        }
        return true;
    }
    else if (typeof window !== 'undefined') {
        Object.assign(window, {
            localStorage: exports.mockBrowserStorage(),
            sessionStorage: exports.mockBrowserStorage(),
        });
        return true;
    }
    return false;
};
//# sourceMappingURL=mock-local-storage.js.map