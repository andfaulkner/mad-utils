/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { expect } from 'chai';

import { m_, number } from '../../shared';

const err = m_.number;


/********************************************* TESTS **********************************************/
describe(`number sub-module`, function() {
    it(`exists`, function() {
        expect(number).to.exist;
    });
});
