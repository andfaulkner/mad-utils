/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ERROR MODULE FOR TESTING *********************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists, expectFunctionExists} from '../../src/node/test';

import {m_, validation} from '../../shared';
import {validation as validationFromNode} from '../../node';
import {validation as validationFromBrowser} from '../../browser';
import * as validationModule from '../../src/validation';
import {validateCanadaPostalCode} from '../../src/validation';

/********************************************* TESTS **********************************************/
describe(`validation sub-module`, function() {
    expectNonEmptyObjectExists(validation, 'validation (from shared/base export)');
    expectNonEmptyObjectExists(m_.validation, 'validation (from m_ top-level namespace)');
    expectNonEmptyObjectExists(validationModule, 'validation (import all from validation.ts file)');
    expectNonEmptyObjectExists(validationFromNode, 'validation (from Node export)');
    expectNonEmptyObjectExists(validationFromBrowser, 'validation (from Browser export)');
    describe(`validateCanadaPostalCode`, function() {
        it(`Returns true given Canadian postal codes in lowercase with no spaces`, function() {
            expect(validateCanadaPostalCode(`k3k2k2`)).to.equal(true);
            expect(validateCanadaPostalCode(`m2m1k2`)).to.equal(true);
        });
        it(`Returns true given Canadian postal codes in uppercase with no spaces`, function() {
            expect(validateCanadaPostalCode(`M6N9W2`)).to.equal(true);
            expect(validateCanadaPostalCode(`O2P4N8`)).to.equal(true);
        });
        it(`Returns true given Canadian postal codes in uppercase with spaces`, function() {
            expect(validateCanadaPostalCode(`L7V 5E2`)).to.equal(true);
            expect(validateCanadaPostalCode(`O9O 7V6`)).to.equal(true);
        });
        it(`Returns true given Canadian postal codes in lowercase with spaces`, function() {
            expect(validateCanadaPostalCode(`j8t 7r3`)).to.equal(true);
            expect(validateCanadaPostalCode(`w4q 6a6`)).to.equal(true);
        });
    });
});
