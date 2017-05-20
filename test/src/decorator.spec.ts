/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { expect } from 'chai';

import { m_, decorator } from '../../shared';

const dec = m_.decorator;


/********************************************* TESTS **********************************************/
describe(`decorator sub-module`, function() {
    it(`exists`, function() {
        expect(decorator).to.exist;
    });
});
