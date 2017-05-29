/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/********************************* IMPORT DATE MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, date, isLeapYear, isDateLike } from '../../shared';

import { expectFunctionExists } from '../../node';

const dateFns = m_.date;


/********************************************* TESTS **********************************************/
describe(`date sub-module`, function() {
    it(`exists`, function() {
        expect(date).to.exist;
        expect(m_.date).to.exist;
    });
    describe(`isLeapYear function`, function() {
        expectFunctionExists(isLeapYear);
        it(`Returns true if given number is a leap year`, function() {
            expect(isLeapYear(4)).to.be.true;
            expect(isLeapYear(120)).to.be.true;
            expect(isLeapYear(2016)).to.be.true;
            expect(isLeapYear(1600)).to.be.true;
            expect(isLeapYear(2000)).to.be.true;
        });
        it(`Returns false if given number is not leap year`, function() {
            expect(isLeapYear(5)).to.be.false;
            expect(isLeapYear(101)).to.be.false;
            expect(isLeapYear(2017)).to.be.false;
            expect(isLeapYear(1700)).to.be.false;
            expect(isLeapYear(1900)).to.be.false;
            expect(isLeapYear(2100)).to.be.false;
        });
        it(`Implicitly converts strings & 1-item arrays w/ an int or string to an int`, function() {
            expect(isLeapYear('5')).to.be.false;
            expect(isLeapYear('1600')).to.be.true;
            expect(isLeapYear(['5'])).to.be.false;
            expect(isLeapYear(['1600'])).to.be.true;
        });
        it(`throws error if given a value that cannot be converted to an int`, function() {
            expect(() => isLeapYear({ 1: '5' } as any)).to.throw(Error);
            expect(() => isLeapYear([1, 2, 3])).to.throw(Error);
            expect(() => isLeapYear('asdf')).to.throw(Error);
            expect(() => isLeapYear({} as any)).to.throw(Error);
            expect(() => isLeapYear([])).to.throw(Error);
            expect(() => isLeapYear(null)).to.throw(Error);
            expect(() => isLeapYear(undefined)).to.throw(Error);
            expect(() => isLeapYear(Object as any)).to.throw(Error);
            expect(() => isLeapYear((() => 'gr') as any)).to.throw(Error);
            expect(() => isLeapYear('')).to.throw(Error);
        });
    });
});

