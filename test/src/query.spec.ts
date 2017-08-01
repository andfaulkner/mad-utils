/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT QUERY MODULE FOR TESTING *********************************/
import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test';

import { m_, query, parseQueryParams, getLangFromUrlPathname,
         lastUrlPath, urlPathsAfterLang } from '../../shared';
import { expectFunctionExists } from '../../node';

import { query as queryFromNode } from '../../node';
import { query as queryFromBrowser } from '../../browser';
import * as queryModule from '../../src/query';

const queryFns = m_.query;


/********************************************* TESTS **********************************************/
describe(`query sub-module`, function() {
    expectNonEmptyObjectExists(query, 'query (from shared/base export)');
    expectNonEmptyObjectExists(m_.query, 'query (from m_ top-level namespace)');
    expectNonEmptyObjectExists(queryModule, 'query (import all from query.ts file)');
    expectNonEmptyObjectExists(queryFromNode, 'query (from Node export)');
    expectNonEmptyObjectExists(queryFromBrowser, 'query (from Browser export)');

    describe('.parseQueryParams]', function() {
        expectFunctionExists(m_.query.parseQueryParams);
        expectFunctionExists(parseQueryParams);
        it('-- is a function', function() {
            expect(m_.query.parseQueryParams).to.be.a('function');
        });
        it('-- parses query param strings into objects', function() {
            const queryParams = '?gender=female&birthdate=2013/10/20&region=AB';
            const queryParamsAsObj = m_.query.parseQueryParams(queryParams);
            expect(queryParamsAsObj).to.have.keys('gender', 'birthdate', 'region');
            expect(queryParamsAsObj['gender']).to.eql('female');
            expect(queryParamsAsObj['region']).to.eql('AB');
            expect(queryParamsAsObj['birthdate']).to.eql('2013/10/20');
        });
        it('-- returns null if no query params present', function() {
            expect(parseQueryParams('http://example.com/en/home')).to.be.null;
            expect(parseQueryParams('http://example.com/en/home?')).to.be.null;
            expect(parseQueryParams('http://example.com/en/home?=')).to.be.null;
            expect(parseQueryParams('http://example.com/en/home?&')).to.be.null;
        });
    });
    describe('.getLangFromUrlPathname]', function() {
        expectFunctionExists(m_.query.getLangFromUrlPathname);
        expectFunctionExists(getLangFromUrlPathname);
        it('-- pulls current lang out of given pathname string', function() {
            expect(getLangFromUrlPathname('/en/home')).to.eql('en');
            expect(getLangFromUrlPathname('/fr/home')).to.eql('fr');
        })
        it('-- ignores lang values in other parts of given string (besides the paths)', function() {
            expect(getLangFromUrlPathname('auth/fr/home?lang=en')).to.eql('fr');
            expect(getLangFromUrlPathname('auth/en/home/freestuff')).to.eql('en');
            expect(getLangFromUrlPathname('auth/freestuff/fr')).to.eql('fr');
            expect(getLangFromUrlPathname('auth/freestuff/en')).to.eql('en');
        });
        // TODO Test with mocked window object (will have to be in separate file)
    });

    describe(`.lastUrlPath`, function() {
        it(`returns final string after the last '/' from the given url`, function() {
            expect(lastUrlPath('https://example.com/1')).to.eql('1');
            expect(lastUrlPath('https://example.com/one')).to.eql('one');
            expect(lastUrlPath('https://example.com/asdf/123')).to.eql('123');
            expect(lastUrlPath('https://example.com/gr/argh/ok/hm/a')).to.eql('a');
        });
        it(`ignores query params`, function() {
            expect(lastUrlPath('https://example.com/asdf?name=someone')).to.eql('asdf');
            expect(lastUrlPath('https://example.com/asdf?name=someone/okok')).to.eql('asdf');
        });
        it(`returns '' if no '/' present after the domain`, function() {
            expect(lastUrlPath('https://example.com')).to.eql('');
            expect(lastUrlPath('https://example.com?name=someone')).to.eql('');
            expect(lastUrlPath('example.com')).to.eql('');
            expect(lastUrlPath('example.com?name=someone')).to.eql('');
        });
        it(`returns '' if url ends with '/' and strict is true`, function() {
            expect(lastUrlPath('https://example.com')).to.eql('');
            expect(lastUrlPath('https://example.com?name=someone')).to.eql('');
            expect(lastUrlPath('example.com')).to.eql('');
            expect(lastUrlPath('example.com?name=someone')).to.eql('');
            expect(lastUrlPath('https://example.com', true)).to.eql('');
        });
        it(`returns '' if url ends with '/' and strict is true`, function() {
            expect(lastUrlPath('https://example.com')).to.eql('');
            expect(lastUrlPath('https://example.com?name=someone')).to.eql('');
            expect(lastUrlPath('example.com')).to.eql('');
            expect(lastUrlPath('example.com?name=someone')).to.eql('');
            expect(lastUrlPath('https://example.com', true)).to.eql('');
        });
        it(`returns last url path before the final '/' if strict is false`, function() {
            expect(lastUrlPath('https://example.com/asdf/', false)).to.eql('asdf');
            expect(lastUrlPath('https://example.com/asdf/123/final/', false)).to.eql('final');
        });
    });
    describe(`.urlPathsAfterLang`, function() {
        it(`returns substring following first '/en/' match in given string`, function() {
            expect(urlPathsAfterLang('asdf/en/one/two')).to.eql('one/two');
        });
        it(`returns substring 'one/two' when given { url: '1/2/en/one/two'}`, function() {
            expect(urlPathsAfterLang({ url: '1/2/en/one/two'})).to.eql('one/two');
        });
        it(`returns substring following first '/fr/' match in given string`, function() {
            expect(urlPathsAfterLang('asdf/fr/one/two')).to.eql('one/two');
        });
        it(`returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }`, function() {
            expect(urlPathsAfterLang({ url: '1/2/ga/three/4', curLang: 'ga' })).to.eql('three/4');
        });
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }`, function() {
            expect(urlPathsAfterLang({ url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] })).to.eql('3/4');
            expect(urlPathsAfterLang({ url: '1/2/ok/3/4', supportedLangs: ['ok'] })).to.eql('3/4');
        });
    });
});
