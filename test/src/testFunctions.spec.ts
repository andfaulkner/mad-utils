/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT TESTS MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, test } from '../../node';

const testHelpers = m_.test;


/********************************************* TESTS **********************************************/
describe(`test sub-module`, function() {
    it(`exists`, function() {
        expect(test).to.exist;
    });
});
