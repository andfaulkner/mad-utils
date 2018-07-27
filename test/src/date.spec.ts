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

        it(`Handles dates with English months with 'en' locale set`, function() {
            // Store initial locale (for reset after test)
            const origLocale = moment.locale();

            // Set locale to English
            moment.locale('en');

            expect(dateStringWithMonthTextToMoment(`25 june 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 June 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 October 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 oct 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 oct. 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`June 30, 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`Dec. 31, 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`1 Jan 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`1 January 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`2018 Dec. 20`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`2018, 31 Dec`).isValid()).to.be.true;

            // Reset to inital locale
            moment.locale(origLocale);
        });

        it(`Handles dates with French months with fr-ca locale set`, function() {
            // Store initial locale (for reset after test)
            const origLocale = moment.locale();

            // Set locale to French
            moment.locale('fr-ca');

            expect(dateStringWithMonthTextToMoment(`25 juil 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 juil. 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 juillet 1980`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 février 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`25 Février 2018`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`Février 25, 2018`).isValid()).to.be.true;

            // Reset to inital locale
            moment.locale(origLocale);
        });

        it(`returns null with invalid inputs`, function() {
            expect(dateStringWithMonthTextToMoment(null)).to.be.null;
            expect(dateStringWithMonthTextToMoment(``)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`10-10-2019`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`10102019`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`Jan 33, 2020`)).to.be.null;
        });

        it(`returns moment object when given ISO-formatted strings (but no fallback)`, function() {
            expect(dateStringWithMonthTextToMoment(`2017-10-19`).isValid()).to.be.true;
        });

        it(`handles non-ISO date strings with a fallback (if fallback given)`, function() {
            expect(
                dateStringWithMonthTextToMoment(`19-10-2017`, {
                    fallbackFormat: 'DD-MM-YYYY',
                }).isValid()
            ).to.be.true;
        });
    });
});
