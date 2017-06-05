/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT QUERY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, query, parseQueryParams, getLangFromUrlPathname } from '../../shared';
import { expectFunctionExists } from '../../node';

const queryFns = m_.query;


/********************************************* TESTS **********************************************/
describe(`query sub-module`, function() {
    it(`exists`, function() {
        expect(query).to.exist;
    });
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
});
