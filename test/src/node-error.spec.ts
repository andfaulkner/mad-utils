/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { expect } from 'chai';

import { m_, error, nodeError } from '../../node';

const dec = m_.error;

/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    it(`exists`, function() {
        expect(error).to.exist;
        expect(nodeError).to.exist;
    });
});
