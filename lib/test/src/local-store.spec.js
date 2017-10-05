"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
require("jsdom-global/register");
/***************************** IMPORT LOCAL-STORE MODULE FOR TESTING ******************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************************* DOM MOCKS ********************************************/
var mock_local_storage_1 = require("../mock/mock-local-storage");
mock_local_storage_1.bindBrowserStorageGlobally();
console.log(window.localStorage);
console.log(window.localStorage.toString());
/********************************** IMPORT FUNCTIONS FROM MODULE **********************************/
var browser_1 = require("../../browser");
var browser_2 = require("../../browser");
var localStoreModule = require("../../src/browser/local-store");
/********************************************* MOCKS **********************************************/
var mockStore = {
    key1: 'key1_val_mockStore',
    storeKey1: 'storeKey1_val_mockStore',
};
var MockClassStore = /** @class */ (function () {
    function MockClassStore(key1, classStoreKey1) {
        if (key1 === void 0) { key1 = 'key1_val_mockClassStore'; }
        if (classStoreKey1 === void 0) { classStoreKey1 = 'classStoreKey1_val_mockClassStore'; }
        this.key1 = key1;
        this.classStoreKey1 = classStoreKey1;
        console.log("local-store.spec:: MockClassStore constructor: Instantiated MockClassStore");
    }
    return MockClassStore;
}());
var mockClassStore = new MockClassStore();
window.localStorage.setItem('key1', 'key1_val_localStorage');
window.localStorage.setItem('lsKey1', 'lsKey1_val_localStorage');
window.sessionStorage.setItem('key1', 'key1_val_sessionStorage');
window.sessionStorage.setItem('ssKey1', 'ssKey1_val_sessionStorage');
// Log result of global mocking
console.log(window.localStorage);
console.log(Object.keys(window));
/********************************************* TESTS **********************************************/
describe("local-store sub-module", function () {
    test_1.expectNonEmptyObjectExists(browser_1.localStore, 'localStore (from shared/base export)');
    test_1.expectNonEmptyObjectExists(browser_1.localStorage, 'localStore alias lStorage (from shared/base export)');
    test_1.expectNonEmptyObjectExists(browser_1.localStorageUtils, 'localStore alias localStorageUtils (from shared/base export)');
    test_1.expectNonEmptyObjectExists(browser_1.localStoreUtils, 'localStore alias localStoreUtils (from shared/base export)');
    test_1.expectNonEmptyObjectExists(browser_1.m_.localStore, 'localStore (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(localStoreModule, 'localStore (import all from localStore.ts file)');
    test_1.expectNonEmptyObjectExists(browser_2.localStore, 'localStore (from Browser export)');
    describe('function getFromStorage', function () {
        test_1.expectFunctionExists(browser_1.localStore.getFromStorage);
        test_1.expectFunctionExists(browser_1.getFromStorage);
        it("should retrieve value from localStorage if not given an object or bound to one", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage('lsKey1')).to.eql('lsKey1_val_localStorage');
        });
        it("should retrieve value from sessionStorage if val not found in localStorage, & " +
            "getFromStorage is not given an object or bound to an object", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage('ssKey1')).to.eql('ssKey1_val_sessionStorage');
        });
        it("should retrieve value from localStorage if given an object that doesn't contain " +
            "the requested key", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage('lsKey1', mockStore)).to.eql('lsKey1_val_localStorage');
        });
        it("should retrieve value from object getFromStorage function is bound to if no store " +
            "object is given", function () {
            chai_1.expect(browser_1.getFromStorage.call(mockClassStore, 'classStoreKey1'))
                .to.eql('classStoreKey1_val_mockClassStore');
        });
        it("should give precedence to value in given object (store) if key also exists in " +
            "localStorage & sessionStorage, and object getFromStorage is bound to", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage.call(mockClassStore, 'key1', mockStore))
                .to.eql('key1_val_mockStore');
        });
        it("should give precedence to value in object to which function is bound if key also " +
            "exists in localStorage & sessionStorage", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage.call(mockClassStore, 'key1'))
                .to.eql('key1_val_mockClassStore');
        });
        it("should give precedence to value in sessionStorage over localStorage", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage('key1')).to.eql('key1_val_sessionStorage');
        });
        it("should return null if not found in localStorage, 'this', or given object", function () {
            chai_1.expect(browser_1.localStorageUtils.getFromStorage('non_existent_key', mockStore)).to.be.null;
        });
    });
    describe('function isAuthenticated', function () {
        test_1.expectFunctionExists(browser_1.localStore.isAuthenticated);
        test_1.expectFunctionExists(browser_1.isAuthenticated);
    });
});
//# sourceMappingURL=local-store.spec.js.map