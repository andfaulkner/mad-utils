/// <reference path="../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, string } from '../index';

const str = m_.string;

describe(`string sub-module`, function() {
    it(`exists`, function() {
        expect(string).to.exist;
    });

    it('.capitalize -- capitalizes first char of given string', function() {
        expect(mUtils.string.capitalize('asdf')).to.eql('Asdf');
        expect(mUtils.str.capitalize('the quick brown fox')).to.eql('The quick brown fox');
        expect(mUtils.str.capitalize(' quick brown fox')).to.eql(' quick brown fox');
        expect(mUtils.str.capitalize('Quick brown fox')).to.eql('Quick brown fox');
        expect(mUtils.str.capitalize('The Quick Brown Fox')).to.eql('The Quick Brown Fox');
        expect(mUtils.str.capitalize('the Quick Brown Fox')).to.eql('The Quick Brown Fox');
        expect(mUtils.str.capitalize('THE QUICK BROWN FOX')).to.eql('THE QUICK BROWN FOX');
    });

    it('.cap1LowerRest -- capitalizes 1st char of given string, turns rest to lowercase', function() {
        expect(mUtils.string.cap1LowerRest('asdf')).to.eql('Asdf');
        expect(mUtils.str.cap1LowerRest('the quick brown fox')).to.eql('The quick brown fox');
        expect(mUtils.str.cap1LowerRest(' quick brown fox')).to.eql(' quick brown fox');
        expect(mUtils.str.cap1LowerRest('Quick brown fox')).to.eql('Quick brown fox');
        expect(mUtils.str.cap1LowerRest('The Quick Brown Fox')).to.eql('The quick brown fox');
        expect(mUtils.str.cap1LowerRest('the Quick Brown Fox')).to.eql('The quick brown fox');
        expect(mUtils.str.cap1LowerRest('THE QUICK BROWN FOX')).to.eql('The quick brown fox');
    });
});
