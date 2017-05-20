/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, date } from '../index';

const dateFns = m_.date;

describe(`date sub-module`, function() {
    it(`exists`, function() {
        expect(date).to.exist;
    });
});
