/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/******************************** IMPORT QUERY MODULE FOR TESTING *********************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';
import {expectFunctionExists} from '../../node';

import {
    m_,
    url,
    parseQueryParams,
    getLangFromUrlPathname,
    lastUrlPath,
    getUrlPathAroundLang,
    getUrlPathAfterLang,
    getUrlPathBeforeLang,
    getLangFromURLPathname,
    langFromUrlPathname,
    langFromURLPathname,
    getQueryParamString,
    urlMinusLastPath,
    swapLastURLPath,
    urlWithoutProtocol,
    urlProtocolString,
    swapMatchingURLPaths,
    normalizeURLPathname,
    urlPathnameWithQuery,
    extractFromUrl,
    isAbsoluteURL,
} from '../../shared';

import {url as urlFromNode} from '../../node';
import {url as urlFromBrowser} from '../../browser';
import * as urlModule from '../../src/url';

/********************************************* TESTS **********************************************/
describe(`url sub-module`, function() {
    expectNonEmptyObjectExists(url, 'url (from shared/base export)');
    expectNonEmptyObjectExists(m_.url, 'url (from m_ top-level namespace)');
    expectNonEmptyObjectExists(urlModule, 'url (import all from url.ts file)');
    expectNonEmptyObjectExists(urlFromNode, 'url (from Node export)');
    expectNonEmptyObjectExists(urlFromBrowser, 'url (from Browser export)');

    describe('.parseQueryParams]', function() {
        expectFunctionExists(m_.url.parseQueryParams);
        expectFunctionExists(parseQueryParams);
        it('-- is a function', function() {
            expect(m_.url.parseQueryParams).to.be.a('function');
        });
        it('-- parses query param strings into objects', function() {
            const queryParams = '?gender=female&birthdate=2013/10/20&region=AB';
            const queryParamsAsObj = m_.url.parseQueryParams(queryParams);
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
        expectFunctionExists(m_.url.getLangFromUrlPathname);
        expectFunctionExists(m_.url.getLangFromURLPathname);
        expectFunctionExists(m_.url.langFromUrlPathname);
        expectFunctionExists(m_.url.langFromURLPathname);
        expectFunctionExists(getLangFromUrlPathname);
        expectFunctionExists(getLangFromURLPathname);
        expectFunctionExists(langFromUrlPathname);
        expectFunctionExists(langFromURLPathname);
        it('-- pulls current lang out of given pathname string', function() {
            expect(getLangFromUrlPathname('/en/home')).to.eql('en');
            expect(getLangFromUrlPathname('/fr/home')).to.eql('fr');
        });
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
            expect(getUrlPathAfterLang({url: '1/2/en/one/two'})).to.eql('one/two');
        });
        it(`returns substring following first '/fr/' match in given string`, function() {
            expect(getUrlPathAfterLang('asdf/fr/one/two')).to.eql('one/two');
        });
        it(`returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }`, function() {
            expect(getUrlPathAfterLang({url: '1/2/ga/three/4', curLang: 'ga'})).to.eql('three/4');
        });
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }`, function() {
            expect(getUrlPathAfterLang({url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok']})).to.eql(
                '3/4'
            );
            expect(getUrlPathAfterLang({url: '1/2/ok/3/4', supportedLangs: ['ok']})).to.eql('3/4');
        });
        // TODO test getUrlPathAfterLang's no-arg condition :: getUrlPathAfterLang();
    });

    describe(`.getUrlPathBeforeLang`, function() {
        it(`returns substring following first '/en/' match in given string`, function() {
            expect(getUrlPathBeforeLang('asdf/en/one/two')).to.eql('asdf');
        });
        it(`returns substring '1/2' when given { url: '1/2/en/one/two'}`, function() {
            expect(getUrlPathBeforeLang({url: '1/2/en/one/two'})).to.eql('1/2');
        });
        it(`returns substring following first '/fr/' match in given string`, function() {
            expect(getUrlPathBeforeLang('asdf/fr/one/two')).to.eql('asdf');
        });
        it(`returns 'three/4' when given { url: '1/2/ga/three/4', curLang: 'ga' }`, function() {
            expect(getUrlPathBeforeLang({url: '1/2/ga/three/4', curLang: 'ga'})).to.eql('1/2');
        });
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'] }`, function() {
            expect(getUrlPathBeforeLang({url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok']})).to.eql(
                '1/2'
            );
            expect(getUrlPathBeforeLang({url: '1/2/ok/3/4', supportedLangs: ['ok']})).to.eql('1/2');
        });
        // TODO test getUrlPathBeforeLang's no-arg condition :: getUrlPathBeforeLang();
    });

    // TODO test getUrlPathAroundLang more extensively;

    describe(`.urlPathAroundLang`, function() {
        it(`returns '3/4' when given { url: '1/2/ok/3/4', supportedLangs: ['ga', 'ok'], getStrBeforeLang: true }`, function() {
            expect(
                getUrlPathAroundLang({
                    url: '1/2/ok/3/4',
                    supportedLangs: ['ga', 'ok'],
                    getStrBeforeLang: true,
                })
            ).to.eql('1/2');
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

            expect(swapLastURLPath('FINAL', testURL)).to.eql(
                `${baseTestURL}/1/2/FINAL?${testQueryStr}`
            );
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

    describe(`swapMatchingURLPaths`, function() {
        const testHost = `http://www.exmpl.com`;
        const testQuery = `keyfirst=valfirst&keySecond=valSecond`;
        const testUrl = `${testHost}/first/second/third?${testQuery}`;

        it(`swaps new path val into URL paths matching entire given string. Ignores query string`, function() {
            expect(swapMatchingURLPaths('first', 'ONE', testUrl)).to.eql(
                `${testHost}/ONE/second/third?${testQuery}`
            );
            expect(swapMatchingURLPaths('second', 'TWO', testUrl)).to.eql(
                `${testHost}/first/TWO/third?${testQuery}`
            );
            expect(swapMatchingURLPaths('third', 'THREE', testUrl)).to.eql(
                `${testHost}/first/second/THREE?${testQuery}`
            );
        });

        it(`swaps new path val into URL paths fully matching given RegExp. Ignores query string`, function() {
            expect(swapMatchingURLPaths(/[a-z]irs[a-z]/, 'ONE', testUrl)).to.eql(
                `${testHost}/ONE/second/third?${testQuery}`
            );
            expect(swapMatchingURLPaths(/[a-z]eco[a-z]{2}/, 'TWO', testUrl)).to.eql(
                `${testHost}/first/TWO/third?${testQuery}`
            );
            expect(swapMatchingURLPaths(/.+rd/, 'THREE', testUrl)).to.eql(
                `${testHost}/first/second/THREE?${testQuery}`
            );
            expect(swapMatchingURLPaths(/fir[a-z]+$/, 'FIRST', testUrl)).to.eql(
                `${testHost}/FIRST/second/third?${testQuery}`
            );
        });

        it(`does not swap new path val into partially matching URL paths.`, function() {
            expect(swapMatchingURLPaths('firs', 'ONE', testUrl)).to.eql(testUrl);
            expect(swapMatchingURLPaths('secon', 'TWO', testUrl)).to.eql(testUrl);
            expect(swapMatchingURLPaths(/fir[a-z]/, 'ONE', testUrl)).to.eql(testUrl);
            expect(swapMatchingURLPaths(/[a-z]econ/, 'TWO', testUrl)).to.eql(testUrl);
        });

        it(`swaps all when there are multiple matching paths (ignoring query string)`, function() {
            expect(swapMatchingURLPaths(/.+/, 'MATCH', testUrl)).to.eql(
                `${testHost}/MATCH/MATCH/MATCH?${testQuery}`
            );
        });
    });

    describe(`normalizeURLPathname`, function() {
        it(`returns empty string if given empty string`, function() {
            expect(normalizeURLPathname(``)).to.eql(``);
        });
        it(`add / before paths`, function() {
            expect(normalizeURLPathname(`asdf`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`asdf/123`)).to.eql(`/asdf/123`);
        });
        it(`replace // with /`, function() {
            expect(normalizeURLPathname(`//`)).to.eql(`/`);
            expect(normalizeURLPathname(`//asdf`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`//asdf//123/qwerty`)).to.eql(`/asdf/123/qwerty`);
            expect(normalizeURLPathname(`//asdf/123//qwerty`)).to.eql(`/asdf/123/qwerty`);
        });
        it(`remove trailing /`, function() {
            expect(normalizeURLPathname(`/a/`)).to.eql(`/a`);
            expect(normalizeURLPathname(`/asdf/qwerty/`)).to.eql(`/asdf/qwerty`);
        });
        it(`remove / before query params`, function() {
            expect(normalizeURLPathname(`/a/?dog=meeka`)).to.eql(`/a?dog=meeka`);
            expect(normalizeURLPathname(`/asdf/qwerty/?dog=meeka`)).to.eql(
                `/asdf/qwerty?dog=meeka`
            );
            expect(normalizeURLPathname(`/asdf/qwerty/123/?dog=meeka`)).to.eql(
                `/asdf/qwerty/123?dog=meeka`
            );
            expect(normalizeURLPathname(`/asdf/qwerty/123/okok/?dog=meeka`)).to.eql(
                `/asdf/qwerty/123/okok?dog=meeka`
            );
        });
        it(`remove strings of only spaces`, function() {
            expect(normalizeURLPathname(` `)).to.eql(``);
            expect(normalizeURLPathname(`    `)).to.eql(``);
        });
        it(`remove preceding spaces`, function() {
            expect(normalizeURLPathname(` /`)).to.eql(`/`);
            expect(normalizeURLPathname(`  /`)).to.eql(`/`);
            expect(normalizeURLPathname(`   /`)).to.eql(`/`);
            expect(normalizeURLPathname(` /asdf`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`   /asdf`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` /asdf/`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`   /asdf/`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` /asdf/qwerty`)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`   /asdf/qwerty`)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(` /asdf/qwerty/`)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`   /asdf/qwerty/`)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`    /asdf/qwerty/`)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(` asdf`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`    asdf`)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` asdf/qwerty`)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`      asdf/qwerty`)).to.eql(`/asdf/qwerty`);
        });
        it(`remove trailing spaces`, function() {
            expect(normalizeURLPathname(`/ `)).to.eql(`/`);
            expect(normalizeURLPathname(`/  `)).to.eql(`/`);
            expect(normalizeURLPathname(`/   `)).to.eql(`/`);
            expect(normalizeURLPathname(`/asdf `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`/asdf   `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`/asdf/ `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`/asdf/   `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`/asdf/qwerty `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`/asdf/qwerty   `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`/asdf/qwerty/ `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`/asdf/qwerty/   `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`/asdf/qwerty/    `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`asdf `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`asdf   `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`asdf/qwerty `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`asdf/qwerty      `)).to.eql(`/asdf/qwerty`);
        });
        it(`remove trailing & preceding spaces`, function() {
            expect(normalizeURLPathname(` / `)).to.eql(`/`);
            expect(normalizeURLPathname(`  / `)).to.eql(`/`);
            expect(normalizeURLPathname(`  /  `)).to.eql(`/`);
            expect(normalizeURLPathname(`   /   `)).to.eql(`/`);
            expect(normalizeURLPathname(` /asdf `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`   /asdf   `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` /asdf/ `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(`    /asdf/   `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` /asdf/qwerty `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`  /asdf/qwerty   `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`     /asdf/qwerty/ `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`  /asdf/qwerty/   `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`     /asdf/qwerty/    `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`   asdf `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` asdf   `)).to.eql(`/asdf`);
            expect(normalizeURLPathname(` asdf/qwerty `)).to.eql(`/asdf/qwerty`);
            expect(normalizeURLPathname(`  asdf/qwerty      `)).to.eql(`/asdf/qwerty`);
        });
    });

    describe(`urlPathnameWithQuery`, function() {
        it(`should return pathname from given URL with protocol and no query`, function() {
            expect(urlPathnameWithQuery(`https://www.example.com/a/b/c`)).to.eql(`/a/b/c`);
            expect(urlPathnameWithQuery(`https://example.com/asdf`)).to.eql(`/asdf`);
        });
        it(`should return pathname from given URL with no protocol and no query`, function() {
            expect(urlPathnameWithQuery(`www.example.com/a/b/c`)).to.eql(`/a/b/c`);
            expect(urlPathnameWithQuery(`example.com/asdf`)).to.eql(`/asdf`);
        });
        it(`should return pathname & query from given URL with no protocol`, function() {
            expect(urlPathnameWithQuery(`www.example.com/a/b/c?k=v`)).to.eql(`/a/b/c?k=v`);
            expect(urlPathnameWithQuery(`example.com/asdf?key=val&key2=val2`)).to.eql(
                `/asdf?key=val&key2=val2`
            );
        });
        it(`should return pathname & query from given URL with protocol`, function() {
            expect(urlPathnameWithQuery(`https://www.example.com/a/b/c?k=v`)).to.eql(`/a/b/c?k=v`);
            expect(urlPathnameWithQuery(`https://example.com/asdf?key=val&key2=val2`)).to.eql(
                `/asdf?key=val&key2=val2`
            );
        });
    });

    // TODO more extractFromUrl tests
    describe(`extractFromUrl`, function() {
        it(`returns query string at end if 'query' given as urlParts arg`, function() {
            expect(extractFromUrl(`query`, `http://www.exmpl.ca:8080/a/b/c?key=val&b=2`)).to.eql(
                `?key=val&b=2`
            );
            expect(extractFromUrl([`query`], `http://www.exmpl.ca:8080/a/b/c?key=val&b=2`)).to.eql(
                `?key=val&b=2`
            );
        });

        it(`returns protocol (including ://) if 'protocol' given as urlParts arg`, function() {
            expect(extractFromUrl(`protocol`, `http://www.exmpl.ca:8080/a/b/c?key=val&b=2`)).to.eql(
                `http://`
            );
            expect(
                extractFromUrl([`protocol`], `https://www.exmpl.ca:8080/a/b/c?key=val&b=2`)
            ).to.eql(`https://`);
        });

        it(`returns hostname if 'hostname' given as urlParts arg`, function() {
            expect(extractFromUrl(`hostname`, `http://www.exmpl.ca:8080/a/b/c?key=val&b=2`)).to.eql(
                `www.exmpl.ca`
            );
            expect(
                extractFromUrl([`hostname`], `https://www.exmpl2.ca:8080/a/b/c?key=val&b=2`)
            ).to.eql(`www.exmpl2.ca`);
        });

        it(`returns port (including ':') if 'port' given as urlParts arg`, function() {
            expect(extractFromUrl(`port`, `http://www.exmpl.ca:8080/a/b/c?key=val&b=2`)).to.eql(
                `:8080`
            );
            expect(extractFromUrl([`port`], `https://www.exmpl2.ca:9000/a/b/c?key=val&b=2`)).to.eql(
                `:9000`
            );
        });
        it(`returns empty string if 'port' given as urlParts arg but URL has no port`, function() {
            expect(
                extractFromUrl(`port`, `https://www.secondexample.com/a/b/c?key=val&b=2`)
            ).to.eql(``);
            expect(extractFromUrl([`port`], `https://www.exmpl2.ca/a/b/c?key=val&b=2`)).to.eql(``);
        });

        it(`returns pathname (e.g. /a/b/c) if urlParts arg is 'pathname' or 'path'`, function() {
            expect(
                extractFromUrl(`path`, `https://www.example.com/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`/asdf/qwer/last`);
            expect(
                extractFromUrl(`pathname`, `https://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`/asdf/qwer/last`);
            expect(
                extractFromUrl([`path`], `https://www.example.com/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`/asdf/qwer/last`);
            expect(
                extractFromUrl([`pathname`], `https://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`/asdf/qwer/last`);
        });

        it(`returns full host (e.g. www.example.ca:8080) if urlParts arg is 'host'`, function() {
            expect(
                extractFromUrl(`host`, `https://www.example.com:8080/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`www.example.com:8080`);
            expect(
                extractFromUrl([`host`], `http://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`www.example2.ca`);
        });

        it(`returns combinations of values in a conglomerate string`, function() {
            expect(
                extractFromUrl([`protocol`, `host`], `https://www.example.com:8080/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`https://www.example.com:8080`);
            expect(
                extractFromUrl([`host`, `pathname`], `http://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`www.example2.ca/asdf/qwer/last`);
            expect(
                extractFromUrl([`pathname`, `query`], `http://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`/asdf/qwer/last?key=val&b=2`);
            expect(
                extractFromUrl([`host`, `pathname`, `query`], `http://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`www.example2.ca/asdf/qwer/last?key=val&b=2`);
        });

        it(`handles duplicate (overlapping) sections gracefully without duplications in returned string`, function() {
            expect(
                extractFromUrl([`host`, `hostname`], `http://www.example2.ca:8080/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`www.example2.ca:8080`);
            expect(
                extractFromUrl([`host`, `hostname`, `pathname`, `query`], `http://www.example2.ca/asdf/qwer/last?key=val&b=2`)
            ).to.eql(`www.example2.ca/asdf/qwer/last?key=val&b=2`);
        });
    });

describe(`isAbsoluteURL`, function(){
    it(`returns true for absolute HTTP URLs (http, https protocol) with domain`, function() {
        expect(isAbsoluteURL(`https://example.com`)).to.be.true;
        expect(isAbsoluteURL(`http://example.com/asdf`)).to.be.true;
        expect(isAbsoluteURL(`https://example.com/asdf/123`)).to.be.true;
        expect(isAbsoluteURL(`http://example.com/asdf/123?key=val`)).to.be.true;
        expect(isAbsoluteURL(`https://example.com/asdf/123#asdf`)).to.be.true;
        expect(isAbsoluteURL(`http://www.example.com/asdf/123#asdf`)).to.be.true;
    });
    it(`returns true for absolute non-http protocols (e.g. mailto, gopher) with domain`, function() {
        expect(isAbsoluteURL(`gopher://asdf.gopher`)).to.be.true;
        expect(isAbsoluteURL(`mailto://wat@example.com`)).to.be.true;
        expect(isAbsoluteURL(`ftp://gr.argh`)).to.be.true;
    });
    it(`returns false for relative URLs`, function() {
        expect(isAbsoluteURL(`example.com`)).to.be.false;
        expect(isAbsoluteURL(`example.com/asdf`)).to.be.false;
        expect(isAbsoluteURL(`example.com/asdf/123`)).to.be.false;
        expect(isAbsoluteURL(`example.com/asdf/123?key=val`)).to.be.false;
        expect(isAbsoluteURL(`example.com/asdf/123#asdf`)).to.be.false;
        expect(isAbsoluteURL(`www.example.com/asdf/123#asdf`)).to.be.false;
    });
    it(`returns false if only the protocol is present`, function() {
        expect(isAbsoluteURL(`http://`)).to.be.false;
        expect(isAbsoluteURL(`https://`)).to.be.false;
        expect(isAbsoluteURL(`gopher://`)).to.be.false;
        expect(isAbsoluteURL(`mailto://`)).to.be.false;
        expect(isAbsoluteURL(`ftp://`)).to.be.false;
    });
});
});
