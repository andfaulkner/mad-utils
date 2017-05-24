/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';
import { expectFunctionExists } from '../../src/node/test';
import * as moment from 'moment';


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

        describe(`isNonexistentOrString function`, function() {
            expectFunctionExists(typesIso.isNonexistentOrString);

            it(`returns true for undefined or null`, function() {
                expect(typesIso.isNonexistentOrString(null)).to.equal(true);
                expect(typesIso.isNonexistentOrString(undefined)).to.equal(true);
                expect((typesIso.isNonexistentOrString as any)()).to.equal(true);
            });
            it(`returns true for string`, function() {
                expect(typesIso.isNonexistentOrString('')).to.equal(true);
                expect(typesIso.isNonexistentOrString('asdf')).to.equal(true);
                expect(typesIso.isNonexistentOrString(' ')).to.equal(true);
                expect(typesIso.isNonexistentOrString('  asdfasdf  ')).to.equal(true);
                expect(typesIso.isNonexistentOrString('  123  ')).to.equal(true);
                expect(typesIso.isNonexistentOrString('123')).to.equal(true);
                expect(typesIso.isNonexistentOrString('true')).to.equal(true);
                expect(typesIso.isNonexistentOrString('null')).to.equal(true);
                expect(typesIso.isNonexistentOrString('undefined')).to.equal(true);
                expect(typesIso.isNonexistentOrString('0')).to.equal(true);
            });
            it(`returns false for non-string, non-null, non-undefined items `, function() {
                expect(typesIso.isNonexistentOrString(123)).to.equal(false);
                expect(typesIso.isNonexistentOrString(false)).to.equal(false);
                expect(typesIso.isNonexistentOrString(true)).to.equal(false);
                expect(typesIso.isNonexistentOrString({})).to.equal(false);
                expect(typesIso.isNonexistentOrString([])).to.equal(false);
                expect(typesIso.isNonexistentOrString(['asdf'])).to.equal(false);
                expect(typesIso.isNonexistentOrString({ 'asdf': 'asdf' })).to.equal(false);
                expect(typesIso.isNonexistentOrString(0)).to.equal(false);
                expect(typesIso.isNonexistentOrString(1)).to.equal(false);
                expect(typesIso.isNonexistentOrString(NaN)).to.equal(false);
                expect(typesIso.isNonexistentOrString(Object)).to.equal(false);
                expect(typesIso.isNonexistentOrString(typesIso.isNonexistentOrString)).to.equal(false);
            });
        });

        describe(`isArray function`, function() {
            expectFunctionExists(typesIso.isArray);

            it(`returns true for arrays`, function() {
                expect(typesIso.isArray([])).to.be.true;
                expect(typesIso.isArray(['asdf', '123', null])).to.be.true;
                expect(typesIso.isArray([null])).to.be.true;
                expect(typesIso.isArray(new Array())).to.be.true;
                class ArrayExtender extends Array {};
                expect(typesIso.isArray(new ArrayExtender())).to.be.true;
            });
            it(`returns false for non-arrays`, function() {
                expect(typesIso.isArray(null)).to.be.false;
                expect(typesIso.isArray(0)).to.be.false;
                expect(typesIso.isArray(1)).to.be.false;
                expect(typesIso.isArray({})).to.be.false;
                expect(typesIso.isArray({ asdf: [] })).to.be.false;
                expect(typesIso.isArray('123123')).to.be.false;
                expect(typesIso.isArray('[]')).to.be.false;
                expect(typesIso.isArray('sasffwe')).to.be.false;
                expect(typesIso.isArray(Object)).to.be.false;
                expect(typesIso.isArray(Array)).to.be.false;
                expect(typesIso.isArray(undefined)).to.be.false;
                expect(typesIso.isArray(-123)).to.be.false;
                expect(typesIso.isArray('')).to.be.false;
                expect(typesIso.isArray(true)).to.be.false;
                expect(typesIso.isArray(false)).to.be.false;
                expect(typesIso.isArray(typesIso.isArray)).to.be.false;
            });
        });

        describe(`isDateLike function`, function() {
            expectFunctionExists(typesIso.isDateLike);
            it(`should return true for dates & moment objects`, function() {
                expect(typesIso.isDateLike(new Date())).to.be.true;
                expect(typesIso.isDateLike(moment())).to.be.true;
                expect(typesIso.isDateLike(moment(new Date()))).to.be.true;
            });
            it(`should return true for anything moment considers valid besides negative numbers`, function() {
                expect(typesIso.isDateLike('1234-12-23')).to.be.true;
                expect(typesIso.isDateLike('1234')).to.be.true;
                expect(typesIso.isDateLike(1234)).to.be.true;
                expect(typesIso.isDateLike('1231235')).to.be.true;
                expect(typesIso.isDateLike('1231/10/23:12:12:12')).to.be.true;
                expect(typesIso.isDateLike('1231-10-23:12:12:12')).to.be.true;
                expect(typesIso.isDateLike(123134)).to.be.true;
                expect(typesIso.isDateLike(0)).to.be.true;
                expect(typesIso.isDateLike('0')).to.be.true;
                expect(typesIso.isDateLike({})).to.be.true;
                expect(typesIso.isDateLike([])).to.be.true;
                expect(typesIso.isDateLike({ months: 10 })).to.be.true;
                expect(typesIso.isDateLike({ month: 10 })).to.be.true;
                expect(typesIso.isDateLike({ years: 10 })).to.be.true;
                expect(typesIso.isDateLike({ year: 2015 })).to.be.true;
                expect(typesIso.isDateLike({ date: 24 })).to.be.true;
                expect(typesIso.isDateLike({ dates: 22 })).to.be.true;
                expect(typesIso.isDateLike({ day: 21 })).to.be.true;
                expect(typesIso.isDateLike({ days: 20 })).to.be.true;
                expect(typesIso.isDateLike({ millisecond: 900 })).to.be.true;
                expect(typesIso.isDateLike({ seconds: 56 })).to.be.true;
            });
            it(`should return false for negative numbers, anything moment considers invalid, & ` +
               `nonsensical objects`, function()
            {
                expect(typesIso.isDateLike('-1234')).to.be.false;
                expect(typesIso.isDateLike(-1234)).to.be.false;
                expect(typesIso.isDateLike(NaN)).to.be.false;
                expect(typesIso.isDateLike(['asdf'])).to.be.false;
                expect(typesIso.isDateLike([''])).to.be.false;
                expect(typesIso.isDateLike({ oko: 123 })).to.be.false;
                expect(typesIso.isDateLike({ oko: 123, date: 10 })).to.be.false;
                expect(typesIso.isDateLike('12312354')).to.be.false;
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
