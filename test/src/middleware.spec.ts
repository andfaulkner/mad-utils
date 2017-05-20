/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT MIDDLEWARE MODULE FOR TESTING ******************************/
import { expect } from 'chai';

import { m_, middleware } from '../../node';

const mw = m_.middleware;


/********************************************* TESTS **********************************************/
describe(`middleware sub-module`, function() {
    it(`exists`, function() {
        expect(middleware).to.exist;
    });
});
