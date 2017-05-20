/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, types } from '../index';

const typings = m_.types;

describe(`types sub-module`, function() {
    it(`exists`, function() {
        expect(types).to.exist;
    });
});
