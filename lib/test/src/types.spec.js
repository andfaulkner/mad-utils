"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*************************************** IMPORT TEST UTILS ****************************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
var moment = require("moment");
/******************************* IMPORT TYPES MODULES FOR TESTING *********************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var typesModule = require("../../src/types-iso");
var boolStringToBool = typesModule.boolStringToBool;
/* Sample data */
var ints = [10, -100, 0, 1, -1, 83294, -212];
// prettier-ignore
var intsWDots = [10., -100.0, 0.00, 1.00000000000000000000000000000, -1., -323432., 0., -0.];
// prettier-ignore
var nonIntNums = [10.2, 0.919232, 0.000000001, -0.001, 383.145, -123.42, 10.00000000001, -.3, .6];
/********************************************* TESTS **********************************************/
describe("types sub-modules", function () {
    describe("types-iso sub-module", function () {
        test_1.expectNonEmptyObjectExists(shared_1.types, 'types (from shared/base export)');
        test_1.expectNonEmptyObjectExists(shared_1.m_.types, 'types (from m_ top-level namespace)');
        test_1.expectNonEmptyObjectExists(typesModule, 'types (import all from types.ts file)');
        describe("isInteger function (and alias isInt)", function () {
            test_1.expectFunctionExists(shared_1.types.isInt);
            numberDetectorFunctionTests(shared_1.types.isInteger);
            it("returns true given a basic integer (with no .0)", function () {
                ints.forEach(function (int) { return chai_1.expect(shared_1.types.isInteger(int)).to.be.true; });
            });
            it("returns true given an integer with ., .0, .00..., etc. afterwards", function () {
                intsWDots.forEach(function (int) { return chai_1.expect(shared_1.types.isInteger(int)).to.be.true; });
            });
            it("returns false given an integer-like string (that's what isIntegerLike is for)", function () {
                ints.forEach(function (int) { return chai_1.expect(shared_1.types.isInteger("" + int)).to.be.false; });
                intsWDots.forEach(function (int) { return chai_1.expect(shared_1.types.isInteger("" + int)).to.be.false; });
            });
            it("returns false given Infinity or -Infinity", function () {
                chai_1.expect(shared_1.types.isInteger(Infinity)).to.be.false;
                chai_1.expect(shared_1.types.isInteger(-Infinity)).to.be.false;
            });
            it("returns false given a non-integer-like number", function () {
                nonIntNums.forEach(function (num) { return chai_1.expect(shared_1.types.isInteger("" + num)).to.be.false; });
            });
        });
        describe("isIntegerLike function", function () {
            test_1.expectFunctionExists(shared_1.types.isIntegerLike);
            test_1.expectFunctionExists(shared_1.types.isIntLike);
            numberDetectorFunctionTests(shared_1.types.isIntegerLike);
            it("returns true given an integer", function () {
                chai_1.expect(shared_1.types.isIntegerLike(0)).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike(1)).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike(-1)).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike(24)).to.be.true;
            });
            it("returns false given number w/ decimal (that isn't at the end or followed by 0s)", function () {
                chai_1.expect(shared_1.types.isIntegerLike(12.32)).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike(-1001.32)).to.be.false;
            });
            it("returns true given string that parses into an int", function () {
                ints.forEach(function (int) { return chai_1.expect(shared_1.types.isIntegerLike("" + int)).to.be.true; });
            });
            it("returns true for \"integer strings\" ending with a dot", function () {
                chai_1.expect(shared_1.types.isIntegerLike('0.')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('-0.')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('24.')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('-24.')).to.be.true;
            });
            it("returns true for \"integer strings\" ending with .0, .00, .000, etc", function () {
                intsWDots.forEach(function (int) { return chai_1.expect(shared_1.types.isIntegerLike("" + int)).to.be.true; });
                chai_1.expect(shared_1.types.isIntegerLike('123.0')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('-123.0')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('6.00')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('-6.00')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('-123.0000000000000000')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('123.0000000000000000')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('0.00000')).to.be.true;
                chai_1.expect(shared_1.types.isIntegerLike('-0.00000')).to.be.true;
            });
            it("returns false given a string that parses into a float but not an int", function () {
                nonIntNums.forEach(function (num) { return chai_1.expect(shared_1.types.isIntegerLike("" + num)).to.be.false; });
                chai_1.expect(shared_1.types.isIntegerLike('12.32')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('-1001.32')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('.32')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('-.32')).to.be.false;
            });
            it("returns false given a string that can't parse into a valid integer", function () {
                chai_1.expect(shared_1.types.isIntegerLike('123_a.453')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('123..453')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('123.453.123')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('.')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('-.')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('-.123.2')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('-.0.')).to.be.false;
                chai_1.expect(shared_1.types.isIntegerLike('..1.0')).to.be.false;
            });
        });
        describe("isBoolean function", function () {
            test_1.expectFunctionExists(shared_1.types.isBoolean);
            test_1.expectFunctionExists(shared_1.types.isBool);
            it("returns true if given a boolean", function () {
                chai_1.expect(shared_1.isBoolean(true)).to.be.true;
                chai_1.expect(shared_1.isBoolean(false)).to.be.true;
            });
            it("returns true if given a factory-constructed Boolean object", function () {
                chai_1.expect(shared_1.isBoolean(Boolean(false))).to.be.true;
                chai_1.expect(shared_1.isBoolean(Boolean(true))).to.be.true;
            });
            it("returns true if given an instantiated Boolean object", function () {
                chai_1.expect(shared_1.isBoolean(new Boolean(false))).to.be.true;
                chai_1.expect(shared_1.isBoolean(new Boolean(true))).to.be.true;
            });
            it("returns false if given a non-boolean", function () {
                chai_1.expect(shared_1.isBoolean(null)).to.be.false;
                chai_1.expect(shared_1.isBoolean(undefined)).to.be.false;
                chai_1.expect(shared_1.isBoolean('')).to.be.false;
                chai_1.expect(shared_1.isBoolean('asdf')).to.be.false;
                chai_1.expect(shared_1.isBoolean(0)).to.be.false;
                chai_1.expect(shared_1.isBoolean(1)).to.be.false;
                chai_1.expect(shared_1.isBoolean(NaN)).to.be.false;
                chai_1.expect(shared_1.isBoolean(function () { return false; })).to.be.false;
                chai_1.expect(shared_1.isBoolean(function () { return true; })).to.be.false;
            });
        });
        describe("isString function", function () {
            test_1.expectFunctionExists(shared_1.types.isString);
            it("returns true if given a string - including an empty string", function () {
                chai_1.expect(shared_1.isString('')).to.be.true;
                chai_1.expect(shared_1.isString('asdf')).to.be.true;
                chai_1.expect(shared_1.isString('1')).to.be.true;
                chai_1.expect(shared_1.isString('null')).to.be.true;
                chai_1.expect(shared_1.isString('{}')).to.be.true;
            });
            it("returns true if given a String instance", function () {
                var str = new String('ok');
                chai_1.expect(shared_1.isString(str)).to.be.true;
                chai_1.expect(shared_1.isString(new String(''))).to.be.true;
                chai_1.expect(shared_1.isString(new String(1))).to.be.true;
                chai_1.expect(shared_1.isString(new String(null))).to.be.true;
            });
            it("returns true if given a String-inheriting object instance", function () {
                var PrefixedString = /** @class */ (function (_super) {
                    __extends(PrefixedString, _super);
                    function PrefixedString() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return PrefixedString;
                }(String));
                chai_1.expect(shared_1.isString(new PrefixedString())).to.be.true;
            });
            it("returns false if given a val that isn't a string or String instance", function () {
                chai_1.expect(shared_1.isString(null)).to.be.false;
                chai_1.expect(shared_1.isString(undefined)).to.be.false;
                chai_1.expect(shared_1.isString()).to.be.false;
                chai_1.expect(shared_1.isString(0)).to.be.false;
                chai_1.expect(shared_1.isString(1)).to.be.false;
                chai_1.expect(shared_1.isString(-1)).to.be.false;
                chai_1.expect(shared_1.isString(222)).to.be.false;
                chai_1.expect(shared_1.isString(-222)).to.be.false;
                chai_1.expect(shared_1.isString(NaN)).to.be.false;
                chai_1.expect(shared_1.isString(Symbol())).to.be.false;
                chai_1.expect(shared_1.isString({})).to.be.false;
                chai_1.expect(shared_1.isString({ str: 'string' })).to.be.false;
                chai_1.expect(shared_1.isString({ toString: function () { return true; } })).to.be.false;
                chai_1.expect(shared_1.isString(shared_1.isString)).to.be.false;
                chai_1.expect(shared_1.isString(function () { return 'asdf'; })).to.be.false;
                chai_1.expect(shared_1.isString(String)).to.be.false;
                chai_1.expect(shared_1.isString(new Map())).to.be.false;
                chai_1.expect(shared_1.isString(new Set())).to.be.false;
            });
        });
        describe("isNumberLike function", function () {
            test_1.expectFunctionExists(shared_1.types.isNumberLike);
            test_1.expectFunctionExists(shared_1.types.isNumLike);
            it("returns true given a number", function () {
                chai_1.expect(shared_1.types.isNumberLike(0)).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike(1)).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike(-1)).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike(24)).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike(12.32)).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike(-1001.32)).to.be.true;
            });
            it("returns true given a string that can parse into a number", function () {
                chai_1.expect(shared_1.types.isNumberLike('0')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('1')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('-1')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('24')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('12.32')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('-1001.32')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('.32')).to.be.true;
                chai_1.expect(shared_1.types.isNumberLike('-.32')).to.be.true;
            });
            it("returns false given a string that can't parse into a number, or given any other type of non-number (including NaN)", function () {
                chai_1.expect(shared_1.types.isNumberLike({})).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike([])).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike(false)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike(true)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('gr argh')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike(Object)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike(shared_1.types.isNumberLike)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike(NaN)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('123_a.453')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('123..453')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('123.453.123')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('.')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('-.')).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike('-.123.2')).to.be.false;
            });
            it("returns false if given null, undefined, or no value at all", function () {
                chai_1.expect(shared_1.types.isNumberLike(null)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike(undefined)).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike()).to.be.false;
            });
            it("returns false if given array w/ 1 number-like value & no 2nd arg", function () {
                chai_1.expect(shared_1.types.isNumberLike([2])).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike([54])).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike([54, 89])).to.be.false;
            });
            it("returns false if given array  w/ 1 number-like value", function () {
                chai_1.expect(shared_1.types.isNumberLike([2])).to.be.false;
                chai_1.expect(shared_1.types.isNumberLike([54])).to.be.false;
            });
        });
        describe("isStringOrNumber function", function () {
            it("returns true if given a number", function () {
                chai_1.expect(shared_1.types.isStringOrNumber(5)).to.eql(true);
            });
            it("returns true if given a string", function () {
                chai_1.expect(shared_1.types.isStringOrNumber('Some string')).to.eql(true);
            });
            it("returns true if given anything that isn't either a string of a number", function () {
                chai_1.expect(shared_1.types.isStringOrNumber({})).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber([])).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(null)).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(undefined)).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(NaN)).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(Array)).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(String)).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(['asdf', 'rbrt'])).to.eql(false);
                chai_1.expect(shared_1.types.isStringOrNumber(Object)).to.eql(false);
            });
        });
        describe("isVoidOrString function", function () {
            test_1.expectFunctionExists(shared_1.types.isVoidOrString);
            it("returns true for undefined or null", function () {
                chai_1.expect(shared_1.types.isVoidOrString(null)).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString(undefined)).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString()).to.equal(true);
            });
            it("returns true for string", function () {
                chai_1.expect(shared_1.types.isVoidOrString('')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('asdf')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString(' ')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('  asdfasdf  ')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('  123  ')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('123')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('true')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('null')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('undefined')).to.equal(true);
                chai_1.expect(shared_1.types.isVoidOrString('0')).to.equal(true);
            });
            it("returns false for non-string, non-null, non-undefined items ", function () {
                chai_1.expect(shared_1.types.isVoidOrString(123)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(false)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(true)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString({})).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString([])).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(['asdf'])).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString({ asdf: 'asdf' })).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(0)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(1)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(NaN)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(Object)).to.equal(false);
                chai_1.expect(shared_1.types.isVoidOrString(shared_1.types.isVoidOrString)).to.equal(false);
            });
        });
        describe("isArray function", function () {
            test_1.expectFunctionExists(shared_1.types.isArray);
            it("returns true for arrays", function () {
                chai_1.expect(shared_1.types.isArray([])).to.be.true;
                chai_1.expect(shared_1.types.isArray(['asdf', '123', null])).to.be.true;
                chai_1.expect(shared_1.types.isArray([null])).to.be.true;
                chai_1.expect(shared_1.types.isArray(new Array())).to.be.true;
                var ArrayExtender = /** @class */ (function (_super) {
                    __extends(ArrayExtender, _super);
                    function ArrayExtender() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return ArrayExtender;
                }(Array));
                chai_1.expect(shared_1.types.isArray(new ArrayExtender())).to.be.true;
            });
            it("returns false for non-arrays", function () {
                chai_1.expect(shared_1.types.isArray(null)).to.be.false;
                chai_1.expect(shared_1.types.isArray(0)).to.be.false;
                chai_1.expect(shared_1.types.isArray(1)).to.be.false;
                chai_1.expect(shared_1.types.isArray({})).to.be.false;
                chai_1.expect(shared_1.types.isArray({ asdf: [] })).to.be.false;
                chai_1.expect(shared_1.types.isArray('123123')).to.be.false;
                chai_1.expect(shared_1.types.isArray('[]')).to.be.false;
                chai_1.expect(shared_1.types.isArray('sasffwe')).to.be.false;
                chai_1.expect(shared_1.types.isArray(Object)).to.be.false;
                chai_1.expect(shared_1.types.isArray(Array)).to.be.false;
                chai_1.expect(shared_1.types.isArray(undefined)).to.be.false;
                chai_1.expect(shared_1.types.isArray(-123)).to.be.false;
                chai_1.expect(shared_1.types.isArray('')).to.be.false;
                chai_1.expect(shared_1.types.isArray(true)).to.be.false;
                chai_1.expect(shared_1.types.isArray(false)).to.be.false;
                chai_1.expect(shared_1.types.isArray(shared_1.types.isArray)).to.be.false;
            });
        });
        describe("isTrue function", function () {
            test_1.expectFunctionExists(shared_1.types.isTrue);
            it("returns true if given true, 'true', 'TrUe', 'True', 'TRUE', etc., regardless of arg 2's value", function () {
                chai_1.expect(shared_1.types.isTrue(true)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('true')).to.be.true;
                chai_1.expect(shared_1.types.isTrue('TRUE')).to.be.true;
                chai_1.expect(shared_1.types.isTrue('True')).to.be.true;
                chai_1.expect(shared_1.types.isTrue(true, true)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('true', true)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('TRUE', true)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('True', true)).to.be.true;
                chai_1.expect(shared_1.types.isTrue(true, false)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('true', false)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('TRUE', false)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('TrUe')).to.be.true;
                chai_1.expect(shared_1.types.isTrue('True', false)).to.be.true;
            });
            it("if arg 2 false, returns false for all vals except variants of true e.g. 'true', 'True', 'TRUE'", function () {
                chai_1.expect(shared_1.types.isTrue(null)).to.be.false;
                chai_1.expect(shared_1.types.isTrue(false)).to.be.false;
                chai_1.expect(shared_1.types.isTrue('asdfoigeiubaer')).to.be.false;
                chai_1.expect(shared_1.types.isTrue('')).to.be.false;
                chai_1.expect(shared_1.types.isTrue(undefined)).to.be.false;
                chai_1.expect(shared_1.types.isTrue()).to.be.false;
                chai_1.expect(shared_1.types.isTrue({})).to.be.false;
                chai_1.expect(shared_1.types.isTrue([])).to.be.false;
                chai_1.expect(shared_1.types.isTrue([true, true])).to.be.false;
                chai_1.expect(shared_1.types.isTrue({ true: true })).to.be.false;
                chai_1.expect(shared_1.types.isTrue(1)).to.be.false;
                chai_1.expect(shared_1.types.isTrue(0)).to.be.false;
                chai_1.expect(shared_1.types.isTrue(123456)).to.be.false;
                chai_1.expect(shared_1.types.isTrue(NaN)).to.be.false;
                chai_1.expect(shared_1.types.isTrue(Array)).to.be.false;
                chai_1.expect(shared_1.types.isTrue(Object)).to.be.false;
            });
            it("if arg 2 true, returns true for 't' and 'T'", function () {
                chai_1.expect(shared_1.types.isTrue('t', true)).to.be.true;
                chai_1.expect(shared_1.types.isTrue('T', true)).to.be.true;
            });
            it("if arg 2 false or not defined, returns false for 't' and 'T'", function () {
                chai_1.expect(shared_1.types.isTrue('t', false)).to.be.false;
                chai_1.expect(shared_1.types.isTrue('T', false)).to.be.false;
                chai_1.expect(shared_1.types.isTrue('t')).to.be.false;
                chai_1.expect(shared_1.types.isTrue('T')).to.be.false;
            });
        });
        describe("isFalse function", function () {
            test_1.expectFunctionExists(shared_1.types.isFalse);
            it("returns true if given false (with any casing), regardless of arg 2's value", function () {
                chai_1.expect(shared_1.types.isFalse(false)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('false')).to.be.true;
                chai_1.expect(shared_1.types.isFalse('FALSE')).to.be.true;
                chai_1.expect(shared_1.types.isFalse('False')).to.be.true;
                chai_1.expect(shared_1.types.isFalse(false, false)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('false', false)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('FALSE', false)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('False', false)).to.be.true;
                chai_1.expect(shared_1.types.isFalse(false, true)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('false', true)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('FALSE', true)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('False', true)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('FaLsE')).to.be.true;
            });
            it("if arg 2 false, returns false for all vals except 'false' (w/ any case e.g. 'FaLSe' OK)", function () {
                chai_1.expect(shared_1.types.isFalse(null)).to.be.false;
                chai_1.expect(shared_1.types.isFalse(true)).to.be.false;
                chai_1.expect(shared_1.types.isFalse('asdfoigeiubaer')).to.be.false;
                chai_1.expect(shared_1.types.isFalse('')).to.be.false;
                chai_1.expect(shared_1.types.isFalse(undefined)).to.be.false;
                chai_1.expect(shared_1.types.isFalse()).to.be.false;
                chai_1.expect(shared_1.types.isFalse({})).to.be.false;
                chai_1.expect(shared_1.types.isFalse([])).to.be.false;
                chai_1.expect(shared_1.types.isFalse([false, false])).to.be.false;
                chai_1.expect(shared_1.types.isFalse({ false: false })).to.be.false;
                chai_1.expect(shared_1.types.isFalse(1)).to.be.false;
                chai_1.expect(shared_1.types.isFalse(0)).to.be.false;
                chai_1.expect(shared_1.types.isFalse(123456)).to.be.false;
                chai_1.expect(shared_1.types.isFalse(NaN)).to.be.false;
                chai_1.expect(shared_1.types.isFalse(Array)).to.be.false;
                chai_1.expect(shared_1.types.isFalse(Object)).to.be.false;
            });
            it("if arg 2 true, returns true for 'f' and 'F'", function () {
                chai_1.expect(shared_1.types.isFalse('f', true)).to.be.true;
                chai_1.expect(shared_1.types.isFalse('F', true)).to.be.true;
            });
            it("if arg 2 false or not defined, returns false for 'f' and 'F'", function () {
                chai_1.expect(shared_1.types.isFalse('f', false)).to.be.false;
                chai_1.expect(shared_1.types.isFalse('F', false)).to.be.false;
                chai_1.expect(shared_1.types.isFalse('f')).to.be.false;
                chai_1.expect(shared_1.types.isFalse('F')).to.be.false;
            });
        });
        describe("isFunction function", function () {
            test_1.expectFunctionExists(shared_1.types.isFunction);
            it("returns true if given an arrow function", function () {
                chai_1.expect(shared_1.types.isFunction(function () { return ''; })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function () { return true; })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function () { return null; })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function (arg1, arg2) { return arg1 + arg2; })).to.be.true;
            });
            it("returns true if given a classic ES5 (and under) lambda function", function () {
                chai_1.expect(shared_1.types.isFunction(function () {
                    return 'ok';
                })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function () {
                    return false;
                })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function () { })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function (arg1, arg2) { })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function (arg1, arg2) {
                    return arg1 + arg2;
                })).to.be.true;
            });
            it("returns true if given a named classic ES5 (and under) function", function () {
                chai_1.expect(shared_1.types.isFunction(function testFunc1() {
                    return 'ok';
                })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function testFunc2() {
                    return false;
                })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function testFunc3() { })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function testFunc4(arg1, arg2) { })).to.be.true;
                chai_1.expect(shared_1.types.isFunction(function testFunc5(arg1, arg2) {
                    return arg1 + arg2;
                })).to.be.true;
            });
            it("returns false if given a RegExp", function () {
                chai_1.expect(shared_1.types.isFunction(/asdf/g)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(new RegExp('asdf'))).to.be.false;
            });
            it("returns false if given a symbol", function () {
                chai_1.expect(shared_1.types.isFunction(Symbol())).to.be.false;
                chai_1.expect(shared_1.types.isFunction(Symbol('okokok'))).to.be.false;
                chai_1.expect(shared_1.types.isFunction(Symbol.for('asdf'))).to.be.false;
            });
            it("returns false if given undefined or null", function () {
                chai_1.expect(shared_1.types.isFunction(null)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(undefined)).to.be.false;
                chai_1.expect(shared_1.types.isFunction()).to.be.false;
            });
            it("returns false if given a string, boolean, NaN, or number", function () {
                chai_1.expect(shared_1.types.isFunction('')).to.be.false;
                chai_1.expect(shared_1.types.isFunction('asdf')).to.be.false;
                chai_1.expect(shared_1.types.isFunction(false)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(true)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(NaN)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(0)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(1)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(21398123)).to.be.false;
                chai_1.expect(shared_1.types.isFunction(-1)).to.be.false;
            });
            it("returns false if given an object or array", function () {
                chai_1.expect(shared_1.types.isFunction({})).to.be.false;
                chai_1.expect(shared_1.types.isFunction([])).to.be.false;
                chai_1.expect(shared_1.types.isFunction({ a: 1, b: 'two' })).to.be.false;
                chai_1.expect(shared_1.types.isFunction(['a', 'b'])).to.be.false;
                chai_1.expect(shared_1.types.isFunction([0])).to.be.false;
                chai_1.expect(shared_1.types.isFunction([function () { return null; }])).to.be.false;
                chai_1.expect(shared_1.types.isFunction([function () { return 'out'; }, function (arg1) { return 999; }])).to.be.false;
            });
            it("returns true if given a function with an object merged in", function () {
                chai_1.expect(shared_1.types.isFunction(Object.assign(function testFunc() {
                    return 'result';
                }, { a: 1, b: 2 }))).to.be.true;
            });
        });
        describe("isDateLike function", function () {
            test_1.expectFunctionExists(shared_1.types.isDateLike);
            it("should return true for dates & moment objects", function () {
                chai_1.expect(shared_1.types.isDateLike(new Date())).to.be.true;
                chai_1.expect(shared_1.types.isDateLike(moment())).to.be.true;
                chai_1.expect(shared_1.types.isDateLike(moment(new Date()))).to.be.true;
            });
            it("should return true for anything moment considers valid besides negative numbers", function () {
                chai_1.expect(shared_1.types.isDateLike('1234-12-23')).to.be.true;
                chai_1.expect(shared_1.types.isDateLike('1234')).to.be.true;
                chai_1.expect(shared_1.types.isDateLike(1234)).to.be.true;
                chai_1.expect(shared_1.types.isDateLike('1231235')).to.be.true;
                chai_1.expect(shared_1.types.isDateLike('1231/10/23:12:12:12')).to.be.true;
                chai_1.expect(shared_1.types.isDateLike('1231-10-23:12:12:12')).to.be.true;
                chai_1.expect(shared_1.types.isDateLike(123134)).to.be.true;
                chai_1.expect(shared_1.types.isDateLike(0)).to.be.true;
                chai_1.expect(shared_1.types.isDateLike('0')).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({})).to.be.true;
                chai_1.expect(shared_1.types.isDateLike([])).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ months: 10 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ month: 10 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ years: 10 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ year: 2015 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ date: 24 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ dates: 22 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ day: 21 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ days: 20 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ millisecond: 900 })).to.be.true;
                chai_1.expect(shared_1.types.isDateLike({ seconds: 56 })).to.be.true;
            });
            it("should return false for negative numbers, anything moment considers invalid, & " +
                "nonsensical objects", function () {
                chai_1.expect(shared_1.types.isDateLike('-1234')).to.be.false;
                chai_1.expect(shared_1.types.isDateLike(-1234)).to.be.false;
                chai_1.expect(shared_1.types.isDateLike(NaN)).to.be.false;
                chai_1.expect(shared_1.types.isDateLike(['asdf'])).to.be.false;
                chai_1.expect(shared_1.types.isDateLike([''])).to.be.false;
                chai_1.expect(shared_1.types.isDateLike({ oko: 123 })).to.be.false;
                chai_1.expect(shared_1.types.isDateLike({ oko: 123, date: 10 })).to.be.false;
                chai_1.expect(shared_1.types.isDateLike('12312354')).to.be.false;
            });
        });
        describe("@singleton decorator", function () {
            // Mock singleton class
            var SingletonObject = /** @class */ (function () {
                function SingletonObject(someString) {
                    this.someString = someString;
                }
                SingletonObject = __decorate([
                    shared_1.types.singleton,
                    __metadata("design:paramtypes", [Object])
                ], SingletonObject);
                return SingletonObject;
            }());
            // Mock non-singleton class
            var NonSingletonObject = /** @class */ (function () {
                function NonSingletonObject(someString) {
                    this.someString = someString;
                }
                return NonSingletonObject;
            }());
            // Instance of singleton class.
            var singletonObject;
            before(function () {
                singletonObject = new SingletonObject('my string argument');
            });
            test_1.expectFunctionExists(shared_1.types.singleton);
            it("can be applied to a class", function () {
                chai_1.expect(SingletonObject).to.exist;
                chai_1.expect(singletonObject).to.exist;
                chai_1.expect(singletonObject).to.be.instanceof(SingletonObject);
                chai_1.expect(singletonObject.someString).to.eql('my string argument');
            });
            it("ensures re-instantiating a class it's applied to for a second time results in " +
                "returning the original object", function () {
                var newInstance = new SingletonObject('another string');
                chai_1.expect(newInstance.someString).to.eql('my string argument');
                chai_1.expect(newInstance.someString).to.eql(singletonObject.someString);
                chai_1.expect(newInstance).to.eql(singletonObject);
            });
            it("has no effect on classes it's not applied to", function () {
                var nonSingletonInstance = new NonSingletonObject('string one');
                var nonSingletonInstance2 = new NonSingletonObject('string two');
                chai_1.expect(nonSingletonInstance.someString).to.eql('string one');
                chai_1.expect(nonSingletonInstance2.someString).to.eql('string two');
            });
        });
    });
    describe("isAlphabeticChar", function () {
        it("Returns true given any (single-length) alphabetic character", function () {
            chai_1.expect(shared_1.types.isAlphabeticChar('a')).to.eql(true);
            chai_1.expect(shared_1.types.isAlphabeticChar('F')).to.eql(true);
            chai_1.expect(shared_1.types.isAlphabeticChar('Z')).to.eql(true);
        });
        it("Returns false given empty string", function () {
            chai_1.expect(shared_1.types.isAlphabeticChar('')).to.eql(false);
        });
        it("Returns false given any alphabetic string longer than 1 character", function () {
            chai_1.expect(shared_1.types.isAlphabeticChar('ay')).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar('FE')).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar('Zh')).to.eql(false);
        });
        it("Returns false given non-alphabetic character", function () {
            chai_1.expect(shared_1.types.isAlphabeticChar('1')).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar('&')).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar('<')).to.eql(false);
        });
        it("Returns false given non-string values", function () {
            chai_1.expect(shared_1.types.isAlphabeticChar(null)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(undefined)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(-Infinity)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(-1)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(0)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(1)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(Infinity)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(NaN)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(String)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(Function.prototype)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(Object.prototype)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(function () { return ''; })).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(function f() { })).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar({})).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar({ a: 1 })).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar([])).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(['a', 999])).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar([null])).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(true)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(false)).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(Symbol())).to.eql(false);
            chai_1.expect(shared_1.types.isAlphabeticChar(Symbol('Q'))).to.eql(false);
        });
    });
    describe("isNumber", function () {
        var NewNumber = /** @class */ (function (_super) {
            __extends(NewNumber, _super);
            function NewNumber() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return NewNumber;
        }(Number));
        before(function () {
            Reflect.defineProperty(NewNumber.prototype, 'subtract', {
                value: function subtract(numToSubtract) {
                    return new Number(Number(this) - numToSubtract);
                },
            });
        });
        it("return true given a number", function () {
            chai_1.expect(shared_1.types.isNumber(0)).to.equal(true);
            chai_1.expect(shared_1.types.isNumber(1)).to.equal(true);
            chai_1.expect(shared_1.types.isNumber(-100)).to.equal(true);
            chai_1.expect(shared_1.types.isNumber(100)).to.equal(true);
            chai_1.expect(shared_1.types.isNumber(27.283)).to.equal(true);
            chai_1.expect(shared_1.types.isNumber(-27.283)).to.equal(true);
        });
        it("returns true given Infinity", function () {
            chai_1.expect(shared_1.types.isNumber(Infinity)).to.equal(true);
            chai_1.expect(shared_1.types.isNumber(-Infinity)).to.equal(true);
        });
        it("returns false given NaN", function () {
            chai_1.expect(shared_1.types.isNumber(NaN)).to.equal(false);
        });
        it("returns false given undefined or null", function () {
            chai_1.expect(shared_1.types.isNumber(null)).to.equal(false);
            chai_1.expect(shared_1.types.isNumber(undefined)).to.equal(false);
        });
        it("returns false given non-numbers", function () {
            chai_1.expect(shared_1.types.isNumber('')).to.equal(false);
            chai_1.expect(shared_1.types.isNumber('asdf')).to.equal(false);
            chai_1.expect(shared_1.types.isNumber('123')).to.equal(false);
            chai_1.expect(shared_1.types.isNumber({})).to.equal(false);
            chai_1.expect(shared_1.types.isNumber({ a: 'eh' })).to.equal(false);
            chai_1.expect(shared_1.types.isNumber([])).to.equal(false);
            chai_1.expect(shared_1.types.isNumber([1, 2, 3])).to.equal(false);
            chai_1.expect(shared_1.types.isNumber(false)).to.equal(false);
            chai_1.expect(shared_1.types.isNumber(true)).to.equal(false);
        });
        it("returns true given Number instances", function () {
            chai_1.expect(shared_1.types.isNumber(Number(12))).to.equal(true);
        });
        it("returns true given instances of Number-extending objects", function () {
            chai_1.expect(shared_1.types.isNumber(new NewNumber(32))).to.equal(true);
        });
    });
    describe("boolStringToBool", function () {
        it("returns true if given string T, true, t, TRUE, True, or any other variant of string True", function () {
            chai_1.expect(boolStringToBool('T')).to.equal(true);
            chai_1.expect(boolStringToBool('t')).to.equal(true);
            chai_1.expect(boolStringToBool('TRUE')).to.equal(true);
            chai_1.expect(boolStringToBool('True')).to.equal(true);
            chai_1.expect(boolStringToBool('true')).to.equal(true);
            chai_1.expect(boolStringToBool('TrUe')).to.equal(true);
            chai_1.expect(boolStringToBool('tRUE')).to.equal(true);
            chai_1.expect(boolStringToBool('truE')).to.equal(true);
        });
        it("returns false if given string F, false, f, FALSE, False, or any other variant of string False ", function () {
            chai_1.expect(boolStringToBool('F')).to.equal(false);
            chai_1.expect(boolStringToBool('f')).to.equal(false);
            chai_1.expect(boolStringToBool('FALSE')).to.equal(false);
            chai_1.expect(boolStringToBool('False')).to.equal(false);
            chai_1.expect(boolStringToBool('false')).to.equal(false);
            chai_1.expect(boolStringToBool('FaLse')).to.equal(false);
            chai_1.expect(boolStringToBool('fAlSe')).to.equal(false);
            chai_1.expect(boolStringToBool('fALSE')).to.equal(false);
            chai_1.expect(boolStringToBool('falsE')).to.equal(false);
        });
        it("returns true if given boolean true", function () {
            chai_1.expect(boolStringToBool(true)).to.equal(true);
        });
        it("returns false if given boolean false", function () {
            chai_1.expect(boolStringToBool(false)).to.equal(false);
        });
        it("throws if given a non-boolean non-string in strict mode", function () {
            chai_1.expect(function () { return boolStringToBool({}); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(function () { return 'value'; }); }).to.throw();
            chai_1.expect(function () { return boolStringToBool('BAD_STRING'); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(''); }).to.throw();
            chai_1.expect(function () { return boolStringToBool({ false: false }); }).to.throw();
            chai_1.expect(function () { return boolStringToBool([]); }).to.throw();
            chai_1.expect(function () { return boolStringToBool([{ false: false }]); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(null); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(undefined); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(123); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(0); }).to.throw();
            chai_1.expect(function () { return boolStringToBool(1); }).to.throw();
        });
        it("does not throw if given a non-boolean non-string in strict mode", function () {
            chai_1.expect(function () { return boolStringToBool({}, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(function () { return 'value'; }, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool('BAD_STRING', false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool('', false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool({ false: false }, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool([], false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool([{ false: false }], false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(null, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(undefined, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(123, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(0, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(1, false); }).to.not.throw();
        });
        it("returns null if given a non-boolean non-string in strict mode", function () {
            chai_1.expect(function () { return boolStringToBool({}, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(function () { return 'value'; }, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool('BAD_STRING', false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool('', false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool({ false: false }, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool([], false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool([{ false: false }], false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(null, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(undefined, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(123, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(0, false); }).to.not.throw();
            chai_1.expect(function () { return boolStringToBool(1, false); }).to.not.throw();
        });
    });
    describe("types-browser sub-module", function () {
        it("exists", function () {
            chai_1.expect(browser_1.types).to.exist;
        });
    });
    describe("types-node sub-module", function () {
        it("exists", function () {
            chai_1.expect(node_1.types).to.exist;
        });
    });
});
/******************************************** HELPERS *********************************************/
/**
 * Run sequence of tests against any function expected to return false for all non-numbers
 * @param {string}   fnName    Name of function being tested.
 * @param {Function} isIntFunc Actual function being tested.
 */
function numberDetectorFunctionTests(testFunc) {
    test_1.expectFunctionExists(testFunc);
    it("returns false given an empty object", function () {
        chai_1.expect(testFunc({})).to.be.false;
    });
    it("returns false given an object with data, even numeric data", function () {
        chai_1.expect(testFunc({ test: 'value' })).to.be.false;
        chai_1.expect(testFunc({ '1': 1 })).to.be.false;
        chai_1.expect(testFunc({ '0': 0 })).to.be.false;
        chai_1.expect(testFunc({ 0: 0 })).to.be.false;
        chai_1.expect(testFunc({ 1: 1 })).to.be.false;
        chai_1.expect(testFunc({ 1: '' })).to.be.false;
        chai_1.expect(testFunc({ someValue: 5 })).to.be.false;
    });
    it("returns false if given a boolean", function () {
        chai_1.expect(testFunc(false)).to.be.false;
        chai_1.expect(testFunc(true)).to.be.false;
    });
    it("returns false if given an empty array", function () {
        chai_1.expect(testFunc([])).to.be.false;
    });
    it("returns false if given an array with data", function () {
        chai_1.expect(testFunc([0])).to.be.false;
        chai_1.expect(testFunc([1])).to.be.false;
        chai_1.expect(testFunc([0, 1])).to.be.false;
        chai_1.expect(testFunc([324, 121, 1523, 123])).to.be.false;
        chai_1.expect(testFunc(['0'])).to.be.false;
        chai_1.expect(testFunc(['1'])).to.be.false;
        chai_1.expect(testFunc([true])).to.be.false;
    });
    it("returns false if given null", function () {
        chai_1.expect(testFunc(null)).to.be.false;
    });
    it("returns false if given undefined or no value at all", function () {
        chai_1.expect(testFunc(undefined)).to.be.false;
        chai_1.expect(testFunc()).to.be.false;
    });
    it("returns false if given NaN", function () {
        chai_1.expect(testFunc(NaN)).to.be.false;
    });
    it("returns false if given an empty string", function () {
        chai_1.expect(testFunc('')).to.be.false;
    });
    it("returns false if given a non-empty string", function () {
        chai_1.expect(testFunc('gr')).to.be.false;
        chai_1.expect(testFunc('okokokok')).to.be.false;
        chai_1.expect(testFunc('some test value')).to.be.false;
        chai_1.expect(testFunc(' ')).to.be.false;
    });
    it("returns false if given a function that resolves to an int", function () {
        chai_1.expect(testFunc(function () { return 23; })).to.be.false;
        chai_1.expect(testFunc(function () { return 1; })).to.be.false;
    });
    it("returns false if given any function", function () {
        chai_1.expect(testFunc(function (arg1) { return console.log(arg1); })).to.be.false;
        chai_1.expect(testFunc(function someTestFunction() {
            console.log('Random behaviour for test function');
        })).to.be.false;
    });
    it("returns false given itself (" + (testFunc && testFunc.name) + ")", function () {
        chai_1.expect(testFunc(testFunc)).to.be.false;
    });
    it("returns false given Number built-in object (prototype)", function () {
        chai_1.expect(testFunc(Number)).to.be.false;
    });
    it("returns false given any other built-in object (doesn't test 'Number')", function () {
        chai_1.expect(testFunc(Object)).to.be.false;
        chai_1.expect(testFunc(Array)).to.be.false;
        chai_1.expect(testFunc(Math)).to.be.false;
        chai_1.expect(testFunc(ArrayBuffer)).to.be.false;
        chai_1.expect(testFunc(String)).to.be.false;
        chai_1.expect(testFunc(Boolean)).to.be.false;
        chai_1.expect(testFunc(Function)).to.be.false;
        chai_1.expect(testFunc(JSON)).to.be.false;
        chai_1.expect(testFunc(Map)).to.be.false;
        chai_1.expect(testFunc(Set)).to.be.false;
        chai_1.expect(testFunc(Error)).to.be.false;
        chai_1.expect(testFunc(RegExp)).to.be.false;
        chai_1.expect(testFunc(Date)).to.be.false;
    });
}
//# sourceMappingURL=types.spec.js.map