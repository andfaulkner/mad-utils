// TODO test isDateLike

/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/********************************* IMPORT DATE MODULE FOR TESTING *********************************/
import {expect} from 'chai';
import {isVerbose} from 'env-var-helpers';
import * as moment from 'moment';
import 'moment/locale/fr-ca';

import {m_, date, isLeapYear, isDateLike, dateStringWithMonthTextToMoment} from '../../shared';
import {date as dateFromNode} from '../../node';
import {date as dateFromBrowser} from '../../browser';
import * as dateModule from '../../src/date';

import {expectNonEmptyObjectExists} from '../../src/node/test';
import {expectFunctionExists, convertDayOfWeekNumToString, now} from '../../node';

/********************************************* TESTS **********************************************/
describe.only(`date sub-module`, function() {
    expectNonEmptyObjectExists(date, 'date (from shared/base export)');
    expectNonEmptyObjectExists(m_.date, 'date (from m_ top-level namespace)');
    expectNonEmptyObjectExists(dateModule, 'date (import all from date.ts file)');
    expectNonEmptyObjectExists(dateFromNode, 'date (from Node export)');
    expectNonEmptyObjectExists(dateFromBrowser, 'date (from Browser export)');

    describe(`isLeapYear function`, function() {
        expectFunctionExists(isLeapYear);
        expectFunctionExists(m_.date.isLeapYear);
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
        it(`Implicitly converts strings to int`, function() {
            expect(isLeapYear('5')).to.be.false;
            expect(isLeapYear('1600')).to.be.true;
        });
        it(`throws error if given a value that cannot be converted to an integer`, function() {
            expect(() => isLeapYear({1: '5'} as any)).to.throw(Error);
            expect(() => isLeapYear([1, 2, 3] as any)).to.throw(Error);
            expect(() => isLeapYear('asdf')).to.throw(Error);
            expect(() => isLeapYear({} as any)).to.throw(Error);
            expect(() => isLeapYear([] as any)).to.throw(Error);
            expect(() => isLeapYear(null)).to.throw(Error);
            expect(() => isLeapYear(undefined)).to.throw(Error);
            expect(() => isLeapYear(Object as any)).to.throw(Error);
            expect(() => isLeapYear((() => 'gr') as any)).to.throw(Error);
            expect(() => isLeapYear('')).to.throw(Error);
        });
    });

    describe(`convertDayOfWeekNumToString function`, function() {
        expectFunctionExists(convertDayOfWeekNumToString);
        expectFunctionExists(m_.date.convertDayOfWeekNumToString);
        it(`converts 0 into 'Sunday'`, function() {
            expect(convertDayOfWeekNumToString(0)).to.equal('Sunday');
            expect(convertDayOfWeekNumToString('0')).to.equal('Sunday');
        });
        it(`converts 1 or '1' into 'Monday'`, function() {
            expect(convertDayOfWeekNumToString(1)).to.equal('Monday');
            expect(convertDayOfWeekNumToString('1')).to.equal('Monday');
        });
        it(`converts 2 or '2' into 'Tuesday'`, function() {
            expect(convertDayOfWeekNumToString(2)).to.equal('Tuesday');
            expect(convertDayOfWeekNumToString('2')).to.equal('Tuesday');
        });
        it(`converts 3 or '3' into 'Wednesday'`, function() {
            expect(convertDayOfWeekNumToString(3)).to.equal('Wednesday');
            expect(convertDayOfWeekNumToString('3')).to.equal('Wednesday');
        });
        it(`converts 4 or '4' into 'Thursday'`, function() {
            expect(convertDayOfWeekNumToString(4)).to.equal('Thursday');
            expect(convertDayOfWeekNumToString('4')).to.equal('Thursday');
        });
        it(`converts 5 or '5' into 'Friday'`, function() {
            expect(convertDayOfWeekNumToString(5)).to.equal('Friday');
            expect(convertDayOfWeekNumToString('5')).to.equal('Friday');
        });
        it(`converts 6 or '6' into 'Saturday'`, function() {
            expect(convertDayOfWeekNumToString(6)).to.equal('Saturday');
            expect(convertDayOfWeekNumToString('6')).to.equal('Saturday');
        });

        const doesAbbreviateMsg = '(i.e. it abbreviates if arg 2 is true)';
        it(`converts args (0, true) or ('0', true) into 'Sun' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(0, true)).to.equal('Sun');
            expect(convertDayOfWeekNumToString('0', true)).to.equal('Sun');
        });
        it(`converts args (1, true) or ('1', true) into 'Mon' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(1, true)).to.equal('Mon');
            expect(convertDayOfWeekNumToString('1', true)).to.equal('Mon');
        });
        it(`converts args (2, true) or ('2', true) into 'Tue' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(2, true)).to.equal('Tues');
            expect(convertDayOfWeekNumToString('2', true)).to.equal('Tues');
        });
        it(`converts args (3, true) or ('3', true) into 'Wed' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(3, true)).to.equal('Wed');
            expect(convertDayOfWeekNumToString('3', true)).to.equal('Wed');
        });
        it(`converts args (4, true) or ('4', true) into 'Thu' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(4, true)).to.equal('Thurs');
            expect(convertDayOfWeekNumToString('4', true)).to.equal('Thurs');
        });
        it(`converts args (5, true) or ('5', true) into 'Fri' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(5, true)).to.equal('Fri');
            expect(convertDayOfWeekNumToString('5', true)).to.equal('Fri');
        });
        it(`converts args (6, true) or ('6', true) into 'Sat' ${doesAbbreviateMsg}`, function() {
            expect(convertDayOfWeekNumToString(6, true)).to.equal('Sat');
            expect(convertDayOfWeekNumToString('6', true)).to.equal('Sat');
        });

        it(`throws if given a number/numberString outside the 0-6 range, or another type.`, function() {
            expect(() => convertDayOfWeekNumToString('7' as any)).to.throw();
            expect(() => convertDayOfWeekNumToString(7 as any)).to.throw();
            expect(() => convertDayOfWeekNumToString(-1 as any)).to.throw();
            expect(() => convertDayOfWeekNumToString(-1 as any)).to.throw();
            expect(() => convertDayOfWeekNumToString('asdf' as any)).to.throw();
            expect(() => convertDayOfWeekNumToString([] as any)).to.throw();
            expect(() => convertDayOfWeekNumToString({} as any)).to.throw();
        });
    });

    describe(`now function`, function() {
        expectFunctionExists(now);
        it(`should return current date & time in YYYY/MM/DD : HH:MM:SS format if given no args`, function() {
            const jsNow = new Date();
            const jsFormattedDateTime =
                `${jsNow.getFullYear()}/` +
                `${jsNow.getMonth() < 9 ? `0` : ``}${jsNow.getMonth() + 1}/` +
                `${jsNow.getDate() < 10 ? `0` : ``}${jsNow.getDate()} : ` +
                `${jsNow.getHours() < 10 ? `0` : ``}${jsNow.getHours()}:` +
                `${jsNow.getMinutes() < 10 ? `0` : ``}${jsNow.getMinutes()}:` +
                `${jsNow.getSeconds() < 10 ? `0` : ``}${jsNow.getSeconds()}`;
            if (isVerbose) console.log('date.spec.ts :: now :: jsNow:', jsNow);
            if (isVerbose)
                console.log('date.spec.ts :: now :: jsFormattedDateTime:', jsFormattedDateTime);
            expect(now()).to.eql(jsFormattedDateTime);
        });
        it(
            `should return current date & time in any valid MomentJS format (e.g. YYYY/MM/DD) ` +
                `given as an arg`,
            function() {
                const jsNow = new Date();
                const jsFormattedDate =
                    `${jsNow.getFullYear()}/` +
                    `${jsNow.getMonth() < 9 ? `0` : ``}${jsNow.getMonth() + 1}/` +
                    `${jsNow.getDate() < 10 ? `0` : ``}${jsNow.getDate()}`;
                expect(now(`YYYY/MM/DD`)).to.eql(jsFormattedDate);
            }
        );
    });

    describe(`dateStringWithMonthTextToMoment function`, function() {
        expectFunctionExists(dateStringWithMonthTextToMoment);
        expectFunctionExists(m_.date.dateStringWithMonthTextToMoment);
        it(`Handles a variety of inputs`, function() {
            const origLocale = moment.locale();
            moment.locale('fr-ca');

            console.log(`\n\nStarting dateStr1 test...`);
            const dateStr1 = dateStringWithMonthTextToMoment(`25 juil 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 1  :: dateStr1:`, dateStr1);

            console.log(`\n\nStarting dateStr2 test...`);
            const dateStr2 = dateStringWithMonthTextToMoment(`25 juil. 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 2  :: dateStr2:`, dateStr2);

            console.log(`\n\nStarting dateStr3 test...`);
            const dateStr3 = dateStringWithMonthTextToMoment(`25 juillet 1980`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 3  :: dateStr3:`, dateStr3);

            console.log(`\n\nStarting dateStr4 test...`);
            const dateStr4 = dateStringWithMonthTextToMoment(`25 février 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 4  :: dateStr4:`, dateStr4);

            console.log(`\n\nStarting dateStr5 test...`);
            const dateStr5 = dateStringWithMonthTextToMoment(`25 Février 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 5  :: dateStr5:`, dateStr5);

            console.log(`\n\nStarting dateStr6 test...`);
            const dateStr6 = dateStringWithMonthTextToMoment(`Février 25, 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 6  :: dateStr6:`, dateStr6);

            moment.locale('en');

            console.log(`\n\nStarting dateStr7 test...`);
            const dateStr7 = dateStringWithMonthTextToMoment(`25 june 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 7  :: dateStr7:`, dateStr7);

            console.log(`\n\nStarting dateStr8 test...`);
            const dateStr8 = dateStringWithMonthTextToMoment(`25 June 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 8  :: dateStr8:`, dateStr8);

            console.log(`\n\nStarting dateStr9 test...`);
            const dateStr9 = dateStringWithMonthTextToMoment(`25 October 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 9  :: dateStr9:`, dateStr9);

            console.log(`\n\nStarting dateStr10 test...`);
            const dateStr10 = dateStringWithMonthTextToMoment(`25 oct 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 10 :: dateStr10:`, dateStr10);

            console.log(`\n\nStarting dateStr11 test...`);
            const dateStr11 = dateStringWithMonthTextToMoment(`25 oct. 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 11 :: dateStr11:`, dateStr11);

            console.log(`\n\nStarting dateStr12 test...`);
            const dateStr12 = dateStringWithMonthTextToMoment(`June 30, 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 12 :: dateStr12:`, dateStr12);

            console.log(`\n\nStarting dateStr13 test...`);
            const dateStr13 = dateStringWithMonthTextToMoment(`Dec. 31, 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 13 :: dateStr13:`, dateStr13);

            console.log(`\n\nStarting dateStr14 test...`);
            const dateStr14 = dateStringWithMonthTextToMoment(`1 Jan 2018`);
            console.log(`[dateStringWithMonthTextToMoment]  TEST 14 :: dateStr14:`, dateStr14);

            console.log(`\n\nStarting dateStr15 test...`);
            const dateStr15 = dateStringWithMonthTextToMoment(`1 January 2018`);
            console.log(`\n\n[dateStringWithMonthTextToMoment]  TEST 15 :: dateStr15:`, dateStr15);

            console.log(`\n\nStarting dateStr16 test...`);
            const dateStr16 = dateStringWithMonthTextToMoment(`2018 Dec. 20`);
            console.log(`\n\n[dateStringWithMonthTextToMoment]  TEST 16 :: dateStr16:`, dateStr16);

            console.log(`\n\nStarting dateStr17 test...`);
            const dateStr17 = dateStringWithMonthTextToMoment(`2018, 31 Dec`);
            console.log(`\n\n[dateStringWithMonthTextToMoment]  TEST 17 :: dateStr17:`, dateStr17);
            expect(dateStr1.isValid()).to.be.true;
            expect(dateStr2.isValid()).to.be.true;
            expect(dateStr3.isValid()).to.be.true;
            expect(dateStr4.isValid()).to.be.true;
            expect(dateStr5.isValid()).to.be.true;
            expect(dateStr6.isValid()).to.be.true;
            expect(dateStr7.isValid()).to.be.true;
            expect(dateStr8.isValid()).to.be.true;
            expect(dateStr9.isValid()).to.be.true;
            expect(dateStr10.isValid()).to.be.true;
            expect(dateStr11.isValid()).to.be.true;
            expect(dateStr12.isValid()).to.be.true;
            expect(dateStr13.isValid()).to.be.true;
            expect(dateStr14.isValid()).to.be.true;
            expect(dateStr15.isValid()).to.be.true;
            expect(dateStr16.isValid()).to.be.true;
            expect(dateStr17.isValid()).to.be.true;
            // Reset to inital locale
            moment.locale(origLocale);
        });

        it(`returns null with invalid inputs`, function() {
            console.log(`\n\nStarting testStrInvalid1 test...`);
            const testStrInvalid1 = dateStringWithMonthTextToMoment(null);
            console.log(`testStrInvalid1:`, testStrInvalid1);

            console.log(`\n\nStarting testStrInvalid2 test...`);
            const testStrInvalid2 = dateStringWithMonthTextToMoment(``);
            console.log(`testStrInvalid2:`, testStrInvalid2);

            console.log(`\n\nStarting testStrInvalid3 test...`);
            const testStrInvalid3 = dateStringWithMonthTextToMoment(`10-10-2019`);
            console.log(`testStrInvalid3:`, testStrInvalid3);

            console.log(`\n\nStarting testStrInvalid4 test...`);
            const testStrInvalid4 = dateStringWithMonthTextToMoment(`10102019`);
            console.log(`testStrInvalid4:`, testStrInvalid4);

            console.log(`\n\nStarting testStrInvalid5 test...`);
            const testStrInvalid5 = dateStringWithMonthTextToMoment(`Jan 33, 2020`);
            console.log(`testStrInvalid5:`, testStrInvalid5);

            expect(testStrInvalid1).to.be.null;
            expect(testStrInvalid2).to.be.null;
            expect(testStrInvalid3).to.be.null;
            expect(testStrInvalid4).to.be.null;
            expect(testStrInvalid5).to.be.null;
        });

        it(`handles moment-friendly strings with a fallback`, function() {
            const fallbackStr1 = dateStringWithMonthTextToMoment(`2017-10-19`);
            console.log(`fallbackStr1:`, fallbackStr1);
            expect(fallbackStr1.isValid()).to.be.true;

            const fallbackStr2 = dateStringWithMonthTextToMoment(
                `19-10-2017`,
                {fallbackFormat: 'DD-MM-YYYY'}
            );
            console.log(`fallbackStr2:`, fallbackStr2);
            expect(fallbackStr2.isValid()).to.be.true;
        });
    });
});
