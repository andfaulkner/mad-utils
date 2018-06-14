"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/********************************* IMPORT DATE MODULE FOR TESTING *********************************/
var chai_1 = require("chai");
var env_var_helpers_1 = require("env-var-helpers");
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var browser_1 = require("../../browser");
var dateModule = require("../../src/date");
var test_1 = require("../../src/node/test");
var node_2 = require("../../node");
var dateFns = shared_1.m_.date;
/********************************************* TESTS **********************************************/
describe("date sub-module", function () {
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
});
//# sourceMappingURL=date.spec.js.map