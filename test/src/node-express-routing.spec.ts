/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import {m_, error, nodeError} from '../../node';

import {
    expressRouting,
    getFirstUrlPath,
    getLastUrlPath,
    getUrlPathFromReq,
    isSupportedLang,
} from '../../node';

import * as nodeExpressRouting from '../../src/node/express-routing';

/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    expectNonEmptyObjectExists(expressRouting, 'nodeError (import all from nodeError.ts file)');
    expectNonEmptyObjectExists(nodeExpressRouting, 'nodeError (from Node export)');

    describe(`getFirstUrlPath`, function() {
        it(`returns 1st path in given insecure full path URL`, function() {
            expect(getFirstUrlPath(`http://example.com/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns 1st path in given secure full path URL`, function() {
            expect(getFirstUrlPath(`https://example.com/CORRECT_PATH/two/3`)).to.eql(
                'CORRECT_PATH'
            );
        });
        it(`returns 1st path in given localhost URL`, function() {
            expect(getFirstUrlPath(`localhost:8080/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns 1st path in given partial URL (paths only), with preceding /`, function() {
            expect(getFirstUrlPath(`/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns 1st path in given partial URL (paths only), with no preceding /`, function() {
            expect(getFirstUrlPath(`CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns 1st path in given Request object (mock) at originalUrl`, function() {
            expect(
                getFirstUrlPath({originalUrl: `http://example.com/CORRECT_PATH/two/3`} as any)
            ).to.eql('CORRECT_PATH');
        });
    });

    describe(`getLastUrlPath`, function() {
        it(`returns last path in given insecure full path URL`, function() {
            expect(getLastUrlPath(`http://example.com/1/two/CORRECT_PATH`)).to.eql('CORRECT_PATH');
        });
        it(`returns last path in given secure full path URL`, function() {
            expect(getLastUrlPath(`https://example.com/1/two/CORRECT_PATH`)).to.eql('CORRECT_PATH');
        });
        it(`returns last path in given localhost URL`, function() {
            expect(getLastUrlPath(`localhost:8080/1/two/CORRECT_PATH`)).to.eql('CORRECT_PATH');
        });
        it(`returns last path in given partial URL (paths only), with preceding /`, function() {
            expect(getLastUrlPath(`/1/two/CORRECT_PATH`)).to.eql('CORRECT_PATH');
        });
        it(`returns last path in given partial URL (paths only), with no preceding /`, function() {
            expect(getLastUrlPath(`CORRECT_PATH/two/CORRECT_PATH`)).to.eql('CORRECT_PATH');
        });
        it(`returns last path in given Request object (mock) at originalUrl`, function() {
            expect(
                getLastUrlPath({originalUrl: `http://example.com/1/two/CORRECT_PATH`} as any)
            ).to.eql('CORRECT_PATH');
        });
    });

    describe(`getUrlPathFromReq`, function() {
        it(`returns '' if given req object with '' as originalUrl`, function() {
            expect(getUrlPathFromReq({originalUrl: ''} as any)).to.eql('');
            expect(getUrlPathFromReq({originalUrl: ''} as any, true)).to.eql('');
        });
        it(`returns '/' if given req object with '/' as originalUrl`, function() {
            expect(getUrlPathFromReq({originalUrl: '/'} as any)).to.eql('/');
            expect(getUrlPathFromReq({originalUrl: '/'} as any, true)).to.eql('/');
        });
        it(`If trailingSlash=false, ret '/home' given req obj w originalUrl '/home' or '/home/'`, function() {
            expect(getUrlPathFromReq({originalUrl: '/home'} as any, false)).to.eql('/home');
            expect(getUrlPathFromReq({originalUrl: '/home/'} as any, false)).to.eql('/home');
        });
        it(`If trailingSlash=true, ret '/home' given originalUrl '/home', & '/home/' given '/home/'`, function() {
            expect(getUrlPathFromReq({originalUrl: '/home'} as any, true)).to.eql('/home');
            expect(getUrlPathFromReq({originalUrl: '/home/'} as any, true)).to.eql('/home/');
        });
        it(`If trailingSlash=false, ret '/home/help' given originalUrl '/home/help', & '/home/help' given '/home/help/'`, function() {
            expect(getUrlPathFromReq({originalUrl: '/home/help'} as any, false)).to.eql(
                '/home/help'
            );
            expect(getUrlPathFromReq({originalUrl: '/home/help/'} as any, false)).to.eql(
                '/home/help'
            );
        });
        it(`If trailingSlash=true, ret '/home/help' given originalUrl '/home/help', & '/home/help/' given '/home/help/'`, function() {
            expect(getUrlPathFromReq({originalUrl: '/home/help'} as any, true)).to.eql(
                '/home/help'
            );
            expect(getUrlPathFromReq({originalUrl: '/home/help/'} as any, true)).to.eql(
                '/home/help/'
            );
        });
        it(`removes multiple trailing slashes (leaves 1 if trailingSlash=true)`, function() {
            expect(getUrlPathFromReq({originalUrl: '/home//////'} as any)).to.eql('/home');
            expect(getUrlPathFromReq({originalUrl: '/home/help//'} as any)).to.eql('/home/help');
            expect(getUrlPathFromReq({originalUrl: '/home/help///////'} as any, false)).to.eql(
                '/home/help'
            );
            expect(getUrlPathFromReq({originalUrl: '/home/help//'} as any, true)).to.eql(
                '/home/help/'
            );
        });
    });

    describe(`isSupportedLang`, function() {
        it(`returns true if given 'en' or 'fr' (with default supportedLangs)`, function() {
            expect(isSupportedLang('en')).to.be.true;
            expect(isSupportedLang('fr')).to.be.true;
        });
        it(`can handle trailing slashes - returns true if given 'en/' or 'fr/' (w def supportedLangs)`, function() {
            expect(isSupportedLang('en/')).to.be.true;
            expect(isSupportedLang('fr/')).to.be.true;
        });
        it(`Allows a custom language set to be set, returns true if given val from custom set)`, function() {
            expect(isSupportedLang('swahili', ['swahili', 'zulu', 'en'])).to.be.true;
            expect(isSupportedLang('zulu/', ['swahili', 'zulu', 'en'])).to.be.true;
        });
        it(`Returns false if given value other than 'en' or 'fr' (default supportedLangs)`, function() {
            expect(isSupportedLang('swahili')).to.be.false;
            expect(isSupportedLang('zulu/')).to.be.false;
        });
        it(`Returns false if given a value not in the given supportedLangs list`, function() {
            expect(isSupportedLang('en', ['swahili', 'zulu'])).to.be.false;
            expect(isSupportedLang('swahili/', ['en', 'zulu'])).to.be.false;
        });
    });
});
