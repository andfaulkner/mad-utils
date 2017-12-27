"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
//
//  FULLY TESTED
//
/*************************************** IMPORT TEST UTILS ****************************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var numberModule = require("../../src/number");
var number_1 = require("../../src/number");
/********************************************* TESTS **********************************************/
describe("number sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.number, 'number (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.number, 'number (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(numberModule, 'number (import all from number.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.number, 'number (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.number, 'number (from Browser export)');
    test_1.expectFunctionExists(shared_1.number.isInt, 'number.isInt', '(from types-iso');
    test_1.expectFunctionExists(shared_1.number.isNumberLike, 'number.isInt', '(from types-iso');
    test_1.expectFunctionExists(shared_1.number.uuid, 'number.uuid', '(from number)');
    describe('uuid', function () {
        it("generates a valid UUID if run as a function", function () {
            var testUuid1 = shared_1.number.uuid();
            console.log("\n    number.uuid: testUuid1:", testUuid1);
            chai_1.expect(testUuid1).to.exist;
            chai_1.expect(testUuid1).to.be.a('string');
            chai_1.expect(testUuid1)
                .to.match(/^[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}$/);
        });
        test_1.expectFunctionExists(browser_1.uuid.len6, 'uuid.len6');
        test_1.expectFunctionExists(browser_1.uuid.len8, 'uuid.len8');
        test_1.expectFunctionExists(browser_1.uuid.noDashes, 'uuid.noDashes');
        it(".len6 -- ", function () {
            chai_1.expect(browser_1.uuid.len6()).to.be.a('string');
            chai_1.expect(browser_1.uuid.len6()).to.have.length(6);
        });
        it(".len8 -- ", function () {
            chai_1.expect(browser_1.uuid.len8()).to.be.a('string');
            chai_1.expect(browser_1.uuid.len8()).to.have.length(8);
        });
        it(".noDashes -- ", function () {
            chai_1.expect(browser_1.uuid.noDashes()).to.be.a('string');
            chai_1.expect(browser_1.uuid.noDashes()).to.have.length(32);
            chai_1.expect(browser_1.uuid.noDashes()).not.to.contain('-');
        });
    });
    describe('createRangeArray', function () {
        it("should create an array of numbers incrementing by 1, by default", function () {
            chai_1.expect(number_1.createRangeArray(0, 10)).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
        it("should create an array of numbers incrementing by value of 3rd arg", function () {
            chai_1.expect(number_1.createRangeArray(0, 10, 2)).to.eql([0, 2, 4, 6, 8, 10]);
        });
        it("should create an array of numbers starting & ending at given values", function () {
            chai_1.expect(number_1.createRangeArray(-10, 20, 5)).to.eql([-10, -5, 0, 5, 10, 15, 20]);
        });
        it("should create an array with a single value when start == end val", function () {
            chai_1.expect(number_1.createRangeArray(10, 10, 22)).to.eql([10]);
        });
        it("should throw if given 0 as an incrementor where start !== end val", function () {
            chai_1.expect(function () { return number_1.createRangeArray(1000, 2000, 0); }).to.throw();
        });
        it("should NOT throw if given 0 as an incrementor, but start === end val", function () {
            chai_1.expect(function () { return number_1.createRangeArray(1000, 1000, 0); }).to.not.throw();
        });
        it("should create arr of numbers when given positive incrementor, & end > start", function () {
            chai_1.expect(number_1.createRangeArray(-10, 20, 5)).to.eql([-10, -5, 0, 5, 10, 15, 20]);
        });
        it("should create arr of numbers when given positive incrementor, & end < start", function () {
            chai_1.expect(number_1.createRangeArray(20, -10, 5)).to.eql([20, 15, 10, 5, 0, -5, -10]);
        });
        it("should create arr of numbers when given negative incrementor, & end > start val", function () {
            chai_1.expect(number_1.createRangeArray(-10, 20, -5)).to.eql([-10, -5, 0, 5, 10, 15, 20]);
        });
        it("should create arr of numbers when given negative incrementor, & end < start val", function () {
            chai_1.expect(number_1.createRangeArray(20, -10, -5)).to.eql([20, 15, 10, 5, 0, -5, -10]);
        });
    });
    describe('coinFlip', function () {
        it("should produce either HEADS or TAILS every time, & at least 1 of each within 500 runs", function () {
            var didGetHeads = false;
            var didGetTails = false;
            for (var i = 0; i < 500; i++) {
                if (number_1.coinFlip() === 'HEADS')
                    didGetHeads = true;
                if (number_1.coinFlip() === 'TAILS')
                    didGetTails = true;
                if (didGetHeads && didGetTails)
                    break;
            }
            chai_1.expect(didGetHeads).to.be.true;
            chai_1.expect(didGetTails).to.be.true;
        });
    });
    describe('diceRoll6Sided', function () {
        it("should output 1, 2, 3, 4, 5, or 6", function () {
            chai_1.expect(number_1.diceRoll6Sided()).to.be.a('number');
            chai_1.expect(number_1.diceRoll6Sided()).to.be.lessThan(7).and.greaterThan(0);
            var roll = number_1.diceRoll6Sided();
            chai_1.expect(Math.round(roll)).to.eql(roll);
        });
    });
});
//# sourceMappingURL=number.spec.js.map