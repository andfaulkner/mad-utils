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
    it(`contains functions to get stack items (by number)`, function() {
        expect(error.getFirstStackItem).to.exist;
        expect(error.getSecondStackItem).to.exist;
        expect(error.getThirdStackItem).to.exist;
    });
    it(`contains removeFromStack function to remove matching items from stack`, function() {
        expect(error.removeFromStack).to.exist;
    });
});
