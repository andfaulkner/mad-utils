/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, error } from '../../shared';

const err = m_.error;


/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    it(`exists`, function() {
        expect(error).to.exist;
    });
});
