/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

/****************************** IMPORT MIDDLEWARE MODULE FOR TESTING ******************************/
import { m_, locale } from '../../shared';
import { locale as localeFromNode } from '../../node';
import { locale as localeFromBrowser } from '../../browser';
import * as localeModule from '../../src/locale';


/********************************************* TESTS **********************************************/
describe(`locale sub-module`, function() {
    expectNonEmptyObjectExists(locale, 'locale (from shared/base export)');
    expectNonEmptyObjectExists(m_.locale, 'locale (from m_ top-level namespace)');
    expectNonEmptyObjectExists(localeModule, 'locale (import all from locale.ts file)');
    expectNonEmptyObjectExists(localeFromNode, 'locale (from Node export)');
    expectNonEmptyObjectExists(localeFromBrowser, 'locale (from Browser export)');

    it(`has object commonLangsObj, where all values are strings (full language names)`, function() {
        expect(locale.commonLangsObj).to.exist;
        expect(locale.commonLangsObj).to.be.an('object');
        expect(locale.commonLangsObj[Object.keys(locale.commonLangsObj)[0]])
                .to.be.a('string');
    });
    it(`has array of strings commonLangAbbrevs`, function() {
        expect(locale.commonLangAbbrevs).to.exist;
        expect(locale.commonLangAbbrevs).to.be.an('array');
        expect(locale.commonLangAbbrevs[0]).to.be.a('string');
    });
    it(`has array of strings commonLangNames`, function() {
        expect(locale.commonLangNames).to.exist;
        expect(locale.commonLangNames).to.be.an('array');
        expect(locale.commonLangNames[0]).to.be.a('string');
    });
    it(`has object canadaLangsObj, where all values are strings (full language names)`, function() {
        expect(locale.canadaLangsObj).to.exist;
        expect(locale.canadaLangsObj).to.be.an('object');
        expect(locale.canadaLangAbbrevs[Object.keys(locale.canadaLangAbbrevs)[0]])
                .to.be.a('string');
    });
    it(`has array of strings canadaLangAbbrevs`, function() {
        expect(locale.canadaLangAbbrevs).to.exist;
        expect(locale.canadaLangAbbrevs).to.be.an('array');
        expect(locale.canadaLangAbbrevs[0]).to.be.a('string');
    });
    it(`has array of strings canadaLangNames`, function() {
        expect(locale.canadaLangNames).to.exist;
        expect(locale.canadaLangNames).to.be.an('array');
        expect(locale.canadaLangNames[0]).to.be.a('string');
    });
});
