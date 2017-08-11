/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';
import { expectFunctionExists, expectNonEmptyObjectExists  } from '../../src/node/test';
import * as moment from 'moment';

/******************************* IMPORT TYPES MODULES FOR TESTING *********************************/
import { m_, types as typesIso, types, isBoolean } from '../../shared';
import { types as typesNode } from '../../node';
import { types as typesBrowser } from '../../browser';
import * as typesModule from '../../src/types-iso';

/********************************************* TESTS **********************************************/
describe(`types sub-modules`, function() {
    describe(`types-iso sub-module`, function() {
        expectNonEmptyObjectExists(typesIso, 'types (from shared/base export)');
        expectNonEmptyObjectExists(m_.types, 'types (from m_ top-level namespace)');
        expectNonEmptyObjectExists(typesModule, 'types (import all from types.ts file)');

        describe(`isInteger function (and alias isInt)`, function() {
            expectFunctionExists(typesIso.isInteger);
            expectFunctionExists(typesIso.isInt);
            it(`returns true given an integer`, function() {
                expect(typesIso.isInteger(10)).to.be.true;
                expect(typesIso.isInteger(-100)).to.be.true;
                expect(typesIso.isInteger(0)).to.be.true;
            });
            it(`returns false given a non-integer`, function() {
                expect(typesIso.isInteger(10.2)).to.be.false;
                expect(typesIso.isInteger('gr')).to.be.false;
                expect(typesIso.isInteger({})).to.be.false;
                expect(typesIso.isInteger(false)).to.be.false;
                expect(typesIso.isInteger(true)).to.be.false;
                expect(typesIso.isInteger([])).to.be.false;
                expect(typesIso.isInteger(() => 23)).to.be.false;
            });
            it(`returns false if given null, undefined, or no value at all`, function() {
                expect(typesIso.isInteger(null)).to.be.false;
                expect(typesIso.isInteger(undefined)).to.be.false;
                expect((typesIso.isInteger as any)()).to.be.false;
            });
        });

        describe(`isBoolean function`, function() {
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

        describe(`isIntegerLike function`, function() {
            expectFunctionExists(typesIso.isNumberLike);
            it(`returns true given an integer`, function() {
                expect(typesIso.isIntegerLike(0)).to.be.true;
                expect(typesIso.isIntegerLike(1)).to.be.true;
                expect(typesIso.isIntegerLike(-1)).to.be.true;
                expect(typesIso.isIntegerLike(24)).to.be.true;
            });
            it(`returns false given a number containing a decimal`, function() {
                expect(typesIso.isIntegerLike(12.32)).to.be.false;
                expect(typesIso.isIntegerLike(-1001.32)).to.be.false;
            });
            it(`returns true given a string that can parse into an integer (including ` +
                `numbers ending in a dot)`, function() {
                expect(typesIso.isIntegerLike('0')).to.be.true;
                expect(typesIso.isIntegerLike('1')).to.be.true;
                expect(typesIso.isIntegerLike('-1')).to.be.true;
                expect(typesIso.isIntegerLike('24')).to.be.true;
                expect(typesIso.isIntegerLike('24.')).to.be.true;
                expect(typesIso.isIntegerLike('-24.')).to.be.true;
            });
            it(`returns false given a string that can parse into a real number but not an integer`,
                function() {
                expect(typesIso.isIntegerLike('12.32')).to.be.false;
                expect(typesIso.isIntegerLike('-1001.32')).to.be.false;
                expect(typesIso.isIntegerLike('.32')).to.be.false;
                expect(typesIso.isIntegerLike('-.32')).to.be.false;
            });
            it(`returns false given a string that can't parse into a number, or given any other type of non-number (including NaN)`, function() {
                expect(typesIso.isIntegerLike({})).to.be.false;
                expect(typesIso.isIntegerLike([])).to.be.false;
                expect(typesIso.isIntegerLike(false)).to.be.false;
                expect(typesIso.isIntegerLike(true)).to.be.false;
                expect(typesIso.isIntegerLike('')).to.be.false;
                expect(typesIso.isIntegerLike('gr argh')).to.be.false;
                expect(typesIso.isIntegerLike(Object)).to.be.false;
                expect(typesIso.isIntegerLike(typesIso.isIntegerLike)).to.be.false;
                expect(typesIso.isIntegerLike(NaN)).to.be.false;
                expect(typesIso.isIntegerLike('123_a.453')).to.be.false;
                expect(typesIso.isIntegerLike('123..453')).to.be.false;
                expect(typesIso.isIntegerLike('123.453.123')).to.be.false;
                expect(typesIso.isIntegerLike('.')).to.be.false;
                expect(typesIso.isIntegerLike('-.')).to.be.false;
                expect(typesIso.isIntegerLike('-.123.2')).to.be.false;
            });
            it(`returns false if given null, undefined, or no value at all`, function() {
                expect(typesIso.isIntegerLike(null)).to.be.false;
                expect(typesIso.isIntegerLike(undefined)).to.be.false;
                expect((typesIso.isIntegerLike as any)()).to.be.false;
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

        describe(`isTrue function`, function() {
            expectFunctionExists(typesIso.isTrue);
            it(`returns true if run against true, 'true', 'True', or 'TRUE'`, function() {
                expect(typesIso.isTrue(true)).to.be.true;
                expect(typesIso.isTrue('true')).to.be.true;
                expect(typesIso.isTrue('TRUE')).to.be.true;
                expect(typesIso.isTrue('True')).to.be.true;
            });
            it(`returns false for everything besides true, 'true', 'True', or 'TRUE'`, function() {
                expect(typesIso.isTrue(null)).to.be.false;
                expect(typesIso.isTrue(false)).to.be.false;
                expect(typesIso.isTrue('TrUe')).to.be.false;
                expect(typesIso.isTrue('asdfoigeiubaer')).to.be.false;
                expect(typesIso.isTrue('')).to.be.false;
                expect(typesIso.isTrue(undefined)).to.be.false;
                expect((typesIso.isTrue as any)()).to.be.false;
                expect(typesIso.isTrue({})).to.be.false;
                expect(typesIso.isTrue([])).to.be.false;
                expect(typesIso.isTrue([true, true])).to.be.false;
                expect(typesIso.isTrue({ true: true })).to.be.false;
                expect(typesIso.isTrue(1)).to.be.false;
                expect(typesIso.isTrue(0)).to.be.false;
                expect(typesIso.isTrue(123456)).to.be.false;
                expect(typesIso.isTrue(NaN)).to.be.false;
                expect(typesIso.isTrue(Array)).to.be.false;
                expect(typesIso.isTrue(Object)).to.be.false;
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

        describe(`isMultilangTextObj`, function() {
            expectFunctionExists(typesIso.isMultilangTextObj);
        });

        describe(`@singleton decorator`, function() {
            // Mock singleton class
            @typesIso.singleton
            class SingletonObject {
                someString: string;
                constructor(someString) {
                    this.someString = someString
                }
            }

            // Mock non-singleton class
            class NonSingletonObject {
                someString: string;
                constructor(someString) {
                    this.someString = someString
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
            it(`ensures re-instantiating a class it's applied to for a second time results in ` +
                `returning the original object`, function()
            {
                const newInstance = new SingletonObject('another string');
                expect(newInstance.someString).to.eql('my string argument');
                expect(newInstance.someString).to.eql(singletonObject.someString);
                expect(newInstance).to.eql(singletonObject);
            });
            it(`has no effect on classes it's not applied to`, function() {
                const nonSingletonInstance = new NonSingletonObject('string one');
                const nonSingletonInstance2 = new NonSingletonObject('string two');
                expect(nonSingletonInstance.someString).to.eql('string one');
                expect(nonSingletonInstance2.someString).to.eql('string two');
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
