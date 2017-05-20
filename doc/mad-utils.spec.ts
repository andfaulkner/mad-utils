/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

// Ensure environment knows testing is occurring.
process.env.mocha = true;

// Store original process.argv.
const oldProcArgs = Object.assign({}, process.argv);

/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('mad-utils.spec.ts', colors.green.bgWhite));


/************************************** THIRD-PARTY IMPORTS ***************************************/
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as fs from 'fs';
import * as path from 'path';
import { stderr, stdout } from 'test-console';

/*********************************** IMPORT FILES TO BE TESTED ************************************/
import { m_, mUtils, append, first, event, addClickEventToId, $, dom } from '../shared';

/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors.
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result.
 */
function blockErrorOutput(fn) {
}

/********************************************* TESTS **********************************************/
describe('mUtils', function() {
    it('exists', function() {
        expect(mUtils).to.exist;
    });
    it('is an object', function() {
        expect(mUtils).to.be.an('object');
    });
    it('has alias m_', function() {
        expect(m_).to.eql(mUtils);
    });

    describe('[namespace', function() {
        describe('.array]', function() {
            it('-- exists', function() {
                expect(m_.array).to.be.an('object');
            });
            it(`-- exists : #append`, function() {
                expect(m_.array.append).to.exist;
                expect(append).to.exist;
            });
            it(`.append : merges all given arrays into 1`, function() {
                expect(append([1, 2], [3, 4])).to.eql([1, 2, 3, 4]);
                expect(append([1, 2], [3, 4], [5, 6])).to.eql([1, 2, 3, 4, 5, 6]);
                expect(append([1, 2], null, [5, 6])).to.eql([1, 2, 5, 6]);
            });
            it(`-- exists : #first`, function() {
                expect(m_.array.first).to.exist;
                expect(first).to.exist;
            });
            it(`-- exists : #second`, function() { expect(m_.array.second).to.exist; });
            it(`-- exists : #third`, function() { expect(m_.array.third).to.exist; });
            it(`-- exists : #without.last`, function() {
                expect(m_.array.without.last).to.exist;
            });
            it(`-- exists : #without.last2`, function() {
                expect(m_.array.without.last2).to.exist;
            });
            it(`-- exists : #without.last3`, function() {
                expect(m_.array.without.last3).to.exist;
            });
            it(`-- exists : #without.first`, function() {
                expect(m_.array.without.first).to.exist;
            });
            it(`-- exists : #without.first2`, function() {
                expect(m_.array.without.first2).to.exist;
            });
            it(`-- exists : #without.first3`, function() {
                expect(m_.array.without.first3).to.exist;
            });
            it(`-- exists : #without.firstN`, function() {
                expect(m_.array.without.firstN).to.exist;
            });
        });

        describe('.coll]', function() {
            it('-- exists', function() {
                expect(m_.coll).to.be.an('object');
            });

        });

        describe('.date]', function() {
            it('-- exists', function() {
                expect(m_.date).to.be.an('object');
            });
        });

        describe('.decorator]', function() {
            it('-- exists', function() {
                expect(m_.decorator).to.be.an('object');
            });
        });

        describe('.dom]', function() {
            it('-- exists', function() {
                expect(dom).to.be.an('object');
                expect(m_.dom).to.be.an('object');
            });
            it('-- has document.getElementById stand-in $', function() {
                expect($).to.be.a('function');
                expect(dom.$).to.be.a('function');
                expect(m_.dom.$).to.be.a('function');
            });
        });

        describe('.enum]', function() {

        });

        describe('.error]', function() {
            it('-- exists', function() {
                expect(mUtils.error).to.be.an('object');
            });
        });

        describe('.event]', function() {
            it('-- exists', function() {
                expect(m_.event).to.be.an('object');
            });
        });

        describe('.number]', function() {
            it('-- exists', function() {
                expect(mUtils.number).to.be.an('object');
            });
        });

        describe('.object]', function() {
            it('-- exists', function() {
                expect(mUtils.object).to.be.an('object');
            });
        });

        describe('.query]', function() {
            it('-- exists', function() {
                expect(mUtils.query).to.be.an('object');
            });
        });

        describe('.search]', function() {
            it('-- exists', function() {
                expect(mUtils.search).to.be.an('object');
            });
        });

        describe('.string]', function() {
            it('-- exists', function() {
                expect(mUtils.string).to.be.an('object');
            });
        });

        describe('.test]', function() {
            it('-- exists', function() {
                expect(mUtils.test).to.be.an('object');
            });
        });

        describe('.type]', function() {
            it('-- exists', function() {
                expect(mUtils.type).to.be.an('object');
            });
        });
    });

    /**
     * Restore original process.argv.
     */
    after(function() {
        process.argv = Object.assign({}, oldProcArgs);
    });
});
