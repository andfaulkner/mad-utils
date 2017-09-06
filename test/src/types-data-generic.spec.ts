/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import { canadianProvinces, canadianProvincesOrNone,
         sexes, sexesWithOther, gender, genderFull } from '../../shared';

/********************************************* TESTS **********************************************/
describe(`Generic data tests`, function() {
    describe(`Canadian provinces`, function() {
        expectNonEmptyObjectExists(canadianProvinces, 'Canadian provinces object exists');
        expectNonEmptyObjectExists(canadianProvincesOrNone, 'Canadian provinces object with none included exists');

        it(`canadianProvinces is deep frozen`, function() {
            expect(canadianProvinces).to.be.frozen;
        });
        it(`canadianProvincesOrNone is deep frozen`, function() {
            expect(canadianProvincesOrNone).to.be.frozen;
        });
    });
});
