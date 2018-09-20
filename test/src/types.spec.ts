/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import {expect} from 'chai';
import {expectFunctionExists, expectNonEmptyObjectExists} from '../../src/node/test';
import * as moment from 'moment';
import * as _ from 'lodash';

/******************************* IMPORT TYPES MODULES FOR TESTING *********************************/
import {m_, types as typesIso, types, isBoolean, isString, isUndefined} from '../../shared';
import {types as typesNode} from '../../node';
import {types as typesBrowser} from '../../browser';
import * as typesModule from '../../src/types-iso';

const {boolStringToBool} = typesModule;

/* Sample data */
const ints = [10, -100, 0, 1, -1, 83294, -212];
// prettier-ignore
const intsWDots = [10., -100.0, 0.00, 1.00000000000000000000000000000, -1., -323432., 0., -0.];
// prettier-ignore
const nonIntNums = [10.2, 0.919232, 0.000000001, -0.001, 383.145, -123.42, 10.00000000001, -.3, .6];

/********************************************* TESTS **********************************************/
describe(`types sub-modules`, function() {
    describe(`types-iso sub-module`, function() {
        expectNonEmptyObjectExists(typesIso, 'types (from shared/base export)');
        expectNonEmptyObjectExists(m_.types, 'types (from m_ top-level namespace)');
        expectNonEmptyObjectExists(typesModule, 'types (import all from types.ts file)');

        describe(`isUndefined function`, function() {
            it(`returns false given null`, function() {
                expect(typesIso.isUndefined(null)).to.equal(false);
            });
            it(`returns true given undefined`, function() {
                expect(typesIso.isUndefined(undefined)).to.equal(true);
                expect((typesIso.isUndefined as any)()).to.equal(true);
            });
            it(`returns false given falsy values besides undefined`, function() {
                expect(typesIso.isUndefined(0)).to.equal(false);
                expect(typesIso.isUndefined(``)).to.equal(false);
                expect(typesIso.isUndefined(NaN)).to.equal(false);
                expect(typesIso.isUndefined(false)).to.equal(false);
            });
            it(`returns false given any "truthy" value`, function() {
                expect(typesIso.isUndefined(`undefined`)).to.equal(false);
                expect(typesIso.isUndefined(`null`)).to.equal(false);
                expect(typesIso.isUndefined(1)).to.equal(false);
                expect(typesIso.isUndefined(`OK`)).to.equal(false);
                expect(typesIso.isUndefined(Infinity)).to.equal(false);
                expect(typesIso.isUndefined(-1)).to.equal(false);
                expect(typesIso.isUndefined({})).to.equal(false);
                expect(typesIso.isUndefined([])).to.equal(false);
                expect(typesIso.isUndefined([null, undefined])).to.equal(false);
                expect(typesIso.isUndefined({null: null})).to.equal(false);
                expect(typesIso.isUndefined(Object)).to.equal(false);
                expect(typesIso.isUndefined(Object.prototype)).to.equal(false);
                expect(typesIso.isUndefined(0.00001)).to.equal(false);
                expect(typesIso.isUndefined(() => null)).to.equal(false);
                expect(typesIso.isUndefined(() => undefined)).to.equal(false);
                expect(typesIso.isUndefined(class TestClass {})).to.equal(false);
                expect(typesIso.isUndefined(Symbol())).to.equal(false);
                expect(typesIso.isUndefined(Symbol('null'))).to.equal(false);
            });
        });

        describe(`isNullOrUndefined function`, function() {
            it(`returns true given null`, function() {
                expect(typesIso.isNullOrUndefined(null)).to.equal(true);
            });
            it(`returns true given undefined`, function() {
                expect(typesIso.isNullOrUndefined(undefined)).to.equal(true);
                expect((typesIso.isNullOrUndefined as any)()).to.equal(true);
            });
            it(`returns false given falsy values besides null and undefined`, function() {
                expect(typesIso.isNullOrUndefined(0)).to.equal(false);
                expect(typesIso.isNullOrUndefined(``)).to.equal(false);
                expect(typesIso.isNullOrUndefined(NaN)).to.equal(false);
                expect(typesIso.isNullOrUndefined(false)).to.equal(false);
            });
            it(`returns false given any value besides null & undefined`, function() {
                expect(typesIso.isNullOrUndefined(1)).to.equal(false);
                expect(typesIso.isNullOrUndefined(`OK`)).to.equal(false);
                expect(typesIso.isNullOrUndefined(Infinity)).to.equal(false);
                expect(typesIso.isNullOrUndefined(-1)).to.equal(false);
                expect(typesIso.isNullOrUndefined({})).to.equal(false);
                expect(typesIso.isNullOrUndefined([])).to.equal(false);
                expect(typesIso.isNullOrUndefined([null, undefined])).to.equal(false);
                expect(typesIso.isNullOrUndefined({null: null})).to.equal(false);
                expect(typesIso.isNullOrUndefined(Object)).to.equal(false);
                expect(typesIso.isNullOrUndefined(Object.prototype)).to.equal(false);
                expect(typesIso.isNullOrUndefined(0.00001)).to.equal(false);
                expect(typesIso.isNullOrUndefined(() => null)).to.equal(false);
                expect(typesIso.isNullOrUndefined(() => undefined)).to.equal(false);
                expect(typesIso.isNullOrUndefined(class TestClass {})).to.equal(false);
                expect(typesIso.isNullOrUndefined(Symbol())).to.equal(false);
                expect(typesIso.isNullOrUndefined(Symbol('null'))).to.equal(false);
            });
        });

        describe(`isInteger function (and alias isInt)`, function() {
            expectFunctionExists(typesIso.isInt);
            numberDetectorFunctionTests(typesIso.isInteger);
            it(`returns true given a basic integer (with no .0)`, function() {
                ints.forEach(int => expect(typesIso.isInteger(int)).to.be.true);
            });
            it(`returns true given an integer with ., .0, .00..., etc. afterwards`, function() {
                intsWDots.forEach(int => expect(typesIso.isInteger(int)).to.be.true);
            });
            it(`returns false given an integer-like string (that's what isIntegerLike is for)`, function() {
                ints.forEach(int => expect(typesIso.isInteger(`${int}`)).to.be.false);
                intsWDots.forEach(int => expect(typesIso.isInteger(`${int}`)).to.be.false);
            });
            it(`returns false given Infinity or -Infinity`, function() {
                expect(typesIso.isInteger(Infinity)).to.be.false;
                expect(typesIso.isInteger(-Infinity)).to.be.false;
            });
            it(`returns false given a non-integer-like number`, function() {
                nonIntNums.forEach(num => expect(typesIso.isInteger(`${num}`)).to.be.false);
            });
        });

        describe(`isIntegerLike function`, function() {
            expectFunctionExists(typesIso.isIntegerLike);
            expectFunctionExists(typesIso.isIntLike);
            numberDetectorFunctionTests(typesIso.isIntegerLike);
            it(`returns true given an integer`, function() {
                expect(typesIso.isIntegerLike(0)).to.be.true;
                expect(typesIso.isIntegerLike(1)).to.be.true;
                expect(typesIso.isIntegerLike(-1)).to.be.true;
                expect(typesIso.isIntegerLike(24)).to.be.true;
            });
            it(`returns false given number w/ decimal (that isn't at the end or followed by 0s)`, function() {
                expect(typesIso.isIntegerLike(12.32)).to.be.false;
                expect(typesIso.isIntegerLike(-1001.32)).to.be.false;
            });

            it(`returns true given string that parses into an int`, function() {
                ints.forEach(int => expect(typesIso.isIntegerLike(`${int}`)).to.be.true);
            });

            it(`returns true for "integer strings" ending with a dot`, function() {
                expect(typesIso.isIntegerLike('0.')).to.be.true;
                expect(typesIso.isIntegerLike('-0.')).to.be.true;
                expect(typesIso.isIntegerLike('24.')).to.be.true;
                expect(typesIso.isIntegerLike('-24.')).to.be.true;
            });

            it(`returns true for "integer strings" ending with .0, .00, .000, etc`, function() {
                intsWDots.forEach(int => expect(typesIso.isIntegerLike(`${int}`)).to.be.true);
                expect(typesIso.isIntegerLike('123.0')).to.be.true;
                expect(typesIso.isIntegerLike('-123.0')).to.be.true;
                expect(typesIso.isIntegerLike('6.00')).to.be.true;
                expect(typesIso.isIntegerLike('-6.00')).to.be.true;
                expect(typesIso.isIntegerLike('-123.0000000000000000')).to.be.true;
                expect(typesIso.isIntegerLike('123.0000000000000000')).to.be.true;
                expect(typesIso.isIntegerLike('0.00000')).to.be.true;
                expect(typesIso.isIntegerLike('-0.00000')).to.be.true;
            });

            it(`returns false given a string that parses into a float but not an int`, function() {
                nonIntNums.forEach(num => expect(typesIso.isIntegerLike(`${num}`)).to.be.false);
                expect(typesIso.isIntegerLike('12.32')).to.be.false;
                expect(typesIso.isIntegerLike('-1001.32')).to.be.false;
                expect(typesIso.isIntegerLike('.32')).to.be.false;
                expect(typesIso.isIntegerLike('-.32')).to.be.false;
            });
            it(`returns false given a string that can't parse into a valid integer`, function() {
                expect(typesIso.isIntegerLike('123_a.453')).to.be.false;
                expect(typesIso.isIntegerLike('123..453')).to.be.false;
                expect(typesIso.isIntegerLike('123.453.123')).to.be.false;
                expect(typesIso.isIntegerLike('.')).to.be.false;
                expect(typesIso.isIntegerLike('-.')).to.be.false;
                expect(typesIso.isIntegerLike('-.123.2')).to.be.false;
                expect(typesIso.isIntegerLike('-.0.')).to.be.false;
                expect(typesIso.isIntegerLike('..1.0')).to.be.false;
                expect(typesIso.isIntegerLike('.0')).to.be.false;
            });
        });

        describe(`isBoolean function`, function() {
            expectFunctionExists(typesIso.isBoolean);
            expectFunctionExists(typesIso.isBool);
            it(`returns true if given a boolean`, function() {
                expect(isBoolean(true)).to.be.true;
                expect(isBoolean(false)).to.be.true;
            });
            it(`returns true if given a factory-constructed Boolean object`, function() {
                expect(isBoolean(Boolean(false))).to.be.true;
                expect(isBoolean(Boolean(true))).to.be.true;
            });
            it(`returns true if given an instantiated Boolean object`, function() {
                expect(isBoolean(new Boolean(false))).to.be.true;
                expect(isBoolean(new Boolean(true))).to.be.true;
            });
            it(`returns false if given a non-boolean`, function() {
                expect(isBoolean(null)).to.be.false;
                expect(isBoolean(undefined)).to.be.false;
                expect(isBoolean('')).to.be.false;
                expect(isBoolean('asdf')).to.be.false;
                expect(isBoolean(0)).to.be.false;
                expect(isBoolean(1)).to.be.false;
                expect(isBoolean(NaN)).to.be.false;
                expect(isBoolean(() => false)).to.be.false;
                expect(isBoolean(() => true)).to.be.false;
            });
        });

        describe(`isString function`, function() {
            expectFunctionExists(typesIso.isString);
            it(`returns true if given a string - including an empty string`, function() {
                expect(isString('')).to.be.true;
                expect(isString('asdf')).to.be.true;
                expect(isString('1')).to.be.true;
                expect(isString('null')).to.be.true;
                expect(isString('{}')).to.be.true;
            });
            it(`returns true if given a String instance`, function() {
                const str = new String('ok');
                expect(isString(str)).to.be.true;
                expect(isString(new String(''))).to.be.true;
                expect(isString(new String(1))).to.be.true;
                expect(isString(new String(null))).to.be.true;
            });
            it(`returns true if given a String-inheriting object instance`, function() {
                class PrefixedString extends String {}
                expect(isString(new PrefixedString())).to.be.true;
            });
            it(`returns false if given a val that isn't a string or String instance`, function() {
                expect(isString(null)).to.be.false;
                expect(isString(undefined)).to.be.false;
                expect((isString as any)()).to.be.false;

                expect(isString(0)).to.be.false;
                expect(isString(1)).to.be.false;
                expect(isString(-1)).to.be.false;
                expect(isString(222)).to.be.false;
                expect(isString(-222)).to.be.false;
                expect(isString(NaN)).to.be.false;

                expect(isString(Symbol())).to.be.false;

                expect(isString({})).to.be.false;
                expect(isString({str: 'string'})).to.be.false;
                expect(isString({toString: () => true})).to.be.false;

                expect(isString(isString)).to.be.false;
                expect(isString(() => 'asdf')).to.be.false;
                expect(isString(String)).to.be.false;

                expect(isString(new Map())).to.be.false;
                expect(isString(new Set())).to.be.false;
            });
        });
        describe(`isNumberLike function`, function() {
            expectFunctionExists(typesIso.isNumberLike);
            expectFunctionExists(typesIso.isNumLike);
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
            it(`returns false given a string that can't parse into a number, or given any other type of non-number (including NaN)`, function() {
                expect(typesIso.isNumberLike({})).to.be.false;
                expect(typesIso.isNumberLike([])).to.be.false;
                expect(typesIso.isNumberLike(false)).to.be.false;
                expect(typesIso.isNumberLike(true)).to.be.false;
                expect(typesIso.isNumberLike('')).to.be.false;
                expect(typesIso.isNumberLike('gr argh')).to.be.false;
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
            it(`returns false if given null, undefined, or no value at all`, function() {
                expect(typesIso.isNumberLike(null)).to.be.false;
                expect(typesIso.isNumberLike(undefined)).to.be.false;
                expect((typesIso.isNumberLike as any)()).to.be.false;
            });
            it(`returns false if given array w/ 1 number-like value & no 2nd arg`, function() {
                expect(typesIso.isNumberLike([2])).to.be.false;
                expect(typesIso.isNumberLike([54])).to.be.false;
                expect(typesIso.isNumberLike([54, 89])).to.be.false;
            });
            it(`returns false if given array  w/ 1 number-like value`, function() {
                expect(typesIso.isNumberLike([2])).to.be.false;
                expect(typesIso.isNumberLike([54])).to.be.false;
            });
        });

        describe(`isStringOrNumber function`, function() {
            it(`returns true if given a number`, function() {
                expect(typesIso.isStringOrNumber(5)).to.eql(true);
            });
            it(`returns true if given a string`, function() {
                expect(typesIso.isStringOrNumber('Some string')).to.eql(true);
            });
            it(`returns true if given anything that isn't either a string of a number`, function() {
                expect(typesIso.isStringOrNumber({})).to.eql(false);
                expect(typesIso.isStringOrNumber([])).to.eql(false);
                expect(typesIso.isStringOrNumber(null)).to.eql(false);
                expect(typesIso.isStringOrNumber(undefined)).to.eql(false);
                expect(typesIso.isStringOrNumber(NaN)).to.eql(false);
                expect(typesIso.isStringOrNumber(Array)).to.eql(false);
                expect(typesIso.isStringOrNumber(String)).to.eql(false);
                expect(typesIso.isStringOrNumber(['asdf', 'rbrt'])).to.eql(false);
                expect(typesIso.isStringOrNumber(Object)).to.eql(false);
            });
        });

        describe(`isVoidOrString function`, function() {
            expectFunctionExists(typesIso.isVoidOrString);
            it(`returns true for undefined or null`, function() {
                expect(typesIso.isVoidOrString(null)).to.equal(true);
                expect(typesIso.isVoidOrString(undefined)).to.equal(true);
                expect((typesIso.isVoidOrString as any)()).to.equal(true);
            });
            it(`returns true for string`, function() {
                expect(typesIso.isVoidOrString('')).to.equal(true);
                expect(typesIso.isVoidOrString('asdf')).to.equal(true);
                expect(typesIso.isVoidOrString(' ')).to.equal(true);
                expect(typesIso.isVoidOrString('  asdfasdf  ')).to.equal(true);
                expect(typesIso.isVoidOrString('  123  ')).to.equal(true);
                expect(typesIso.isVoidOrString('123')).to.equal(true);
                expect(typesIso.isVoidOrString('true')).to.equal(true);
                expect(typesIso.isVoidOrString('null')).to.equal(true);
                expect(typesIso.isVoidOrString('undefined')).to.equal(true);
                expect(typesIso.isVoidOrString('0')).to.equal(true);
            });
            it(`returns false for non-string, non-null, non-undefined items `, function() {
                expect(typesIso.isVoidOrString(123)).to.equal(false);
                expect(typesIso.isVoidOrString(false)).to.equal(false);
                expect(typesIso.isVoidOrString(true)).to.equal(false);
                expect(typesIso.isVoidOrString({})).to.equal(false);
                expect(typesIso.isVoidOrString([])).to.equal(false);
                expect(typesIso.isVoidOrString(['asdf'])).to.equal(false);
                expect(typesIso.isVoidOrString({asdf: 'asdf'})).to.equal(false);
                expect(typesIso.isVoidOrString(0)).to.equal(false);
                expect(typesIso.isVoidOrString(1)).to.equal(false);
                expect(typesIso.isVoidOrString(NaN)).to.equal(false);
                expect(typesIso.isVoidOrString(Object)).to.equal(false);
                expect(typesIso.isVoidOrString(typesIso.isVoidOrString)).to.equal(false);
            });
        });

        describe(`isArray function`, function() {
            expectFunctionExists(typesIso.isArray);

            it(`returns true for arrays`, function() {
                expect(typesIso.isArray([])).to.be.true;
                expect(typesIso.isArray(['asdf', '123', null])).to.be.true;
                expect(typesIso.isArray([null])).to.be.true;
                expect(typesIso.isArray(new Array())).to.be.true;
                class ArrayExtender extends Array {}
                expect(typesIso.isArray(new ArrayExtender())).to.be.true;
            });
            it(`returns false for non-arrays`, function() {
                expect(typesIso.isArray(null)).to.be.false;
                expect(typesIso.isArray(0)).to.be.false;
                expect(typesIso.isArray(1)).to.be.false;
                expect(typesIso.isArray({})).to.be.false;
                expect(typesIso.isArray({asdf: []})).to.be.false;
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

        describe(`isTrue function`, function() {
            expectFunctionExists(typesIso.isTrue);
            it(`returns true if given true, 'true', 'TrUe', 'True', 'TRUE', etc., regardless of arg 2's value`, function() {
                expect(typesIso.isTrue(true)).to.be.true;
                expect(typesIso.isTrue('true')).to.be.true;
                expect(typesIso.isTrue('TRUE')).to.be.true;
                expect(typesIso.isTrue('True')).to.be.true;
                expect(typesIso.isTrue(true, true)).to.be.true;
                expect(typesIso.isTrue('true', true)).to.be.true;
                expect(typesIso.isTrue('TRUE', true)).to.be.true;
                expect(typesIso.isTrue('True', true)).to.be.true;
                expect(typesIso.isTrue(true, false)).to.be.true;
                expect(typesIso.isTrue('true', false)).to.be.true;
                expect(typesIso.isTrue('TRUE', false)).to.be.true;
                expect(typesIso.isTrue('TrUe')).to.be.true;
                expect(typesIso.isTrue('True', false)).to.be.true;
            });
            it(`if arg 2 false, returns false for all vals except variants of true e.g. 'true', 'True', 'TRUE'`, function() {
                expect(typesIso.isTrue(null)).to.be.false;
                expect(typesIso.isTrue(false)).to.be.false;
                expect(typesIso.isTrue('asdfoigeiubaer')).to.be.false;
                expect(typesIso.isTrue('')).to.be.false;
                expect(typesIso.isTrue(undefined)).to.be.false;
                expect((typesIso.isTrue as any)()).to.be.false;
                expect(typesIso.isTrue({})).to.be.false;
                expect(typesIso.isTrue([])).to.be.false;
                expect(typesIso.isTrue([true, true])).to.be.false;
                expect(typesIso.isTrue({true: true})).to.be.false;
                expect(typesIso.isTrue(1)).to.be.false;
                expect(typesIso.isTrue(0)).to.be.false;
                expect(typesIso.isTrue(123456)).to.be.false;
                expect(typesIso.isTrue(NaN)).to.be.false;
                expect(typesIso.isTrue(Array)).to.be.false;
                expect(typesIso.isTrue(Object)).to.be.false;
            });
            it(`if arg 2 true, returns true for 't' and 'T'`, function() {
                expect(typesIso.isTrue('t', true)).to.be.true;
                expect(typesIso.isTrue('T', true)).to.be.true;
            });
            it(`if arg 2 false or not defined, returns false for 't' and 'T'`, function() {
                expect(typesIso.isTrue('t', false)).to.be.false;
                expect(typesIso.isTrue('T', false)).to.be.false;
                expect(typesIso.isTrue('t')).to.be.false;
                expect(typesIso.isTrue('T')).to.be.false;
            });
        });

        describe(`isFalse function`, function() {
            expectFunctionExists(typesIso.isFalse);
            it(`returns true if given false (with any casing), regardless of arg 2's value`, function() {
                expect(typesIso.isFalse(false)).to.be.true;
                expect(typesIso.isFalse('false')).to.be.true;
                expect(typesIso.isFalse('FALSE')).to.be.true;
                expect(typesIso.isFalse('False')).to.be.true;
                expect(typesIso.isFalse(false, false)).to.be.true;
                expect(typesIso.isFalse('false', false)).to.be.true;
                expect(typesIso.isFalse('FALSE', false)).to.be.true;
                expect(typesIso.isFalse('False', false)).to.be.true;
                expect(typesIso.isFalse(false, true)).to.be.true;
                expect(typesIso.isFalse('false', true)).to.be.true;
                expect(typesIso.isFalse('FALSE', true)).to.be.true;
                expect(typesIso.isFalse('False', true)).to.be.true;
                expect(typesIso.isFalse('FaLsE')).to.be.true;
            });
            it(`if arg 2 false, returns false for all vals except 'false' (w/ any case e.g. 'FaLSe' OK)`, function() {
                expect(typesIso.isFalse(null)).to.be.false;
                expect(typesIso.isFalse(true)).to.be.false;
                expect(typesIso.isFalse('asdfoigeiubaer')).to.be.false;
                expect(typesIso.isFalse('')).to.be.false;
                expect(typesIso.isFalse(undefined)).to.be.false;
                expect((typesIso.isFalse as any)()).to.be.false;
                expect(typesIso.isFalse({})).to.be.false;
                expect(typesIso.isFalse([])).to.be.false;
                expect(typesIso.isFalse([false, false])).to.be.false;
                expect(typesIso.isFalse({false: false})).to.be.false;
                expect(typesIso.isFalse(1)).to.be.false;
                expect(typesIso.isFalse(0)).to.be.false;
                expect(typesIso.isFalse(123456)).to.be.false;
                expect(typesIso.isFalse(NaN)).to.be.false;
                expect(typesIso.isFalse(Array)).to.be.false;
                expect(typesIso.isFalse(Object)).to.be.false;
            });
            it(`if arg 2 true, returns true for 'f' and 'F'`, function() {
                expect(typesIso.isFalse('f', true)).to.be.true;
                expect(typesIso.isFalse('F', true)).to.be.true;
            });
            it(`if arg 2 false or not defined, returns false for 'f' and 'F'`, function() {
                expect(typesIso.isFalse('f', false)).to.be.false;
                expect(typesIso.isFalse('F', false)).to.be.false;
                expect(typesIso.isFalse('f')).to.be.false;
                expect(typesIso.isFalse('F')).to.be.false;
            });
        });

        describe(`isFunction function`, function() {
            expectFunctionExists(typesIso.isFunction);
            it(`returns true if given an arrow function`, function() {
                expect(typesIso.isFunction(() => '')).to.be.true;
                expect(typesIso.isFunction(() => true)).to.be.true;
                expect(typesIso.isFunction(() => null)).to.be.true;
                expect(typesIso.isFunction((arg1, arg2) => arg1 + arg2)).to.be.true;
            });
            it(`returns true if given a classic ES5 (and under) lambda function`, function() {
                expect(
                    typesIso.isFunction(function() {
                        return 'ok';
                    })
                ).to.be.true;
                expect(
                    typesIso.isFunction(function() {
                        return false;
                    })
                ).to.be.true;
                expect(typesIso.isFunction(function() {})).to.be.true;
                expect(typesIso.isFunction(function(arg1, arg2) {})).to.be.true;
                expect(
                    typesIso.isFunction(function(arg1, arg2) {
                        return arg1 + arg2;
                    })
                ).to.be.true;
            });
            it(`returns true if given a named classic ES5 (and under) function`, function() {
                expect(
                    typesIso.isFunction(function testFunc1() {
                        return 'ok';
                    })
                ).to.be.true;
                expect(
                    typesIso.isFunction(function testFunc2() {
                        return false;
                    })
                ).to.be.true;
                expect(typesIso.isFunction(function testFunc3() {})).to.be.true;
                expect(typesIso.isFunction(function testFunc4(arg1, arg2) {})).to.be.true;
                expect(
                    typesIso.isFunction(function testFunc5(arg1, arg2) {
                        return arg1 + arg2;
                    })
                ).to.be.true;
            });
            it(`returns false if given a RegExp`, function() {
                expect(typesIso.isFunction(/asdf/g)).to.be.false;
                expect(typesIso.isFunction(new RegExp('asdf'))).to.be.false;
            });
            it(`returns false if given a symbol`, function() {
                expect(typesIso.isFunction(Symbol())).to.be.false;
                expect(typesIso.isFunction(Symbol('okokok'))).to.be.false;
                expect(typesIso.isFunction(Symbol.for('asdf'))).to.be.false;
            });
            it(`returns false if given undefined or null`, function() {
                expect(typesIso.isFunction(null)).to.be.false;
                expect(typesIso.isFunction(undefined)).to.be.false;
                expect((typesIso.isFunction as any)()).to.be.false;
            });
            it(`returns false if given a string, boolean, NaN, or number`, function() {
                expect(typesIso.isFunction('')).to.be.false;
                expect(typesIso.isFunction('asdf')).to.be.false;
                expect(typesIso.isFunction(false)).to.be.false;
                expect(typesIso.isFunction(true)).to.be.false;
                expect(typesIso.isFunction(NaN)).to.be.false;
                expect(typesIso.isFunction(0)).to.be.false;
                expect(typesIso.isFunction(1)).to.be.false;
                expect(typesIso.isFunction(21398123)).to.be.false;
                expect(typesIso.isFunction(-1)).to.be.false;
            });
            it(`returns false if given an object or array`, function() {
                expect(typesIso.isFunction({})).to.be.false;
                expect(typesIso.isFunction([])).to.be.false;
                expect(typesIso.isFunction({a: 1, b: 'two'})).to.be.false;
                expect(typesIso.isFunction(['a', 'b'])).to.be.false;
                expect(typesIso.isFunction([0])).to.be.false;
                expect(typesIso.isFunction([() => null])).to.be.false;
                expect(typesIso.isFunction([() => 'out', arg1 => 999])).to.be.false;
            });
            it(`returns true if given a function with an object merged in`, function() {
                expect(
                    typesIso.isFunction(
                        Object.assign(
                            function testFunc() {
                                return 'result';
                            },
                            {a: 1, b: 2}
                        )
                    )
                ).to.be.true;
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
                expect(typesIso.isDateLike({months: 10})).to.be.true;
                expect(typesIso.isDateLike({month: 10})).to.be.true;
                expect(typesIso.isDateLike({years: 10})).to.be.true;
                expect(typesIso.isDateLike({year: 2015})).to.be.true;
                expect(typesIso.isDateLike({date: 24})).to.be.true;
                expect(typesIso.isDateLike({dates: 22})).to.be.true;
                expect(typesIso.isDateLike({day: 21})).to.be.true;
                expect(typesIso.isDateLike({days: 20})).to.be.true;
                expect(typesIso.isDateLike({millisecond: 900})).to.be.true;
                expect(typesIso.isDateLike({seconds: 56})).to.be.true;
            });
            it(
                `should return false for negative numbers, anything moment considers invalid, & ` +
                    `nonsensical objects`,
                function() {
                    expect(typesIso.isDateLike('-1234')).to.be.false;
                    expect(typesIso.isDateLike(-1234)).to.be.false;
                    expect(typesIso.isDateLike(NaN)).to.be.false;
                    expect(typesIso.isDateLike(['asdf'])).to.be.false;
                    expect(typesIso.isDateLike([''])).to.be.false;
                    expect(typesIso.isDateLike({oko: 123})).to.be.false;
                    expect(typesIso.isDateLike({oko: 123, date: 10})).to.be.false;
                    expect(typesIso.isDateLike('12312354')).to.be.false;
                }
            );
        });

        describe(`@singleton decorator`, function() {
            // Mock singleton class
            @typesIso.singleton
            class SingletonObject {
                someString: string;
                constructor(someString) {
                    this.someString = someString;
                }
            }

            // Mock non-singleton class
            class NonSingletonObject {
                someString: string;
                constructor(someString) {
                    this.someString = someString;
                }
            }
            // Instance of singleton class.
            let singletonObject: SingletonObject;

            before(function() {
                singletonObject = new SingletonObject('my string argument');
            });

            expectFunctionExists(typesIso.singleton);

            it(`can be applied to a class`, function() {
                expect(SingletonObject).to.exist;
                expect(singletonObject).to.exist;
                expect(singletonObject).to.be.instanceof(SingletonObject);
                expect(singletonObject.someString).to.eql('my string argument');
            });
            it(
                `ensures re-instantiating a class it's applied to for a second time results in ` +
                    `returning the original object`,
                function() {
                    const newInstance = new SingletonObject('another string');
                    expect(newInstance.someString).to.eql('my string argument');
                    expect(newInstance.someString).to.eql(singletonObject.someString);
                    expect(newInstance).to.eql(singletonObject);
                }
            );
            it(`has no effect on classes it's not applied to`, function() {
                const nonSingletonInstance = new NonSingletonObject('string one');
                const nonSingletonInstance2 = new NonSingletonObject('string two');
                expect(nonSingletonInstance.someString).to.eql('string one');
                expect(nonSingletonInstance2.someString).to.eql('string two');
            });
        });
    });

    describe(`isAlphabeticChar`, function() {
        it(`Returns true given any (single-length) alphabetic character`, function() {
            expect(typesIso.isAlphabeticChar('a')).to.eql(true);
            expect(typesIso.isAlphabeticChar('F')).to.eql(true);
            expect(typesIso.isAlphabeticChar('Z')).to.eql(true);
        });
        it(`Returns false given empty string`, function() {
            expect(typesIso.isAlphabeticChar('')).to.eql(false);
        });
        it(`Returns false given any alphabetic string longer than 1 character`, function() {
            expect(typesIso.isAlphabeticChar('ay')).to.eql(false);
            expect(typesIso.isAlphabeticChar('FE')).to.eql(false);
            expect(typesIso.isAlphabeticChar('Zh')).to.eql(false);
        });
        it(`Returns false given non-alphabetic character`, function() {
            expect(typesIso.isAlphabeticChar('1')).to.eql(false);
            expect(typesIso.isAlphabeticChar('&')).to.eql(false);
            expect(typesIso.isAlphabeticChar('<')).to.eql(false);
        });
        it(`Returns false given non-string values`, function() {
            expect(typesIso.isAlphabeticChar(null)).to.eql(false);
            expect(typesIso.isAlphabeticChar(undefined)).to.eql(false);
            expect(typesIso.isAlphabeticChar(-Infinity)).to.eql(false);
            expect(typesIso.isAlphabeticChar(-1)).to.eql(false);
            expect(typesIso.isAlphabeticChar(0)).to.eql(false);
            expect(typesIso.isAlphabeticChar(1)).to.eql(false);
            expect(typesIso.isAlphabeticChar(Infinity)).to.eql(false);
            expect(typesIso.isAlphabeticChar(NaN)).to.eql(false);
            expect(typesIso.isAlphabeticChar(String)).to.eql(false);
            expect(typesIso.isAlphabeticChar(Function.prototype)).to.eql(false);
            expect(typesIso.isAlphabeticChar(Object.prototype)).to.eql(false);
            expect(typesIso.isAlphabeticChar(() => '')).to.eql(false);
            expect(typesIso.isAlphabeticChar(function f() {})).to.eql(false);
            expect(typesIso.isAlphabeticChar({})).to.eql(false);
            expect(typesIso.isAlphabeticChar({a: 1})).to.eql(false);
            expect(typesIso.isAlphabeticChar([])).to.eql(false);
            expect(typesIso.isAlphabeticChar(['a', 999])).to.eql(false);
            expect(typesIso.isAlphabeticChar([null])).to.eql(false);
            expect(typesIso.isAlphabeticChar(true)).to.eql(false);
            expect(typesIso.isAlphabeticChar(false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(Symbol())).to.eql(false);
            expect(typesIso.isAlphabeticChar(Symbol('Q'))).to.eql(false);
        });
        it(`By default returns true given accented characters / diacritics`, function() {
            expect(typesIso.isAlphabeticChar(`à`)).to.eql(true);
            expect(typesIso.isAlphabeticChar(`ç`)).to.eql(true);
            expect(typesIso.isAlphabeticChar(`ë`)).to.eql(true);
            expect(typesIso.isAlphabeticChar(`ħ`)).to.eql(true);
            expect(typesIso.isAlphabeticChar(`Ï`)).to.eql(true);
            expect(typesIso.isAlphabeticChar(`Û`)).to.eql(true);
            expect(typesIso.isAlphabeticChar(`Ž`)).to.eql(true);
        });
        it(`If 2nd arg is false, returns false given accented characters / diacritics`, function() {
            expect(typesIso.isAlphabeticChar(`à`, false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(`ç`, false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(`ë`, false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(`ħ`, false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(`Ï`, false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(`Û`, false)).to.eql(false);
            expect(typesIso.isAlphabeticChar(`Ž`, false)).to.eql(false);
        });
    });

    describe(`isNumber`, function() {
        class NewNumber extends Number {}

        before(function() {
            Reflect.defineProperty(NewNumber.prototype, 'subtract', {
                value: function subtract(numToSubtract: number | Number): Number {
                    return new Number(Number(this) - (numToSubtract as any));
                },
            });
        });

        it(`return true given a number`, function() {
            expect(typesIso.isNumber(0)).to.equal(true);
            expect(typesIso.isNumber(1)).to.equal(true);
            expect(typesIso.isNumber(-100)).to.equal(true);
            expect(typesIso.isNumber(100)).to.equal(true);
            expect(typesIso.isNumber(27.283)).to.equal(true);
            expect(typesIso.isNumber(-27.283)).to.equal(true);
        });
        it(`returns true given Infinity`, function() {
            expect(typesIso.isNumber(Infinity)).to.equal(true);
            expect(typesIso.isNumber(-Infinity)).to.equal(true);
        });
        it(`returns false given NaN`, function() {
            expect(typesIso.isNumber(NaN)).to.equal(false);
        });
        it(`returns false given undefined or null`, function() {
            expect(typesIso.isNumber(null)).to.equal(false);
            expect(typesIso.isNumber(undefined)).to.equal(false);
        });
        it(`returns false given non-numbers`, function() {
            expect(typesIso.isNumber('')).to.equal(false);
            expect(typesIso.isNumber('asdf')).to.equal(false);
            expect(typesIso.isNumber('123')).to.equal(false);
            expect(typesIso.isNumber({})).to.equal(false);
            expect(typesIso.isNumber({a: 'eh'})).to.equal(false);
            expect(typesIso.isNumber([])).to.equal(false);
            expect(typesIso.isNumber([1, 2, 3])).to.equal(false);
            expect(typesIso.isNumber(false)).to.equal(false);
            expect(typesIso.isNumber(true)).to.equal(false);
        });
        it(`returns true given Number instances`, function() {
            expect(typesIso.isNumber(Number(12))).to.equal(true);
        });
        it(`returns true given instances of Number-extending objects`, function() {
            expect(typesIso.isNumber(new NewNumber(32))).to.equal(true);
        });
    });

    describe(`boolStringToBool`, function() {
        it(`returns true if given string T, true, t, TRUE, True, or any other variant of string True`, function() {
            expect(boolStringToBool('T')).to.equal(true);
            expect(boolStringToBool('t')).to.equal(true);

            expect(boolStringToBool('TRUE')).to.equal(true);
            expect(boolStringToBool('True')).to.equal(true);
            expect(boolStringToBool('true')).to.equal(true);

            expect(boolStringToBool('TrUe')).to.equal(true);
            expect(boolStringToBool('tRUE')).to.equal(true);
            expect(boolStringToBool('truE')).to.equal(true);
        });

        it(`returns false if given string F, false, f, FALSE, False, or any other variant of string False `, function() {
            expect(boolStringToBool('F')).to.equal(false);
            expect(boolStringToBool('f')).to.equal(false);

            expect(boolStringToBool('FALSE')).to.equal(false);
            expect(boolStringToBool('False')).to.equal(false);
            expect(boolStringToBool('false')).to.equal(false);

            expect(boolStringToBool('FaLse')).to.equal(false);
            expect(boolStringToBool('fAlSe')).to.equal(false);
            expect(boolStringToBool('fALSE')).to.equal(false);
            expect(boolStringToBool('falsE')).to.equal(false);
        });

        it(`returns true if given boolean true`, function() {
            expect(boolStringToBool(true)).to.equal(true);
        });

        it(`returns false if given boolean false`, function() {
            expect(boolStringToBool(false)).to.equal(false);
        });

        it(`throws if given a non-boolean non-string in strict mode`, function() {
            expect(() => (boolStringToBool as any)({})).to.throw();
            expect(() => (boolStringToBool as any)(() => 'value')).to.throw();
            expect(() => (boolStringToBool as any)('BAD_STRING')).to.throw();
            expect(() => (boolStringToBool as any)('')).to.throw();
            expect(() => (boolStringToBool as any)({false: false})).to.throw();
            expect(() => (boolStringToBool as any)([])).to.throw();
            expect(() => (boolStringToBool as any)([{false: false}])).to.throw();
            expect(() => (boolStringToBool as any)(null)).to.throw();
            expect(() => (boolStringToBool as any)(undefined)).to.throw();
            expect(() => (boolStringToBool as any)(123)).to.throw();
            expect(() => (boolStringToBool as any)(0)).to.throw();
            expect(() => (boolStringToBool as any)(1)).to.throw();
        });

        it(`does not throw if given a non-boolean non-string in strict mode`, function() {
            expect(() => (boolStringToBool as any)({}, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(() => 'value', false)).to.not.throw();
            expect(() => (boolStringToBool as any)('BAD_STRING', false)).to.not.throw();
            expect(() => (boolStringToBool as any)('', false)).to.not.throw();
            expect(() => (boolStringToBool as any)({false: false}, false)).to.not.throw();
            expect(() => (boolStringToBool as any)([], false)).to.not.throw();
            expect(() => (boolStringToBool as any)([{false: false}], false)).to.not.throw();
            expect(() => (boolStringToBool as any)(null, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(undefined, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(123, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(0, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(1, false)).to.not.throw();
        });

        it(`returns null if given a non-boolean non-string in strict mode`, function() {
            expect(() => (boolStringToBool as any)({}, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(() => 'value', false)).to.not.throw();
            expect(() => (boolStringToBool as any)('BAD_STRING', false)).to.not.throw();
            expect(() => (boolStringToBool as any)('', false)).to.not.throw();
            expect(() => (boolStringToBool as any)({false: false}, false)).to.not.throw();
            expect(() => (boolStringToBool as any)([], false)).to.not.throw();
            expect(() => (boolStringToBool as any)([{false: false}], false)).to.not.throw();
            expect(() => (boolStringToBool as any)(null, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(undefined, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(123, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(0, false)).to.not.throw();
            expect(() => (boolStringToBool as any)(1, false)).to.not.throw();
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

/******************************************** HELPERS *********************************************/
/**
 * Run sequence of tests against any function expected to return false for all non-numbers
 * @param {string}   fnName    Name of function being tested.
 * @param {Function} isIntFunc Actual function being tested.
 */
function numberDetectorFunctionTests(testFunc: (val: any) => boolean) {
    expectFunctionExists(testFunc);
    it(`returns false given an empty object`, function() {
        expect(testFunc({})).to.be.false;
    });
    it(`returns false given an object with data, even numeric data`, function() {
        expect(testFunc({test: 'value'})).to.be.false;
        expect(testFunc({'1': 1})).to.be.false;
        expect(testFunc({'0': 0})).to.be.false;
        expect(testFunc({0: 0})).to.be.false;
        expect(testFunc({1: 1})).to.be.false;
        expect(testFunc({1: ''})).to.be.false;
        expect(testFunc({someValue: 5})).to.be.false;
    });
    it(`returns false if given a boolean`, function() {
        expect(testFunc(false)).to.be.false;
        expect(testFunc(true)).to.be.false;
    });
    it(`returns false if given an empty array`, function() {
        expect(testFunc([])).to.be.false;
    });
    it(`returns false if given an array with data`, function() {
        expect(testFunc([0])).to.be.false;
        expect(testFunc([1])).to.be.false;
        expect(testFunc([0, 1])).to.be.false;
        expect(testFunc([324, 121, 1523, 123])).to.be.false;
        expect(testFunc(['0'])).to.be.false;
        expect(testFunc(['1'])).to.be.false;
        expect(testFunc([true])).to.be.false;
    });
    it(`returns false if given null`, function() {
        expect(testFunc(null)).to.be.false;
    });
    it(`returns false if given undefined or no value at all`, function() {
        expect(testFunc(undefined)).to.be.false;
        expect((testFunc as any)()).to.be.false;
    });
    it(`returns false if given NaN`, function() {
        expect(testFunc(NaN)).to.be.false;
    });
    it(`returns false if given an empty string`, function() {
        expect(testFunc('')).to.be.false;
    });
    it(`returns false if given a non-empty string`, function() {
        expect(testFunc('gr')).to.be.false;
        expect(testFunc('okokokok')).to.be.false;
        expect(testFunc('some test value')).to.be.false;
        expect(testFunc(' ')).to.be.false;
    });
    it(`returns false if given a function that resolves to an int`, function() {
        expect(testFunc(() => 23)).to.be.false;
        expect(testFunc(() => 1)).to.be.false;
    });
    it(`returns false if given any function`, function() {
        expect(testFunc(arg1 => console.log(arg1))).to.be.false;
        expect(
            testFunc(function someTestFunction() {
                console.log('Random behaviour for test function');
            })
        ).to.be.false;
    });
    it(`returns false given itself (${testFunc && testFunc.name})`, function() {
        expect(testFunc(testFunc)).to.be.false;
    });
    it(`returns false given Number built-in object (prototype)`, function() {
        expect(testFunc(Number)).to.be.false;
    });
    it(`returns false given any other built-in object (doesn't test 'Number')`, function() {
        expect(testFunc(Object)).to.be.false;
        expect(testFunc(Array)).to.be.false;
        expect(testFunc(Math)).to.be.false;
        expect(testFunc(ArrayBuffer)).to.be.false;
        expect(testFunc(String)).to.be.false;
        expect(testFunc(Boolean)).to.be.false;
        expect(testFunc(Function)).to.be.false;
        expect(testFunc(JSON)).to.be.false;
        expect(testFunc(Map)).to.be.false;
        expect(testFunc(Set)).to.be.false;
        expect(testFunc(Error)).to.be.false;
        expect(testFunc(RegExp)).to.be.false;
        expect(testFunc(Date)).to.be.false;
    });
}
