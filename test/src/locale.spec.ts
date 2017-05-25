/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT MIDDLEWARE MODULE FOR TESTING ******************************/
import { expect } from 'chai';

import { m_, locale } from '../../shared';

const mw = m_.locale;


/********************************************* TESTS **********************************************/
describe(`locale sub-module`, function() {
    it(`exists`, function() {
        expect(locale).to.exist;
    });
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
