/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import {
    canadianProvinces,
    canadianProvincesOrNone,
    sexes,
    sexesWithOther,
    gender,
    genderFull,
} from '../../shared';

/********************************************* TESTS **********************************************/
describe(`Generic data tests`, function() {
    describe(`Canadian provinces`, function() {
        expectNonEmptyObjectExists(canadianProvinces, 'Canadian provinces object exists');
        expectNonEmptyObjectExists(
            canadianProvincesOrNone,
            'Canadian provinces object with none included exists'
        );

        it(`canadianProvinces is deep frozen`, function() {
            expect(canadianProvinces).to.be.frozen;
        });

        it(`canadianProvincesOrNone is deep frozen`, function() {
            expect(canadianProvincesOrNone).to.be.frozen;
        });
    });

    describe(`Sex/Gender`, function() {
        expectNonEmptyObjectExists(sexes, 'Basic sexes object exists');
        expectNonEmptyObjectExists(sexesWithOther, 'Basic sexes object w "other" included exists');
        expectNonEmptyObjectExists(
            gender,
            'Basic gender object (identical to sexesWithOther) exists'
        );
        expectNonEmptyObjectExists(
            genderFull,
            'Extensive gender object (with piles of "experimental" & less common genders) exists'
        );

        it(`sexes is deep frozen`, function() {
            expect(sexes).to.be.frozen;
        });

        it(`sexesWithOther is deep frozen`, function() {
            expect(sexesWithOther).to.be.frozen;
        });

        it(`gender is deep frozen`, function() {
            expect(gender).to.be.frozen;
        });

        it(`genderFull is deep frozen`, function() {
            expect(genderFull).to.be.frozen;
        });
    });
});
