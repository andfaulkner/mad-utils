/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/******************************** IMPORT QUERY MODULE FOR TESTING *********************************/
import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test';

import { m_, query, parseQueryParams, getLangFromUrlPathname, lastUrlPath,
         getUrlPathAroundLang, getUrlPathAfterLang, getUrlPathBeforeLang,
         getLangFromURLPathname, langFromUrlPathname, langFromURLPathname,
         getQueryParamString,
         urlMinusLastPath,
         swapLastURLPath,
         urlWithoutProtocol,
         urlProtocolString,
} from '../../shared';
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
        expectFunctionExists(m_.query.getLangFromURLPathname);
        expectFunctionExists(m_.query.langFromUrlPathname);
        expectFunctionExists(m_.query.langFromURLPathname);
        expectFunctionExists(getLangFromUrlPathname);
        expectFunctionExists(getLangFromURLPathname);
        expectFunctionExists(langFromUrlPathname);
        expectFunctionExists(langFromURLPathname);
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

    describe(`.getUrlPathAfterLang`, function() {
        it(`returns substring following first '/en/' match in given string`, function() {
            expect(getUrlPathAfterLang('asdf/en/one/two')).to.eql('one/two');
        });
        it(`returns substring 'one/two' when given { url: '1/2/en/one/two'}`, function() {
            expect(getUrlPathAfterLang({ url: '1/2/en/one/two'})).to.eql('one/two');
        });
        it(`returns substring following first '/fr/' match in given string`, function() {
            expect(getUrlPathAfterLang('asdf/fr/one/two')).to.eql('one/two');
        });
        it(`returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }`, function() {
            expect(getUrlPathAfterLang({ url: '1/2/ga/three/4', curLang: 'ga' })).to.eql('three/4');
        });
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }`, function() {
            expect(getUrlPathAfterLang({ url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] })).to.eql('3/4');
            expect(getUrlPathAfterLang({ url: '1/2/ok/3/4', supportedLangs: ['ok'] })).to.eql('3/4');
        });
        // TODO test getUrlPathAfterLang's no-arg condition :: getUrlPathAfterLang();
    });

    describe(`.getUrlPathBeforeLang`, function() {
        it(`returns substring following first '/en/' match in given string`, function() {
            expect(getUrlPathBeforeLang('asdf/en/one/two')).to.eql('asdf');
        });
        it(`returns substring '1/2' when given { url: '1/2/en/one/two'}`, function() {
            expect(getUrlPathBeforeLang({ url: '1/2/en/one/two'})).to.eql('1/2');
        });
        it(`returns substring following first '/fr/' match in given string`, function() {
            expect(getUrlPathBeforeLang('asdf/fr/one/two')).to.eql('asdf');
        });
        it(`returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }`, function() {
            expect(getUrlPathBeforeLang({ url: '1/2/ga/three/4', curLang: 'ga' })).to.eql('1/2');
        });
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }`, function() {
            expect(getUrlPathBeforeLang({ url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] })).to.eql('1/2');
            expect(getUrlPathBeforeLang({ url: '1/2/ok/3/4', supportedLangs: ['ok'] })).to.eql('1/2');
        });
        // TODO test getUrlPathBeforeLang's no-arg condition :: getUrlPathBeforeLang();
    });

    // TODO test getUrlPathAroundLang more extensively;

    describe(`.urlPathAroundLang`, function() {
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'], getStrBeforeLang: true }`, function() {
            expect(getUrlPathAroundLang({
                url: '1/2/ok/3/4',
                supportedLangs: ['ga', 'ok'],
                getStrBeforeLang: true
            })).to
               .eql('1/2');
        });
    });

    describe(`.urlMinusLastPath`, function() {
        it(`returns the URL string minus the last path`, function() {
            const testURL = `http://www.example.com/one/two/three`;
            expect(urlMinusLastPath(testURL)).to.eql('http://www.example.com/one/two');
        });
        it(`returns the base URL if URL has only 1 path`, function() {
            const testURL = `http://www.example.com/one`;
            expect(urlMinusLastPath(testURL)).to.eql('http://www.example.com');
        });
        it(`returns the base URL if URL has no paths`, function() {
            const testURL = `http://www.example.com`;
            expect(urlMinusLastPath(testURL)).to.eql('http://www.example.com');
        });
        it(`preserves query params if excludeQueryParams is false`, function() {
            const testURL = `http://www.example.com`;
            expect(urlMinusLastPath(testURL)).to.eql('http://www.example.com');
        });
    });

    describe(`getQueryParamString`, function() {
        it(`gets a URL's query parameters`, function() {
            const testURL = `https://www.example.com/one/two?k1=v1&k2=v2`;
            expect(getQueryParamString(testURL)).to.eql('k1=v1&k2=v2');
        });
        it(`returns an empty string if a URL has no query params`, function() {
            const testURL = `https://www.example.com/one/two`;
            expect(getQueryParamString(testURL)).to.eql('');
        });
    });

    describe(`.swapLastURLPath`, function() {
        it(`swaps the last URL path and leaves the query params intact`, function() {
            const testQueryStr = `key1=val1&key2=val2&key3=val3`;
            const baseTestURL = `http://www.example.com`;

            const testURL = `${baseTestURL}/1/2/3?${testQueryStr}`;

            expect(swapLastURLPath('FINAL', testURL))
                .to.eql(`${baseTestURL}/1/2/FINAL?${testQueryStr}`);
        });
    });

    describe(`urlWithoutProtocol`, function() {
        it(`returns given URL w/ protocol string ('http://' or 'https://') removed`, function() {
            const testUrl = `http://www.example.com`;
            const testUrl2 = `https://www.example.com/one/two?key=val`;
            expect(urlWithoutProtocol(testUrl)).to.eql('www.example.com');
            expect(urlWithoutProtocol(testUrl2)).to.eql('www.example.com/one/two?key=val');
        });
    });

    describe(`urlProtocolString`, function() {
        it(`returns protocol string prepending the given URL ('https://' or 'http://')`, function() {
            const testUrl = `http://www.example.com`;
            const testUrl2 = `https://www.example.com`;
            expect(urlProtocolString(testUrl)).to.eql('http://');
            expect(urlProtocolString(testUrl2)).to.eql('https://');
        });
    });
});
