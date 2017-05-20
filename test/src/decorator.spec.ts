/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, decorator } from '../../index';

const dec = m_.decorator;

describe(`decorator sub-module`, function() {
    it(`exists`, function() {
        expect(decorator).to.exist;
    });
});
