"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
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
            chai_1.expect(testUuid1).to.match(/^[a-z0-9]{8}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{4}\-[a-z0-9]{12}$/);
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
    describe("isUUID", function () {
        it("returns true if given an uppercase v4 UUID", function () {
            chai_1.expect(number_1.isUUID("AF2461E9-231F-4D6D-91AC-CD5FD6B9C00F")).to.equal(true);
            chai_1.expect(number_1.isUUID("EB3DBB20-EF5F-4954-B8BB-6F95DDDD4023")).to.equal(true);
        });
        it("returns true if given a lowercase v4 UUID", function () {
            chai_1.expect(number_1.isUUID("af2461e9-231f-4d6d-91ac-cd5fd6b9c00f")).to.equal(true);
            chai_1.expect(number_1.isUUID("eb3dbb20-ef5f-4954-b8bb-6f95dddd4023")).to.equal(true);
        });
        it("returns false if not given a string", function () {
            chai_1.expect(number_1.isUUID(null)).to.equal(false);
            chai_1.expect(number_1.isUUID(undefined)).to.equal(false);
            chai_1.expect(number_1.isUUID([])).to.equal(false);
            chai_1.expect(number_1.isUUID(123)).to.equal(false);
            chai_1.expect(number_1.isUUID({})).to.equal(false);
            chai_1.expect(number_1.isUUID(true)).to.equal(false);
            chai_1.expect(number_1.isUUID(false)).to.equal(false);
        });
        it("returns false if given a string that isn't a UUID", function () {
            chai_1.expect(number_1.isUUID("Should return false")).to.equal(false);
            chai_1.expect(number_1.isUUID("NOT A UUID")).to.equal(false);
            chai_1.expect(number_1.isUUID("")).to.equal(false);
        });
        it("returns false if given an invalid UUID", function () {
            chai_1.expect(number_1.isUUID("INVALID-UUID-THIS-ISNT-ALLOWED9C00F")).to.equal(false);
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
        it("should always output 1, 2, 3, 4, 5, or 6", function () {
            browser_1.loopN(50, function () {
                chai_1.expect(number_1.diceRoll6Sided()).to.be.a('number');
                chai_1.expect(number_1.diceRoll6Sided())
                    .to.be.lessThan(7)
                    .and.greaterThan(0);
                var roll = number_1.diceRoll6Sided();
                chai_1.expect(Math.round(roll)).to.eql(roll);
            });
        });
    });
    describe("getRandomInt", function () {
        it("returns a random integer between min and max values", function () {
            browser_1.loopN(100, function () {
                var val = number_1.getRandomInt(0, 10);
                chai_1.expect(val)
                    .to.be.greaterThan(-1)
                    .and.lessThan(11);
            });
        });
        it("returns min/max value if min & max value are equal", function () {
            chai_1.expect(number_1.getRandomInt(1, 1)).to.eql(1);
        });
        it("can return the min val and the max val, and any int in between", function () {
            var res = [];
            browser_1.loopN(250, function () { return res.push(number_1.getRandomInt(0, 3)); });
            chai_1.expect(res).to.include(0);
            chai_1.expect(res).to.include(1);
            chai_1.expect(res).to.include(2);
            chai_1.expect(res).to.include(3);
        });
    });
});
//# sourceMappingURL=number.spec.js.map