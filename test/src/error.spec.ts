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

    describe(`StackUtils submodule`, function() {
        it(`exists`, function() {
            expect(error.StackUtils).to.exist;
        });
        it(`contains function to get stack items (by number)`, function() {
            expect(error.StackUtils.getFirstStackItem).to.exist;
            expect(error.StackUtils.getSecondStackItem).to.exist;
            expect(error.StackUtils.getThirdStackItem).to.exist;
        });
        it(`contains function to remove matching items from stack`, function() {
            expect(error.StackUtils.removeFromStack).to.exist;
        });
    });
});
