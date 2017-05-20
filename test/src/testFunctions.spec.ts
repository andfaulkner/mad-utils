/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, test } from '../index';

const testHelpers = m_.test;

describe(`test sub-module`, function() {
    it(`exists`, function() {
        expect(test).to.exist;
    });
});
