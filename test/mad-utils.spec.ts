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
import { m_, mUtils, append, first, event, addClickEventToId, $, dom } from '../index';

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
            enum ColorTest { BLUE, ReD, black }
            enum Suits { HEARTS, CLUBS, SPADES, DIAMONDS }

            it('-- exists', function() {
                expect(m_.enum).to.be.an('object');
            });

            it('.enumValToString -- Converts an enum item into a string', function() {
                expect(m_.enum.enumValToString(ColorTest, ColorTest.ReD)).to.eql('ReD');
                expect(m_.enum.enumValToString(ColorTest, ColorTest.BLUE)).to.eql('BLUE');
                expect(m_.enum.enumValToString(ColorTest, ColorTest.black)).to.eql('black');
            });

            it('.enumToStringArray -- Converts an enum into an ordered array of strings', function() {
                expect(m_.enum.enumToStringArray(ColorTest)).to.eql(['BLUE', 'ReD', 'black']);
                expect(m_.enum.enumToStringArray(ColorTest)).to.not.eql(['ReD', 'BLUE', 'black']);
            });

            describe('.stringToEnumVal --', function() {
                it('Returns numeric enum val if given enum has given val.', function() {
                    expect(m_.enum.stringToEnumVal('black', ColorTest)).to.eql(2);
                    expect(m_.enum.stringToEnumVal('HEARTS', Suits)).to.eql(0);
                    expect(m_.enum.stringToEnumVal('BLUE', ColorTest)).to.eql(0);
                    expect(m_.enum.stringToEnumVal('ReD', ColorTest)).to.eql(1);
                    expect(m_.enum.stringToEnumVal('SPADES', Suits)).to.eql(2);
                    expect(m_.enum.stringToEnumVal('DIAMONDS', Suits)).to.eql(3);
                });

                it('Ignores caps.', function() {
                    expect(m_.enum.stringToEnumVal('Black', ColorTest)).to.eql(2);
                    expect(m_.enum.stringToEnumVal('BLACK', ColorTest)).to.eql(2);
                    expect(m_.enum.stringToEnumVal('BLaCK', ColorTest)).to.eql(2);
                    expect(m_.enum.stringToEnumVal('BluE', ColorTest)).to.eql(0);
                    expect(m_.enum.stringToEnumVal('RED', ColorTest)).to.eql(1);
                    expect(m_.enum.stringToEnumVal('diamonds', Suits)).to.eql(3);
                    expect(m_.enum.stringToEnumVal('dIaMoNDs', Suits)).to.eql(3);
                });

                it('Return 99999 if no match, including indexes', function() {
                    expect(m_.enum.stringToEnumVal('O_R_a_N_g_E', ColorTest)).to.eql(99999);
                    expect(m_.enum.stringToEnumVal('1', ColorTest)).to.eql(99999);
                    expect(m_.enum.stringToEnumVal('0', ColorTest)).to.eql(99999);
                    expect(m_.enum.stringToEnumVal('2', Suits)).to.eql(99999);
                });
            });


            it('.isDataEnumItem -- Detects if a string matches an enum val, and accounts for the index values.)', function() {
                log.silly("isDataEnumItem tests :: Suits['HEARTS']:", Suits['HEARTS']);
                expect(m_.enum.isDataEnumItem('HEARTS', Suits)).to.be.true;

                log.silly("isDataEnumItem tests :: Suits['WRENCHES']:", Suits['WRENCHES']);
                expect(m_.enum.isDataEnumItem('WRENCHES', Suits)).to.be.false;

                log.silly("isDataEnumItem tests :: Suits['1']:", Suits['1']);
                expect(m_.enum.isDataEnumItem('1', Suits)).to.be.false;
                expect(m_.enum.isDataEnumItem('0', Suits)).to.be.false;
                expect(m_.enum.isDataEnumItem(1, Suits)).to.be.false;

                log.silly("isDataEnumItem tests :: Suits[0]:", Suits[0]);
                expect(m_.enum.isDataEnumItem(0, Suits)).to.be.false;
            });
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
            it('has function mouseEventFactory, which builds mouse events but does nothing in Node',
                function() {
                    const mouseEvent = m_.event.mouseEventFactory();
                    expect(mouseEvent).to.be.undefined; // in node it shouldn't work
                }
            );
            it('has function removeClickEventFromId, which removes click events in browser but does nothing in Node',
                function() {
                    expect(event.removeClickEventFromId()).to.be.undefined;
                    expect(m_.event.removeClickEventFromId()).to.be.undefined;
                }
            );
            it('has function addClickEventToId, which adds click events in browser but does nothing in Node',
                function() {
                    expect(addClickEventToId('', (ev: any) => '')).to.be.undefined;
                    expect(event.addClickEventToId('', (ev: any) => '')).to.be.undefined;
                    expect(m_.event.addClickEventToId('', (ev: any) => '')).to.be.undefined;
                }
            );
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
            describe('.parseQueryParams]', function() {
                it('-- exists', function() {
                    expect(mUtils.query.parseQueryParams).to.exist;
                });
                it('-- is a function', function() {
                    expect(mUtils.query.parseQueryParams).to.be.a('function');
                });
                it('-- parses query param strings into objects', function() {
                    const queryParams = '?gender=female&birthdate=2013/10/20&region=AB';
                    const queryParamsAsObj = mUtils.query.parseQueryParams(queryParams);
                    expect(queryParamsAsObj).to.have.keys('gender', 'birthdate', 'region');
                    expect(queryParamsAsObj['gender']).to.eql('female');
                    expect(queryParamsAsObj['region']).to.eql('AB');
                    expect(queryParamsAsObj['birthdate']).to.eql('2013/10/20');
                });
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
