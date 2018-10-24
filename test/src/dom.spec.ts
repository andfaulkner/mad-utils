/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import 'jsdom-global/register';

import {window, userAgent as mockUserAgent} from '../mock/mock-window';

/********************************* IMPORT DOM MODULE FOR TESTING **********************************/
import {expect} from 'chai';

import {
    m_,
    dom,
    userAgentParsed,
    parseUserAgent,
    getUserAgentString,
    osName,
    osVersion,
    browserName,
    browserVersion,
    browserEngineName,
    browserEngineVersion,
    ParsedUserAgent,
} from '../../browser';

console.log(`dom.spec.ts :: userAgentParsed:`, userAgentParsed);

import {dom as domFromBrowser} from '../../browser';
import * as domModule from '../../src/browser/dom';
import {expectNonEmptyObjectExists, expectFunctionExists} from '../../src/node/test';

/********************************************* TESTS **********************************************/
describe(`dom sub-module`, function() {
    expectNonEmptyObjectExists(dom, `dom (from shared/base export)`);
    expectNonEmptyObjectExists(m_.dom, `dom (from m_ top-level namespace)`);
    expectNonEmptyObjectExists(domModule, `dom (import all from dom.ts file)`);
    expectNonEmptyObjectExists(domFromBrowser, `dom (from Browser export)`);
    expectNonEmptyObjectExists(userAgentParsed, `dom->userAgentParsed`);

    describe(`UserAgent functions`, function() {
        const userAgent =
            `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36` +
            ` (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`;
        const mockOSName = `Mac OS`;
        const mockOSSnakeCase = `mac_os`;
        const mockOSVersion = `10.11.6`;
        const mockBrowserName = `Chrome`;
        const mockBrowserVersion = `59.0.3071.115`;
        const mockEngineName = `WebKit`;
        const mockEngineVersion = `537.36`;

        describe(`-- #parseUserAgent`, function() {
            let uaMockParsed: ParsedUserAgent;

            before(function() {
                uaMockParsed = parseUserAgent(userAgent);
            });

            it(`given a string, should return obj w raw UserAgent plus browser & OS info:`, function() {
                expect(uaMockParsed.browser.major).to.eql(`59`);
                expect(uaMockParsed.browser.version).to.eql(mockBrowserVersion);
                expect(uaMockParsed.os.version).to.eql(mockOSVersion);
                expect(uaMockParsed.engine.version).to.eql(mockEngineVersion);
                expect(uaMockParsed.raw).to.eql(userAgent);
                expect(uaMockParsed.ua).to.eql(userAgent);
            });
        });

        it(`-- #getUserAgentString: returns raw user agent str from window.navigator object`, function() {
            expect(getUserAgentString()).to.equal(mockUserAgent);
        });

        const commonSrc = `as stored in user agent string on window`;

        it(`-- #osName: returns name of OS running on current computer, ${commonSrc}`, function() {
            expect(osName()).to.equal(mockOSName);
        });

        it(`-- #osVersion: returns OS version running on current computer, ${commonSrc}`, function() {
            expect(osVersion()).to.equal(mockOSVersion);
        });

        it(`-- #browser name: returns name of browser type (e.g. 'Chrome'), ${commonSrc}`, function() {
            expect(browserName()).to.equal(mockBrowserName);
        });

        it(`-- #browser name: returns version of current browser, ${commonSrc}`, function() {
            expect(browserVersion()).to.equal(mockBrowserVersion);
        });

        it(`-- #browser name: returns name of current browser engine (e.g. WebKit), ${commonSrc}`, function() {
            expect(browserEngineName()).to.equal(mockEngineName);
        });

        it(`-- #browser name: returns version of current browser engine, ${commonSrc}`, function() {
            expect(browserEngineVersion()).to.equal(mockEngineVersion);
        });
    });
});
