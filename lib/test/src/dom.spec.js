"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
require("jsdom-global/register");
var mock_window_1 = require("../mock/mock-window");
/********************************* IMPORT DOM MODULE FOR TESTING **********************************/
var chai_1 = require("chai");
var browser_1 = require("../../browser");
var browser_2 = require("../../browser");
var domModule = require("../../src/browser/dom");
var test_1 = require("../../src/node/test");
/********************************************* TESTS **********************************************/
describe("dom sub-module", function () {
    test_1.expectNonEmptyObjectExists(browser_1.dom, 'dom (from shared/base export)');
    test_1.expectNonEmptyObjectExists(browser_1.m_.dom, 'dom (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(domModule, 'dom (import all from dom.ts file)');
    test_1.expectNonEmptyObjectExists(browser_2.dom, 'dom (from Browser export)');
    test_1.expectFunctionExists(browser_1.parseUserAgent);
    var commonSrc = 'as stored in user agent string on window';
    describe("UserAgent functions", function () {
        var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36' +
            ' (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';
        var mockOSName = 'Mac OS';
        var mockOSSnakeCase = 'mac_os';
        var mockOSVersion = '10.11.6';
        var mockBrowserName = 'Chrome';
        var mockBrowserVersion = '59.0.3071.115';
        var mockEngineName = 'WebKit';
        var mockEngineVersion = '537.36';
        describe("-- #parseUserAgent", function () {
            var uaMockParsed;
            before(function () {
                uaMockParsed = browser_1.parseUserAgent(userAgent);
            });
            it('given a string, should return obj w raw UserAgent plus browser & OS info:', function () {
                chai_1.expect(uaMockParsed.browser.major).to.eql('59');
                // expect(uaMockParsed.browser.name).to.eql(mockBrowserName);
                chai_1.expect(uaMockParsed.browser.version).to.eql(mockBrowserVersion);
                // expect(uaMockParsed.os.name).to.eql(mockOSName);
                chai_1.expect(uaMockParsed.os.version).to.eql(mockOSVersion);
                // expect(uaMockParsed.engine.name).to.eql(mockEngineName);
                chai_1.expect(uaMockParsed.engine.version).to.eql(mockEngineVersion);
                chai_1.expect(uaMockParsed.raw).to.eql(userAgent);
                chai_1.expect(uaMockParsed.ua).to.eql(userAgent);
            });
        });
        it("-- #getUserAgentString: returns raw user agent str from window.navigator object", function () {
            chai_1.expect(browser_1.getUserAgentString()).to.equal(mock_window_1.userAgent);
        });
        it("-- #osName: returns name of OS running on current computer, " + commonSrc, function () {
            chai_1.expect(browser_1.osName()).to.equal(mockOSName);
        });
        it("-- #osNameSnakeCase: returns name of OS in snake_case, " + commonSrc, function () {
            chai_1.expect(browser_1.osNameSnakeCase()).to.equal(mockOSSnakeCase);
        });
        it("-- #osVersion: returns OS version running on current computer, " + commonSrc, function () {
            chai_1.expect(browser_1.osVersion()).to.equal(mockOSVersion);
        });
        it("-- #browser name: returns name of browser type (e.g. 'Chrome'), " + commonSrc, function () {
            chai_1.expect(browser_1.browserName()).to.equal(mockBrowserName);
        });
        it("-- #browser name: returns version of current browser, " + commonSrc, function () {
            chai_1.expect(browser_1.browserVersion()).to.equal(mockBrowserVersion);
        });
        it("-- #browser name: returns name of current browser engine (e.g. WebKit), " + commonSrc, function () {
            chai_1.expect(browser_1.browserEngineName()).to.equal(mockEngineName);
        });
        it("-- #browser name: returns version of current browser engine, " + commonSrc, function () {
            chai_1.expect(browser_1.browserEngineVersion()).to.equal(mockEngineVersion);
        });
    });
});
//# sourceMappingURL=dom.spec.js.map