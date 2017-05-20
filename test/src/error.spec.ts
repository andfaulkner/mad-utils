/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, error } from '../../index';

const err = m_.error;

describe(`error sub-module`, function() {
    it(`exists`, function() {
        expect(error).to.exist;
    });
});
