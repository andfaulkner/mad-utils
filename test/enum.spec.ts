/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, Enum } from '../index';

const en = m_.enum;

describe(`enum sub-module`, function() {
    it(`exists`, function() {
        expect(Enum).to.exist;
    });
});
