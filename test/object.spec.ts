/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, object } from '../index';

const obj = m_.object;

describe(`object sub-module`, function() {
    it(`exists`, function() {
        expect(object).to.exist;
    });
});
