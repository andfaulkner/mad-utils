/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, middleware } from '../../index';

const mw = m_.middleware;

describe(`middleware sub-module`, function() {
    it(`exists`, function() {
        expect(middleware).to.exist;
    });
});
