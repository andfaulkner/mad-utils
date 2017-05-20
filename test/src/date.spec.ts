/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/********************************* IMPORT DATE MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, date } from '../../shared';

const dateFns = m_.date;


/********************************************* TESTS **********************************************/
describe(`date sub-module`, function() {
    it(`exists`, function() {
        expect(date).to.exist;
    });
});
