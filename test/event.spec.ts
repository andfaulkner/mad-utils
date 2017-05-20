/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, event } from '../index';

const ev = m_.event;

describe(`event sub-module`, function() {
    it(`exists`, function() {
        expect(event).to.exist;
    });
});
