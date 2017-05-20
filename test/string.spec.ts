/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, string } from '../index';

const str = m_.string;

describe(`string sub-module`, function() {
    it(`exists`, function() {
        expect(string).to.exist;
    });
});
