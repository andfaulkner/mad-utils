"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
/******************************** IMPORT QUERY MODULE FOR TESTING *********************************/
var chai_1 = require("chai");
var test_1 = require("../../src/node/test");
var shared_1 = require("../../shared");
var node_1 = require("../../node");
var node_2 = require("../../node");
var browser_1 = require("../../browser");
var queryModule = require("../../src/query");
var queryFns = shared_1.m_.query;
/********************************************* TESTS **********************************************/
describe("query sub-module", function () {
    test_1.expectNonEmptyObjectExists(shared_1.query, 'query (from shared/base export)');
    test_1.expectNonEmptyObjectExists(shared_1.m_.query, 'query (from m_ top-level namespace)');
    test_1.expectNonEmptyObjectExists(queryModule, 'query (import all from query.ts file)');
    test_1.expectNonEmptyObjectExists(node_2.query, 'query (from Node export)');
    test_1.expectNonEmptyObjectExists(browser_1.query, 'query (from Browser export)');
    describe('.parseQueryParams]', function () {
        node_1.expectFunctionExists(shared_1.m_.query.parseQueryParams);
        node_1.expectFunctionExists(shared_1.parseQueryParams);
        it('-- is a function', function () {
            chai_1.expect(shared_1.m_.query.parseQueryParams).to.be.a('function');
        });
        it('-- parses query param strings into objects', function () {
            var queryParams = '?gender=female&birthdate=2013/10/20&region=AB';
            var queryParamsAsObj = shared_1.m_.query.parseQueryParams(queryParams);
            chai_1.expect(queryParamsAsObj).to.have.keys('gender', 'birthdate', 'region');
            chai_1.expect(queryParamsAsObj['gender']).to.eql('female');
            chai_1.expect(queryParamsAsObj['region']).to.eql('AB');
            chai_1.expect(queryParamsAsObj['birthdate']).to.eql('2013/10/20');
        });
        it('-- returns null if no query params present', function () {
            chai_1.expect(shared_1.parseQueryParams('http://example.com/en/home')).to.be.null;
            chai_1.expect(shared_1.parseQueryParams('http://example.com/en/home?')).to.be.null;
            chai_1.expect(shared_1.parseQueryParams('http://example.com/en/home?=')).to.be.null;
            chai_1.expect(shared_1.parseQueryParams('http://example.com/en/home?&')).to.be.null;
        });
    });
    describe('.getLangFromUrlPathname]', function () {
        node_1.expectFunctionExists(shared_1.m_.query.getLangFromUrlPathname);
        node_1.expectFunctionExists(shared_1.m_.query.getLangFromURLPathname);
        node_1.expectFunctionExists(shared_1.m_.query.langFromUrlPathname);
        node_1.expectFunctionExists(shared_1.m_.query.langFromURLPathname);
        node_1.expectFunctionExists(shared_1.getLangFromUrlPathname);
        node_1.expectFunctionExists(shared_1.getLangFromURLPathname);
        node_1.expectFunctionExists(shared_1.langFromUrlPathname);
        node_1.expectFunctionExists(shared_1.langFromURLPathname);
        it('-- pulls current lang out of given pathname string', function () {
            chai_1.expect(shared_1.getLangFromUrlPathname('/en/home')).to.eql('en');
            chai_1.expect(shared_1.getLangFromUrlPathname('/fr/home')).to.eql('fr');
        });
        it('-- ignores lang values in other parts of given string (besides the paths)', function () {
            chai_1.expect(shared_1.getLangFromUrlPathname('auth/fr/home?lang=en')).to.eql('fr');
            chai_1.expect(shared_1.getLangFromUrlPathname('auth/en/home/freestuff')).to.eql('en');
            chai_1.expect(shared_1.getLangFromUrlPathname('auth/freestuff/fr')).to.eql('fr');
            chai_1.expect(shared_1.getLangFromUrlPathname('auth/freestuff/en')).to.eql('en');
        });
        // TODO Test with mocked window object (will have to be in separate file)
    });
    describe(".lastUrlPath", function () {
        it("returns final string after the last '/' from the given url", function () {
            chai_1.expect(shared_1.lastUrlPath('https://example.com/1')).to.eql('1');
            chai_1.expect(shared_1.lastUrlPath('https://example.com/one')).to.eql('one');
            chai_1.expect(shared_1.lastUrlPath('https://example.com/asdf/123')).to.eql('123');
            chai_1.expect(shared_1.lastUrlPath('https://example.com/gr/argh/ok/hm/a')).to.eql('a');
        });
        it("ignores query params", function () {
            chai_1.expect(shared_1.lastUrlPath('https://example.com/asdf?name=someone')).to.eql('asdf');
            chai_1.expect(shared_1.lastUrlPath('https://example.com/asdf?name=someone/okok')).to.eql('asdf');
        });
        it("returns '' if no '/' present after the domain", function () {
            chai_1.expect(shared_1.lastUrlPath('https://example.com')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('https://example.com?name=someone')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('example.com')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('example.com?name=someone')).to.eql('');
        });
        it("returns '' if url ends with '/' and strict is true", function () {
            chai_1.expect(shared_1.lastUrlPath('https://example.com')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('https://example.com?name=someone')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('example.com')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('example.com?name=someone')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('https://example.com', true)).to.eql('');
        });
        it("returns '' if url ends with '/' and strict is true", function () {
            chai_1.expect(shared_1.lastUrlPath('https://example.com')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('https://example.com?name=someone')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('example.com')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('example.com?name=someone')).to.eql('');
            chai_1.expect(shared_1.lastUrlPath('https://example.com', true)).to.eql('');
        });
        it("returns last url path before the final '/' if strict is false", function () {
            chai_1.expect(shared_1.lastUrlPath('https://example.com/asdf/', false)).to.eql('asdf');
            chai_1.expect(shared_1.lastUrlPath('https://example.com/asdf/123/final/', false)).to.eql('final');
        });
    });
    describe(".getUrlPathAfterLang", function () {
        it("returns substring following first '/en/' match in given string", function () {
            chai_1.expect(shared_1.getUrlPathAfterLang('asdf/en/one/two')).to.eql('one/two');
        });
        it("returns substring 'one/two' when given { url: '1/2/en/one/two'}", function () {
            chai_1.expect(shared_1.getUrlPathAfterLang({ url: '1/2/en/one/two' })).to.eql('one/two');
        });
        it("returns substring following first '/fr/' match in given string", function () {
            chai_1.expect(shared_1.getUrlPathAfterLang('asdf/fr/one/two')).to.eql('one/two');
        });
        it("returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }", function () {
            chai_1.expect(shared_1.getUrlPathAfterLang({ url: '1/2/ga/three/4', curLang: 'ga' })).to.eql('three/4');
        });
        it("returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }", function () {
            chai_1.expect(shared_1.getUrlPathAfterLang({ url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] })).to.eql('3/4');
            chai_1.expect(shared_1.getUrlPathAfterLang({ url: '1/2/ok/3/4', supportedLangs: ['ok'] })).to.eql('3/4');
        });
        // TODO test getUrlPathAfterLang's no-arg condition :: getUrlPathAfterLang();
    });
    describe(".getUrlPathBeforeLang", function () {
        it("returns substring following first '/en/' match in given string", function () {
            chai_1.expect(shared_1.getUrlPathBeforeLang('asdf/en/one/two')).to.eql('asdf');
        });
        it("returns substring '1/2' when given { url: '1/2/en/one/two'}", function () {
            chai_1.expect(shared_1.getUrlPathBeforeLang({ url: '1/2/en/one/two' })).to.eql('1/2');
        });
        it("returns substring following first '/fr/' match in given string", function () {
            chai_1.expect(shared_1.getUrlPathBeforeLang('asdf/fr/one/two')).to.eql('asdf');
        });
        it("returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }", function () {
            chai_1.expect(shared_1.getUrlPathBeforeLang({ url: '1/2/ga/three/4', curLang: 'ga' })).to.eql('1/2');
        });
        it("returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }", function () {
            chai_1.expect(shared_1.getUrlPathBeforeLang({ url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] })).to.eql('1/2');
            chai_1.expect(shared_1.getUrlPathBeforeLang({ url: '1/2/ok/3/4', supportedLangs: ['ok'] })).to.eql('1/2');
        });
        // TODO test getUrlPathBeforeLang's no-arg condition :: getUrlPathBeforeLang();
    });
    describe(".urlPathAroundLang", function () {
        it("returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'], getStrBeforeLang: true }", function () {
            chai_1.expect(shared_1.getUrlPathAroundLang({
                url: '1/2/ok/3/4',
                supportedLangs: ['ga', 'ok'],
                getStrBeforeLang: true
            })).to
                .eql('1/2');
        });
    });
    // TODO test getUrlPathAroundLang more extensively;
});
//# sourceMappingURL=query.spec.js.map