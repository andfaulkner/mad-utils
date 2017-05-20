/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT QUERY MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, query } from '../../shared';

const queryFns = m_.query;


/********************************************* TESTS **********************************************/
describe(`query sub-module`, function() {
    it(`exists`, function() {
        expect(query).to.exist;
    });
    describe('.parseQueryParams]', function() {
        it('-- exists', function() {
            expect(m_.query.parseQueryParams).to.exist;
        });
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
    });
});
