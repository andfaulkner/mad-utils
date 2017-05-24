/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';
import { expectFunctionExists } from '../../src/node/test';


/******************************* IMPORT TYPES MODULES FOR TESTING *********************************/
import { m_, types as typesIso } from '../../shared';
import { types as typesNode } from '../../node';
import { types as typesBrowser } from '../../browser';


/********************************************* TESTS **********************************************/
describe(`types sub-modules`, function() {
    describe(`types-iso sub-module`, function() {
        it(`exists`, function() {
            expect(typesIso).to.exist;
        });
        describe(`isInt function`, function() {
            expectFunctionExists(typesIso.isInt);
            it(`returns true given an integer`, function() {
                expect(typesIso.isInt(10)).to.be.true;
                expect(typesIso.isInt(-100)).to.be.true;
                expect(typesIso.isInt(0)).to.be.true;
            });
            it(`returns true given a non-integer`, function() {
                expect(typesIso.isInt(10.2)).to.be.false;
                expect(typesIso.isInt('gr')).to.be.false;
                expect(typesIso.isInt({})).to.be.false;
                expect(typesIso.isInt(false)).to.be.false;
                expect(typesIso.isInt(true)).to.be.false;
                expect(typesIso.isInt(null)).to.be.false;
                expect(typesIso.isInt([])).to.be.false;
                expect(typesIso.isInt(() => 23)).to.be.false;
            });
        });

        describe(`isNumberLike function`, function() {
            expectFunctionExists(typesIso.isNumberLike);
            it(`returns true given a number`, function() {
                expect(typesIso.isNumberLike(0)).to.be.true;
                expect(typesIso.isNumberLike(1)).to.be.true;
                expect(typesIso.isNumberLike(-1)).to.be.true;
                expect(typesIso.isNumberLike(24)).to.be.true;
                expect(typesIso.isNumberLike(12.32)).to.be.true;
                expect(typesIso.isNumberLike(-1001.32)).to.be.true;
            });
            it(`returns true given a string that can parse into a number`, function() {
                expect(typesIso.isNumberLike('0')).to.be.true;
                expect(typesIso.isNumberLike('1')).to.be.true;
                expect(typesIso.isNumberLike('-1')).to.be.true;
                expect(typesIso.isNumberLike('24')).to.be.true;
                expect(typesIso.isNumberLike('12.32')).to.be.true;
                expect(typesIso.isNumberLike('-1001.32')).to.be.true;
                expect(typesIso.isNumberLike('.32')).to.be.true;
                expect(typesIso.isNumberLike('-.32')).to.be.true;
            });
            it(`returns false given a string that can't parse into a number or other type of non-number (including NaN)`, function() {
                expect(typesIso.isNumberLike({})).to.be.false;
                expect(typesIso.isNumberLike([])).to.be.false;
                expect(typesIso.isNumberLike(false)).to.be.false;
                expect(typesIso.isNumberLike(true)).to.be.false;
                expect(typesIso.isNumberLike('')).to.be.false;
                expect(typesIso.isNumberLike('gr argh')).to.be.false;
                expect(typesIso.isNumberLike(null)).to.be.false;
                expect(typesIso.isNumberLike(Object)).to.be.false;
                expect(typesIso.isNumberLike(typesIso.isNumberLike)).to.be.false;
                expect(typesIso.isNumberLike(NaN)).to.be.false;
                expect(typesIso.isNumberLike('123_a.453')).to.be.false;
                expect(typesIso.isNumberLike('123..453')).to.be.false;
                expect(typesIso.isNumberLike('123.453.123')).to.be.false;
                expect(typesIso.isNumberLike('.')).to.be.false;
                expect(typesIso.isNumberLike('-.')).to.be.false;
                expect(typesIso.isNumberLike('-.123.2')).to.be.false;
            });
        });

    });

    describe(`types-browser sub-module`, function() {
        it(`exists`, function() {
            expect(typesBrowser).to.exist;
        });
    });
    describe(`types-node sub-module`, function() {
        it(`exists`, function() {
            expect(typesNode).to.exist;
        });
    });
});
