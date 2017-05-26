/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT STRING MODULE FOR TESTING ********************************/
import { expect } from 'chai';

import { m_, string } from '../../shared';

import { expectFunctionExists } from '../../node';

const str = m_.string;
const { matches, replaceAll, cap1LowerRest, capitalize, escapeRegExp, eliminateWhitespace} = str;


/********************************************* TESTS **********************************************/
describe(`string sub-module`, function() {
    it(`exists`, function() {
        expect(string).to.exist;
    });

    expectFunctionExists(capitalize);
    it('.capitalize -- capitalizes first char of given string', function() {
        expect(m_.string.capitalize('asdf')).to.eql('Asdf');
        expect(m_.str.capitalize('the quick brown fox')).to.eql('The quick brown fox');
        expect(m_.str.capitalize(' quick brown fox')).to.eql(' quick brown fox');
        expect(m_.str.capitalize('Quick brown fox')).to.eql('Quick brown fox');
        expect(m_.str.capitalize('The Quick Brown Fox')).to.eql('The Quick Brown Fox');
        expect(m_.str.capitalize('the Quick Brown Fox')).to.eql('The Quick Brown Fox');
        expect(m_.str.capitalize('THE QUICK BROWN FOX')).to.eql('THE QUICK BROWN FOX');
    });

    expectFunctionExists(cap1LowerRest);
    it('.cap1LowerRest -- capitalizes 1st char of given string, turns rest to lowercase', function() {
        expect(m_.string.cap1LowerRest('asdf')).to.eql('Asdf');
        expect(m_.str.cap1LowerRest('the quick brown fox')).to.eql('The quick brown fox');
        expect(m_.str.cap1LowerRest(' quick brown fox')).to.eql(' quick brown fox');
        expect(m_.str.cap1LowerRest('Quick brown fox')).to.eql('Quick brown fox');
        expect(m_.str.cap1LowerRest('The Quick Brown Fox')).to.eql('The quick brown fox');
        expect(m_.str.cap1LowerRest('the Quick Brown Fox')).to.eql('The quick brown fox');
        expect(m_.str.cap1LowerRest('THE QUICK BROWN FOX')).to.eql('The quick brown fox');
    });

    describe('function replaceAll', function() {
        const testStr = 'The duck here is the best Jerry! The best!';

        expectFunctionExists(replaceAll);
        it(`should replace all matching instances of given string w given replacement`, function() {
            const replacedStr = replaceAll(testStr, 'best', 'bees-knees');
            expect(replacedStr).to.equal('The duck here is the bees-knees Jerry! The bees-knees!');

            const replacedWRegex = replaceAll(testStr, /[tT]he best/g, 'OK');
            expect(replacedWRegex).to.equal('The duck here is OK Jerry! OK!');
        });
    });

    describe('function "matches"', function() {
        expectFunctionExists(matches);
        it(`should return true if used as a predicate in a find operation where the string ` +
            `given to match can be found in the array .find is being called on`, function()
        {
            expect(['hello', 'everybody'].some(matches('everybody'))).to.be.true;
            expect([1, 2, 3].some(matches(2))).to.be.true;
            expect(['hello', 'everybody'].some(matches('dr nick'))).to.be.false;
            expect([1, '2', 3].some(matches(2))).to.be.false;
            expect([1, 2, 3].some(matches('2'))).to.be.false;
        });
    });

    describe('escapeRegExp', function() {
        expectFunctionExists(escapeRegExp);
        it(`converts string to form that lets it be used as a pure 'literal' (where special regex` +
            `chars in the string are escaped for use as regular, literal values) when building ` +
            `regexes with new RegExp`, function()
        {
            expect(escapeRegExp('')).to.eql('');
            expect(escapeRegExp('asdf')).to.eql('asdf');
            expect(escapeRegExp('ok[2]')).to.eql('ok\\[2\\]');
            expect(escapeRegExp('*.min.js')).to.eql('\\*\\.min\\.js');

            const filenamesListMatches = 'config/*.ts, src/*.js, build/*.min.js, script/*.js'
                    .match(new RegExp(escapeRegExp('*.js'), 'g'));
            expect(filenamesListMatches).to.eql(['*.js', '*.js']);
        });
    });

    describe('eliminateWhitespace', function() {
        expectFunctionExists(eliminateWhitespace);
        it(`should remove all whitespace from a string (non-mutatively)`, function() {
            expect(eliminateWhitespace('asdf')).to.eql('asdf');
            expect(eliminateWhitespace(' asdf ')).to.eql('asdf');
            expect(eliminateWhitespace(' hello universe! ')).to.eql('hellouniverse!');
            expect(eliminateWhitespace('        w ')).to.eql('w');
            expect(eliminateWhitespace('And   Now For   Something     Completely Different     '))
                .to.eql('AndNowForSomethingCompletelyDifferent');
            expect(eliminateWhitespace('         ')).to.eql('');
        });
    });

});
