"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** LOGGING *********************************************/
var node_1 = require("mad-logs/lib/node");
var log = node_1.nodeLogFactory(node_1.buildFileTag('enum.spec.ts', node_1.colors.blue.bgMagenta));
/******************************** IMPORT ENUM MODULE FOR TESTING **********************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
var shared_1 = require("../../shared");
var node_2 = require("../../node");
var browser_1 = require("../../browser");
var EnumModule = require("../../src/enum");
var en = shared_1.m_.enum;
/********************************************* TESTS **********************************************/
describe("enum sub-module", function () {
    var ColorTest;
    (function (ColorTest) {
        ColorTest[ColorTest["BLUE"] = 0] = "BLUE";
        ColorTest[ColorTest["ReD"] = 1] = "ReD";
        ColorTest[ColorTest["black"] = 2] = "black";
    })(ColorTest || (ColorTest = {}));
    var Suits;
    (function (Suits) {
        Suits[Suits["HEARTS"] = 0] = "HEARTS";
        Suits[Suits["CLUBS"] = 1] = "CLUBS";
        Suits[Suits["SPADES"] = 2] = "SPADES";
        Suits[Suits["DIAMONDS"] = 3] = "DIAMONDS";
    })(Suits || (Suits = {}));
    test_1.expectNonEmptyObjectExists(shared_1.Enum, 'Enum (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.Enum, 'Enum (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(EnumModule, 'Enum (import all from Enum.ts file)');
    test_1.expectNonEmptyObjectExists(node_2.Enum, 'Enum (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.Enum, 'Enum (from Browser export)');
    it('.enumValToString -- Converts an enum item into a string', function () {
        chai_1.expect(shared_1.m_.enum.enumValToString(ColorTest, ColorTest.ReD)).to.eql('ReD');
        chai_1.expect(shared_1.m_.enum.enumValToString(ColorTest, ColorTest.BLUE)).to.eql('BLUE');
        chai_1.expect(shared_1.m_.enum.enumValToString(ColorTest, ColorTest.black)).to.eql('black');
    });
    it('.enumToStringArray -- Converts an enum into an ordered array of strings', function () {
        chai_1.expect(shared_1.m_.enum.enumToStringArray(ColorTest)).to.eql(['BLUE', 'ReD', 'black']);
        chai_1.expect(shared_1.m_.enum.enumToStringArray(ColorTest)).to.not.eql(['ReD', 'BLUE', 'black']);
    });
    describe('.stringToEnumVal --', function () {
        it('Returns numeric enum val if given enum has given val.', function () {
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('black', ColorTest)).to.eql(2);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('HEARTS', Suits)).to.eql(0);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('BLUE', ColorTest)).to.eql(0);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('ReD', ColorTest)).to.eql(1);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('SPADES', Suits)).to.eql(2);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('DIAMONDS', Suits)).to.eql(3);
        });
        it('Ignores caps.', function () {
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('Black', ColorTest)).to.eql(2);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('BLACK', ColorTest)).to.eql(2);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('BLaCK', ColorTest)).to.eql(2);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('BluE', ColorTest)).to.eql(0);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('RED', ColorTest)).to.eql(1);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('diamonds', Suits)).to.eql(3);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('dIaMoNDs', Suits)).to.eql(3);
        });
        it('Return 99999 if no match, including indexes', function () {
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('O_R_a_N_g_E', ColorTest)).to.eql(99999);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('1', ColorTest)).to.eql(99999);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('0', ColorTest)).to.eql(99999);
            chai_1.expect(shared_1.m_.enum.stringToEnumVal('2', Suits)).to.eql(99999);
        });
    });
    // tslint:disable-next-line
    it('.isDataEnumItem -- Detects if a str matches an enum val & accounts for the index vals.)', function () {
        log.silly("isDataEnumItem tests :: Suits['HEARTS']:", Suits['HEARTS']);
        chai_1.expect(shared_1.m_.enum.isDataEnumItem('HEARTS', Suits)).to.be.true;
        log.silly("isDataEnumItem tests :: Suits['WRENCHES']:", Suits['WRENCHES']);
        chai_1.expect(shared_1.m_.enum.isDataEnumItem('WRENCHES', Suits)).to.be.false;
        log.silly("isDataEnumItem tests :: Suits['1']:", Suits['1']);
        chai_1.expect(shared_1.m_.enum.isDataEnumItem('1', Suits)).to.be.false;
        chai_1.expect(shared_1.m_.enum.isDataEnumItem('0', Suits)).to.be.false;
        chai_1.expect(shared_1.m_.enum.isDataEnumItem(1, Suits)).to.be.false;
        log.silly('isDataEnumItem tests :: Suits[0]:', Suits[0]);
        chai_1.expect(shared_1.m_.enum.isDataEnumItem(0, Suits)).to.be.false;
    });
});
//# sourceMappingURL=enum.spec.js.map