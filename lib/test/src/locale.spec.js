"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
/****************************** IMPORT MIDDLEWARE MODULE FOR TESTING ******************************/
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var localeModule = require("../../src/locale");
/********************************************* TESTS **********************************************/
describe("locale sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.locale, 'locale (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.locale, 'locale (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(localeModule, 'locale (import all from locale.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.locale, 'locale (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.locale, 'locale (from Browser export)');
    it("has object commonLangsObj, where all values are strings (full language names)", function () {
        chai_1.expect(shared_1.locale.commonLangsObj).to.exist;
        chai_1.expect(shared_1.locale.commonLangsObj).to.be.an('object');
        chai_1.expect(shared_1.locale.commonLangsObj[Object.keys(shared_1.locale.commonLangsObj)[0]])
            .to.be.a('string');
    });
    it("has array of strings commonLangAbbrevs", function () {
        chai_1.expect(shared_1.locale.commonLangAbbrevs).to.exist;
        chai_1.expect(shared_1.locale.commonLangAbbrevs).to.be.an('array');
        chai_1.expect(shared_1.locale.commonLangAbbrevs[0]).to.be.a('string');
    });
    it("has array of strings commonLangNames", function () {
        chai_1.expect(shared_1.locale.commonLangNames).to.exist;
        chai_1.expect(shared_1.locale.commonLangNames).to.be.an('array');
        chai_1.expect(shared_1.locale.commonLangNames[0]).to.be.a('string');
    });
    it("has object canadaLangsObj, where all values are strings (full language names)", function () {
        chai_1.expect(shared_1.locale.canadaLangsObj).to.exist;
        chai_1.expect(shared_1.locale.canadaLangsObj).to.be.an('object');
        chai_1.expect(shared_1.locale.canadaLangAbbrevs[Object.keys(shared_1.locale.canadaLangAbbrevs)[0]])
            .to.be.a('string');
    });
    it("has array of strings canadaLangAbbrevs", function () {
        chai_1.expect(shared_1.locale.canadaLangAbbrevs).to.exist;
        chai_1.expect(shared_1.locale.canadaLangAbbrevs).to.be.an('array');
        chai_1.expect(shared_1.locale.canadaLangAbbrevs[0]).to.be.a('string');
    });
    it("has array of strings canadaLangNames", function () {
        chai_1.expect(shared_1.locale.canadaLangNames).to.exist;
        chai_1.expect(shared_1.locale.canadaLangNames).to.be.an('array');
        chai_1.expect(shared_1.locale.canadaLangNames[0]).to.be.a('string');
    });
});
//# sourceMappingURL=locale.spec.js.map