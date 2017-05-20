/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/***************************** IMPORT LOCAL-STORE MODULE FOR TESTING ******************************/
import { expect } from 'chai';

import { m_, localStore } from '../../browser';

const docObjModel = m_.localStore;


/********************************************* TESTS **********************************************/
describe(`local-store sub-module`, function() {
    it(`exists`, function() {
        expect(localStore).to.exist;
    });
});
