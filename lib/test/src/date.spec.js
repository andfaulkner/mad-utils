"use strict";
// TODO test isDateLike
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
/********************************* IMPORT DATE MODULE FOR TESTING *********************************/
var chai_1 = require("chai");
var env_var_helpers_1 = require("env-var-helpers");
var moment = require("moment");
require("moment/locale/fr-ca");
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var dateModule = require("../../src/date");
var test_1 = require("../../src/node/test");
var node_2 = require("../../node");
/********************************************* TESTS **********************************************/
describe.only("date sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.date, 'date (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.date, 'date (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(dateModule, 'date (import all from date.ts file)');
    test_1.expectNonEmptyObjectExists(node_1.date, 'date (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.date, 'date (from Browser export)');
    describe("isLeapYear function", function () {
        node_2.expectFunctionExists(shared_1.isLeapYear);
        node_2.expectFunctionExists(shared_1.m_.date.isLeapYear);
        it("Returns true if given number is a leap year", function () {
            chai_1.expect(shared_1.isLeapYear(4)).to.be.true;
            chai_1.expect(shared_1.isLeapYear(120)).to.be.true;
            chai_1.expect(shared_1.isLeapYear(2016)).to.be.true;
            chai_1.expect(shared_1.isLeapYear(1600)).to.be.true;
            chai_1.expect(shared_1.isLeapYear(2000)).to.be.true;
        });
        it("Returns false if given number is not leap year", function () {
            chai_1.expect(shared_1.isLeapYear(5)).to.be.false;
            chai_1.expect(shared_1.isLeapYear(101)).to.be.false;
            chai_1.expect(shared_1.isLeapYear(2017)).to.be.false;
            chai_1.expect(shared_1.isLeapYear(1700)).to.be.false;
            chai_1.expect(shared_1.isLeapYear(1900)).to.be.false;
            chai_1.expect(shared_1.isLeapYear(2100)).to.be.false;
        });
        it("Implicitly converts strings to int", function () {
            chai_1.expect(shared_1.isLeapYear('5')).to.be.false;
            chai_1.expect(shared_1.isLeapYear('1600')).to.be.true;
        });
        it("throws error if given a value that cannot be converted to an integer", function () {
            chai_1.expect(function () { return shared_1.isLeapYear({ 1: '5' }); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear([1, 2, 3]); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear('asdf'); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear({}); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear([]); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear(null); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear(undefined); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear(Object); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear((function () { return 'gr'; })); }).to.throw(Error);
            chai_1.expect(function () { return shared_1.isLeapYear(''); }).to.throw(Error);
        });
    });
    describe("convertDayOfWeekNumToString function", function () {
        node_2.expectFunctionExists(node_2.convertDayOfWeekNumToString);
        node_2.expectFunctionExists(shared_1.m_.date.convertDayOfWeekNumToString);
        it("converts 0 into 'Sunday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(0)).to.equal('Sunday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('0')).to.equal('Sunday');
        });
        it("converts 1 or '1' into 'Monday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(1)).to.equal('Monday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('1')).to.equal('Monday');
        });
        it("converts 2 or '2' into 'Tuesday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(2)).to.equal('Tuesday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('2')).to.equal('Tuesday');
        });
        it("converts 3 or '3' into 'Wednesday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(3)).to.equal('Wednesday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('3')).to.equal('Wednesday');
        });
        it("converts 4 or '4' into 'Thursday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(4)).to.equal('Thursday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('4')).to.equal('Thursday');
        });
        it("converts 5 or '5' into 'Friday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(5)).to.equal('Friday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('5')).to.equal('Friday');
        });
        it("converts 6 or '6' into 'Saturday'", function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(6)).to.equal('Saturday');
            chai_1.expect(node_2.convertDayOfWeekNumToString('6')).to.equal('Saturday');
        });
        var doesAbbreviateMsg = '(i.e. it abbreviates if arg 2 is true)';
        it("converts args (0, true) or ('0', true) into 'Sun' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(0, true)).to.equal('Sun');
            chai_1.expect(node_2.convertDayOfWeekNumToString('0', true)).to.equal('Sun');
        });
        it("converts args (1, true) or ('1', true) into 'Mon' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(1, true)).to.equal('Mon');
            chai_1.expect(node_2.convertDayOfWeekNumToString('1', true)).to.equal('Mon');
        });
        it("converts args (2, true) or ('2', true) into 'Tue' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(2, true)).to.equal('Tues');
            chai_1.expect(node_2.convertDayOfWeekNumToString('2', true)).to.equal('Tues');
        });
        it("converts args (3, true) or ('3', true) into 'Wed' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(3, true)).to.equal('Wed');
            chai_1.expect(node_2.convertDayOfWeekNumToString('3', true)).to.equal('Wed');
        });
        it("converts args (4, true) or ('4', true) into 'Thu' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(4, true)).to.equal('Thurs');
            chai_1.expect(node_2.convertDayOfWeekNumToString('4', true)).to.equal('Thurs');
        });
        it("converts args (5, true) or ('5', true) into 'Fri' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(5, true)).to.equal('Fri');
            chai_1.expect(node_2.convertDayOfWeekNumToString('5', true)).to.equal('Fri');
        });
        it("converts args (6, true) or ('6', true) into 'Sat' " + doesAbbreviateMsg, function () {
            chai_1.expect(node_2.convertDayOfWeekNumToString(6, true)).to.equal('Sat');
            chai_1.expect(node_2.convertDayOfWeekNumToString('6', true)).to.equal('Sat');
        });
        it("throws if given a number/numberString outside the 0-6 range, or another type.", function () {
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString('7'); }).to.throw();
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString(7); }).to.throw();
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString(-1); }).to.throw();
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString(-1); }).to.throw();
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString('asdf'); }).to.throw();
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString([]); }).to.throw();
            chai_1.expect(function () { return node_2.convertDayOfWeekNumToString({}); }).to.throw();
        });
    });
    describe("now function", function () {
        node_2.expectFunctionExists(node_2.now);
        it("should return current date & time in YYYY/MM/DD : HH:MM:SS format if given no args", function () {
            var jsNow = new Date();
            var jsFormattedDateTime = jsNow.getFullYear() + "/" +
                ("" + (jsNow.getMonth() < 9 ? "0" : "") + (jsNow.getMonth() + 1) + "/") +
                ("" + (jsNow.getDate() < 10 ? "0" : "") + jsNow.getDate() + " : ") +
                ("" + (jsNow.getHours() < 10 ? "0" : "") + jsNow.getHours() + ":") +
                ("" + (jsNow.getMinutes() < 10 ? "0" : "") + jsNow.getMinutes() + ":") +
                ("" + (jsNow.getSeconds() < 10 ? "0" : "") + jsNow.getSeconds());
            if (env_var_helpers_1.isVerbose)
                console.log('date.spec.ts :: now :: jsNow:', jsNow);
            if (env_var_helpers_1.isVerbose)
                console.log('date.spec.ts :: now :: jsFormattedDateTime:', jsFormattedDateTime);
            chai_1.expect(node_2.now()).to.eql(jsFormattedDateTime);
        });
        it("should return current date & time in any valid MomentJS format (e.g. YYYY/MM/DD) " +
            "given as an arg", function () {
            var jsNow = new Date();
            var jsFormattedDate = jsNow.getFullYear() + "/" +
                ("" + (jsNow.getMonth() < 9 ? "0" : "") + (jsNow.getMonth() + 1) + "/") +
                ("" + (jsNow.getDate() < 10 ? "0" : "") + jsNow.getDate());
            chai_1.expect(node_2.now("YYYY/MM/DD")).to.eql(jsFormattedDate);
        });
    });
    describe("dateStringWithMonthTextToMoment function", function () {
        node_2.expectFunctionExists(shared_1.dateStringWithMonthTextToMoment);
        node_2.expectFunctionExists(shared_1.m_.date.dateStringWithMonthTextToMoment);
        it("Handles a variety of inputs", function () {
            moment.locale('fr-ca');
            var dateStr1 = shared_1.dateStringWithMonthTextToMoment("25 juil 2018");
            var dateStr2 = shared_1.dateStringWithMonthTextToMoment("25 juil. 2018");
            var dateStr3 = shared_1.dateStringWithMonthTextToMoment("25 juillet 1980");
            var dateStr4 = shared_1.dateStringWithMonthTextToMoment("25 f\u00E9vrier 2018");
            var dateStr5 = shared_1.dateStringWithMonthTextToMoment("25 F\u00E9vrier 2018");
            var dateStr6 = shared_1.dateStringWithMonthTextToMoment("F\u00E9vrier 25, 2018");
            moment.locale('en');
            var dateStr7 = shared_1.dateStringWithMonthTextToMoment("25 june 2018");
            var dateStr8 = shared_1.dateStringWithMonthTextToMoment("25 June 2018");
            var dateStr9 = shared_1.dateStringWithMonthTextToMoment("25 October 2018");
            var dateStr10 = shared_1.dateStringWithMonthTextToMoment("25 oct 2018");
            var dateStr11 = shared_1.dateStringWithMonthTextToMoment("25 oct. 2018");
            var dateStr12 = shared_1.dateStringWithMonthTextToMoment("June 30, 2018");
            var dateStr13 = shared_1.dateStringWithMonthTextToMoment("Dec. 31, 2018");
            var dateStr14 = shared_1.dateStringWithMonthTextToMoment("1 Jan 2018");
            var dateStr15 = shared_1.dateStringWithMonthTextToMoment("1 January 2018");
            var dateStr16 = shared_1.dateStringWithMonthTextToMoment("2018 Dec. 20");
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 1  :: dateStr1:", dateStr1);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 2  :: dateStr2:", dateStr2);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 3  :: dateStr3:", dateStr3);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 4  :: dateStr4:", dateStr4);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 5  :: dateStr5:", dateStr5);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 6  :: dateStr6:", dateStr6);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 7  :: dateStr7:", dateStr7);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 8  :: dateStr8:", dateStr8);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 9  :: dateStr9:", dateStr9);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 10 :: dateStr10:", dateStr10);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 11 :: dateStr11:", dateStr11);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 12 :: dateStr12:", dateStr12);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 13 :: dateStr13:", dateStr13);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 14 :: dateStr14:", dateStr14);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 15 :: dateStr15:", dateStr15);
            console.log("\n\n[dateStringWithMonthTextToMoment]  TEST 16 :: dateStr16:", dateStr16);
            chai_1.expect(dateStr1.isValid()).to.be.true;
            chai_1.expect(dateStr2.isValid()).to.be.true;
            chai_1.expect(dateStr3.isValid()).to.be.true;
            chai_1.expect(dateStr4.isValid()).to.be.true;
            chai_1.expect(dateStr5.isValid()).to.be.true;
            chai_1.expect(dateStr6.isValid()).to.be.true;
            chai_1.expect(dateStr7.isValid()).to.be.true;
            chai_1.expect(dateStr8.isValid()).to.be.true;
            chai_1.expect(dateStr9.isValid()).to.be.true;
            chai_1.expect(dateStr10.isValid()).to.be.true;
            chai_1.expect(dateStr11.isValid()).to.be.true;
            chai_1.expect(dateStr12.isValid()).to.be.true;
            chai_1.expect(dateStr13.isValid()).to.be.true;
            chai_1.expect(dateStr14.isValid()).to.be.true;
            chai_1.expect(dateStr15.isValid()).to.be.true;
            chai_1.expect(dateStr16.isValid()).to.be.true;
        });
    });
});
//# sourceMappingURL=date.spec.js.map