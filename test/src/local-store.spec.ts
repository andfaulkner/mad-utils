/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/***************************** IMPORT LOCAL-STORE MODULE FOR TESTING ******************************/
import { expect } from 'chai';

import { m_, localStore, getFromStorage, isAuthenticated } from '../../browser';
import { expectFunctionExists } from '../../node';

const docObjModel = m_.localStore;


/********************************************* TESTS **********************************************/
describe(`local-store sub-module`, function() {
    it(`exists`, function() {
        expect(localStore).to.exist;
    });
    describe('function getFromStorage', function() {
        expectFunctionExists(localStore.getFromStorage)
        expectFunctionExists(getFromStorage)
    });
    describe('function isAuthenticated', function() {
        expectFunctionExists(localStore.isAuthenticated)
        expectFunctionExists(isAuthenticated)
    });
    it(`exists`, function() {
        expect(localStore).to.exist;
    });
});
