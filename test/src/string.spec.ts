/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT STRING MODULE FOR TESTING ********************************/
import { expect } from 'chai';

import { m_, string } from '../../shared';

import { expectFunctionExists, replaceAll, cap1LowerRest, capitalize } from '../../node';

const str = m_.string;


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
});
