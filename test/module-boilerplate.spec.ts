/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

// Ensure environment knows testing is occurring.
process.env.mocha = true;

// Store original process.argv.
const oldProcArgs = Object.assign({}, process.argv);

/************************************** THIRD-PARTY IMPORTS ***************************************/
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as fs from 'fs';
import * as path from 'path';
import { stderr, stdout } from 'test-console';

/*********************************** IMPORT FILES TO BE TESTED ************************************/
import { mUtils } from '../index';

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
    it('is the thing', function() {
        expect(mUtils).to.be.an('object');
    });

    describe('[namespace', function() {
        describe('.array]', function() {
            it('-- exists', function() {
                expect(mUtils.array).to.be.an('object');
            });
        });

        describe('.coll]', function() {
            it('-- exists', function() {
                expect(mUtils.coll).to.be.an('object');
            });
        });

        describe('.date]', function() {
            it('-- exists', function() {
                expect(mUtils.date).to.be.an('object');
            });
        });

        describe('.decorator]', function() {
            it('-- exists', function() {
                expect(mUtils.decorator).to.be.an('object');
            });
        });

        describe('.enum]', function() {
            enum ColorTest {
                BLUE, ReD, black
            }
            it('-- exists', function() {
                expect(mUtils.enum).to.be.an('object');
            });

            it('.enumValToString -- Converts an enum item into a string', function() {
                expect(mUtils.enum.enumValToString(ColorTest, ColorTest.ReD)).to.eql('ReD');
                expect(mUtils.enum.enumValToString(ColorTest, ColorTest.BLUE)).to.eql('BLUE');
                expect(mUtils.enum.enumValToString(ColorTest, ColorTest.black)).to.eql('black');
            });

            it('.enumToStringArray -- Converts an enum into an ordered array of strings', function() {
                expect(mUtils.enum.enumToStringArray(ColorTest)).to.eql(['BLUE', 'ReD', 'black']);
                expect(mUtils.enum.enumToStringArray(ColorTest)).to.not.eql(['ReD', 'BLUE', 'black']);
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

        describe('.search]', function() {
            it('-- exists', function() {
                expect(mUtils.search).to.be.an('object');
            });
        });

        describe('.string]', function() {
            it('-- exists', function() {
                expect(mUtils.string).to.be.an('object');
            });
            it('.capitalize -- capitalizes first char of given string', function() {
                expect(mUtils.string.capitalize('asdf')).to.eql('Asdf');
                expect(mUtils.str.capitalize('the quick brown fox')).to.eql('The quick brown fox');
                expect(mUtils.str.capitalize(' quick brown fox')).to.eql(' quick brown fox');
                expect(mUtils.str.capitalize('Quick brown fox')).to.eql('Quick brown fox');
                expect(mUtils.str.capitalize('The Quick Brown Fox')).to.eql('The Quick Brown Fox');
                expect(mUtils.str.capitalize('the Quick Brown Fox')).to.eql('The Quick Brown Fox');
                expect(mUtils.str.capitalize('THE QUICK BROWN FOX')).to.eql('THE QUICK BROWN FOX');
            });

            it('.cap1LowerRest -- capitalizes 1st char of given string, turns rest to lowercase', function() {
                expect(mUtils.string.cap1LowerRest('asdf')).to.eql('Asdf');
                expect(mUtils.str.cap1LowerRest('the quick brown fox')).to.eql('The quick brown fox');
                expect(mUtils.str.cap1LowerRest(' quick brown fox')).to.eql(' quick brown fox');
                expect(mUtils.str.cap1LowerRest('Quick brown fox')).to.eql('Quick brown fox');
                expect(mUtils.str.cap1LowerRest('The Quick Brown Fox')).to.eql('The quick brown fox');
                expect(mUtils.str.cap1LowerRest('the Quick Brown Fox')).to.eql('The quick brown fox');
                expect(mUtils.str.cap1LowerRest('THE QUICK BROWN FOX')).to.eql('The quick brown fox');
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
