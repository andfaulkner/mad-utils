/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import { expect } from 'chai';
import { expectNonEmptyObjectExists, expectFunctionExists } from '../../src/node/test';

import { m_, validation, isValidString } from '../../shared';
import { validation as validationFromNode } from '../../node';
import { validation as validationFromBrowser } from '../../browser';
import * as validationModule from '../../src/validation';

const err = m_.validation;


/********************************************* TESTS **********************************************/
describe(`validation sub-module`, function() {
    expectNonEmptyObjectExists(validation, 'validation (from shared/base export)');
    expectNonEmptyObjectExists(m_.validation, 'validation (from m_ top-level namespace)');
    expectNonEmptyObjectExists(validationModule, 'validation (import all from validation.ts file)');
    expectNonEmptyObjectExists(validationFromNode, 'validation (from Node export)');
    expectNonEmptyObjectExists(validationFromBrowser, 'validation (from Browser export)');

    describe(`validation.isValidString:`, function () {
        expectFunctionExists(isValidString);
        it(`should not throw if given a valid string`, function() {
            expect(isValidStringTestConditions('okok')).to.be.true;
            expect(isValidStringTestConditions('ooo')).to.be.true;
            expect(isValidStringTestConditions('oooooooooo')).to.be.true;
        });
        it(`should return false if given a string missing a required value`, function() {
            expect(isValidStringTestConditions('asdfasdf'), `At least one 'o' is required`)
                .to.be.false;
        });
        it(`should return false if given a string that's too short`, function() {
            expect(isValidStringTestConditions('o'), `String is too short`).to.be.false;
        });

        it(`should return false if given a string that's too long`, function() {
            expect(isValidStringTestConditions('giorshgiuehgega'), `String is too long`).to.be.false;
        });

        it(`should return false if given a string with a disallowed match`, function() {
            expect(isValidStringTestConditions(' oofewof '), `No whitespace allowed`).to.be.false;
        });
    });
});

/**
 *
 */
function isValidStringTestConditions(testStr: string, confirmStr?: string): boolean | never {
    return isValidString({
        testStr,
        conditions: [
            {type: 'match',    matcher: /o/g, errMsg: `text.input_doesnt_match`},
            {type: 'no_match', matcher: / /g, errMsg: `text.no_whitespace`     },
            {type: 'max',      matcher: 10,   errMsg: `text.input_too_long`    },
            {type: 'min',      matcher: 3,    errMsg: `text.input_too_short`   },
        ],
        errDisplayCb: (err: Error) => console.log(err)
    });
}
