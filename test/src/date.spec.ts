// TODO test isDateLike

/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/********************************* IMPORT DATE MODULE FOR TESTING *********************************/
import {expect} from 'chai';
import {isVerbose} from 'env-var-helpers';
import moment from 'moment';
import 'moment/locale/fr-ca';

import {m_, date, isLeapYear, isDateLike, dateStringWithMonthTextToMoment} from '../../shared';
import {date as dateFromNode} from '../../node';
import {date as dateFromBrowser} from '../../browser';
import * as dateModule from '../../src/date';

import {expectNonEmptyObjectExists} from '../../src/node/test';
import {expectFunctionExists, now} from '../../node';

/********************************************* TESTS **********************************************/
describe(`date sub-module`, function() {
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

        it(`Handles dates with specific given locale, without changing global locale`, function() {
            const origLocale = moment.locale();
            expect(dateStringWithMonthTextToMoment(`2018 Dec. 20`, {locale: 'en'}).isValid()).to.be
                .true;
            expect(moment.locale()).to.eql(origLocale);
            expect(dateStringWithMonthTextToMoment(`25 février 2018`, {locale: 'fr-ca'}).isValid())
                .to.be.true;
            expect(moment.locale()).to.eql(origLocale);
        });

        it(`returns null with empty inputs`, function() {
            expect(dateStringWithMonthTextToMoment(null)).to.be.null;
            expect(dateStringWithMonthTextToMoment(``)).to.be.null;
        });

        it(`returns null with nonexistent dates`, function() {
            expect(dateStringWithMonthTextToMoment(`Jan 50, 2020`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`Feb 30, 1980`)).to.be.null;
        });

        it(`returns null with non-standard date formats when given no fallbackFormat`, function() {
            expect(dateStringWithMonthTextToMoment(`10-10-2019`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`10-10-10`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`02-2020-10`)).to.be.null;
        });

        it(`returns moment object when given ISO-formatted strings (but no fallback)`, function() {
            expect(dateStringWithMonthTextToMoment(`2017-10-19`).isValid()).to.be.true;
        });

        it(`returns null when given 2-part date strings`, function() {
            expect(dateStringWithMonthTextToMoment(`2017-10`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`10-1900`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`1-1900`)).to.be.null;
        });

        it(`returns null when given invalid strings with dashes`, function() {
            expect(dateStringWithMonthTextToMoment(`Non-spécifié`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`non-valid`)).to.be.null;
        });

        it(`returns null when given phrases with spaces`, function() {
            expect(dateStringWithMonthTextToMoment(`This is not valid`)).to.be.null;
            expect(dateStringWithMonthTextToMoment(`This is not valid`)).to.be.null;
        });

        it(`returns moment object when given ISO-formatted strings (but no fallback) with single digit month and/or year`, function() {
            expect(dateStringWithMonthTextToMoment(`2017-10-3`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`2017-1-23`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`2017-1-3`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`2017-01-3`).isValid()).to.be.true;
            expect(dateStringWithMonthTextToMoment(`2017-1-03`).isValid()).to.be.true;
        });

        it(`returns moment object as-is when given a moment object`, function() {
            const date = moment();
            expect(dateStringWithMonthTextToMoment(date)).to.eql(date);
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
