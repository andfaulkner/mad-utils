/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
import 'jsdom-global/register';

declare const global: NodeJS.Global & {window: {localStorage: Storage; sessionStorage: Storage}};

/***************************** IMPORT LOCAL-STORE MODULE FOR TESTING ******************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists, expectFunctionExists} from '../../src/node/test';

/******************************************* DOM MOCKS ********************************************/
import {mockBrowserStorage, bindBrowserStorageGlobally} from '../mock/mock-local-storage';
bindBrowserStorageGlobally();

console.log(window.localStorage);
console.log(window.localStorage.toString());

/********************************** IMPORT FUNCTIONS FROM MODULE **********************************/
import {
    m_,
    localStore,
    localStorage as lStorage,
    getFromStorage,
    localStorageUtils,
    localStoreUtils,
    isAuthenticated,
} from '../../browser';

import {localStore as localStoreFromBrowser} from '../../browser';
import * as localStoreModule from '../../src/browser/local-store';

/********************************************* MOCKS **********************************************/
const mockStore = {
    key1: 'key1_val_mockStore',
    storeKey1: 'storeKey1_val_mockStore',
};

class MockClassStore {
    constructor(
        public key1 = 'key1_val_mockClassStore',
        public classStoreKey1 = 'classStoreKey1_val_mockClassStore'
    ) {
        console.log(`local-store.spec:: MockClassStore constructor: Instantiated MockClassStore`);
    }
}
const mockClassStore = new MockClassStore();

window.localStorage.setItem('key1', 'key1_val_localStorage');
window.localStorage.setItem('lsKey1', 'lsKey1_val_localStorage');

window.sessionStorage.setItem('key1', 'key1_val_sessionStorage');
window.sessionStorage.setItem('ssKey1', 'ssKey1_val_sessionStorage');

// Log result of global mocking
console.log(window.localStorage);
console.log(Object.keys(window));

/********************************************* TESTS **********************************************/
describe(`local-store sub-module`, function() {
    expectNonEmptyObjectExists(localStore, 'localStore (from shared/base export)');
    expectNonEmptyObjectExists(lStorage, 'localStore alias lStorage (from shared/base export)');
    expectNonEmptyObjectExists(
        localStorageUtils,
        'localStore alias localStorageUtils (from shared/base export)'
    );
    expectNonEmptyObjectExists(
        localStoreUtils,
        'localStore alias localStoreUtils (from shared/base export)'
    );
    expectNonEmptyObjectExists(m_.localStore, 'localStore (from m_ top-level namespace)');
    expectNonEmptyObjectExists(localStoreModule, 'localStore (import all from localStore.ts file)');
    expectNonEmptyObjectExists(localStoreFromBrowser, 'localStore (from Browser export)');

    describe('function getFromStorage', function() {
        expectFunctionExists(localStore.getFromStorage);
        expectFunctionExists(getFromStorage);

        it(`should retrieve value from localStorage if not given an object or bound to one`, function() {
            expect(localStorageUtils.getFromStorage('lsKey1')).to.eql('lsKey1_val_localStorage');
        });

        it(
            `should retrieve value from sessionStorage if val not found in localStorage, & ` +
                `getFromStorage is not given an object or bound to an object`,
            function() {
                expect(localStorageUtils.getFromStorage('ssKey1')).to.eql(
                    'ssKey1_val_sessionStorage'
                );
            }
        );

        it(
            `should retrieve value from localStorage if given an object that doesn't contain ` +
                `the requested key`,
            function() {
                expect(localStorageUtils.getFromStorage('lsKey1', mockStore)).to.eql(
                    'lsKey1_val_localStorage'
                );
            }
        );

        it(
            `should retrieve value from object getFromStorage function is bound to if no store ` +
                `object is given`,
            function() {
                expect(getFromStorage.call(mockClassStore, 'classStoreKey1')).to.eql(
                    'classStoreKey1_val_mockClassStore'
                );
            }
        );

        it(
            `should give precedence to value in given object (store) if key also exists in ` +
                `localStorage & sessionStorage, and object getFromStorage is bound to`,
            function() {
                expect(
                    localStorageUtils.getFromStorage.call(mockClassStore, 'key1', mockStore)
                ).to.eql('key1_val_mockStore');
            }
        );

        it(
            `should give precedence to value in object to which function is bound if key also ` +
                `exists in localStorage & sessionStorage`,
            function() {
                expect(localStorageUtils.getFromStorage.call(mockClassStore, 'key1')).to.eql(
                    'key1_val_mockClassStore'
                );
            }
        );

        it(`should give precedence to value in sessionStorage over localStorage`, function() {
            expect(localStorageUtils.getFromStorage('key1')).to.eql('key1_val_sessionStorage');
        });

        it(`should return null if not found in localStorage, 'this', or given object`, function() {
            expect(localStorageUtils.getFromStorage('non_existent_key', mockStore)).to.be.null;
        });
    });

    describe('function isAuthenticated', function() {
        expectFunctionExists(localStore.isAuthenticated);
        expectFunctionExists(isAuthenticated);
    });
});
