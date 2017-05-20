/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT ARRAY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, array, append, first } from '../../shared';

const arr = m_.array;


/********************************************* TESTS **********************************************/
describe(`array sub-module`, function() {
    it(`exists`, function() {
        expect(array).to.exist;
    });
    it(`.append : merges all given arrays into 1`, function() {
        expect(append([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
        expect(append([1, 2], [3, 4], [5, 6])).to.eql([1, 2, 3, 4, 5, 6]);
        expect(append([1, 2], null, [5, 6])).to.eql([1, 2, 5, 6]);
    });
    it(`-- exists : #append`, function() {
        expect(m_.array.append).to.exist;
        expect(append).to.exist;
    });
    it(`.append : merges all given arrays into 1`, function() {
        expect(append([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
        expect(append([1, 2], [3, 4], [5, 6])).to.eql([1, 2, 3, 4, 5, 6]);
        expect(append([1, 2], null, [5, 6])).to.eql([1, 2, 5, 6]);
    });
    it(`-- exists : #first`, function() {
        expect(m_.array.first).to.exist;
        expect(first).to.exist;
    });
    it(`-- exists : #second`, function() { expect(m_.array.second).to.exist; });
    it(`-- exists : #third`, function() { expect(m_.array.third).to.exist; });
    it(`-- exists : #without.last`, function() {
        expect(m_.array.without.last).to.exist;
    });
    it(`-- exists : #without.last2`, function() {
        expect(m_.array.without.last2).to.exist;
    });
    it(`-- exists : #without.last3`, function() {
        expect(m_.array.without.last3).to.exist;
    });
    it(`-- exists : #without.first`, function() {
        expect(m_.array.without.first).to.exist;
    });
    it(`-- exists : #without.first2`, function() {
        expect(m_.array.without.first2).to.exist;
    });
    it(`-- exists : #without.first3`, function() {
        expect(m_.array.without.first3).to.exist;
    });
    it(`-- exists : #without.firstN`, function() {
        expect(m_.array.without.firstN).to.exist;
    });
});
