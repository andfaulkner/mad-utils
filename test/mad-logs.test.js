// ensure environment knows testing is occurring
process.env.mocha = true;

// Store original process.argv
const oldProcArgs = Object.assign({}, process.argv);

/************************************** THIRD-PARTY IMPORTS ***************************************/
const { expect } = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');

const fs = require('fs');
const path = require('path');
const partial = require('lodash.partial');
const { stderr, stdout } = require('test-console');

/************************************ IMPORT FILE TO BE TESTED ************************************/
const { logFactory, logMarkers } = require('../index');

/********************************************* TESTS **********************************************/
describe('logFactory', function() {
    it('exists', function() {
        expect(logFactory).to.exist;
    });

    it('returns a function when given a config object with a valid log level', function() {
        ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach((lvl) => {
            expect(logFactory({ logLevel: lvl })).to.be.a('function');
        });

        expect(logFactory({ logLevel: 'info', port: 8080, host: 'localhost' })).to.be.a('function');
    });

    it('returns function if given no config object (this triggers default log level)', function() {
        expect(logFactory).to.not.throw(TypeError);
        expect(logFactory()).to.be.a('function');
    });

    it('throws TypeError if given an invalid (or no) log level or config object', function () {
        expect(partial(logFactory, {})).to.throw(TypeError);
        expect(partial(logFactory, '')).to.throw(TypeError);
        expect(partial(logFactory, ['asdf'])).to.throw(TypeError);
        expect(partial(logFactory, { poo: "poooooo" })).to.throw(TypeError);
        expect(partial(logFactory, { logLevel: {} })).to.throw(TypeError);
        expect(partial(logFactory, { logLevel: "notARealLevel" })).to.throw(TypeError);
        expect(partial(logFactory, { logLevel: "" })).to.throw(TypeError);
    });

    describe('log function constructed by logFactory', function() {
        let logger;
        before(() => {
            const config = { logLevel: 'silly' };
            logger = logFactory(config)('mad-logs.test');
        });

        it('returns log function w/ props for each logLvl when given config & filename', function () {
            expect(logger).to.exist;
            expect(logger).to.be.a('function');
            ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach((methodName) => {
                expect(logger).to.have.property(methodName);
            });
        });

        it('writes to terminal, including a tag w/ filename received by constructor', function () {
            const storeWarnErrorLogs = [];

            // stub console.log and most of console's internals
            const output = stdout.inspectSync(function() {

                // override console warn and console error
                const warnOrig = console.warn;
                console.warn = (...msgs) => storeWarnErrorLogs.push(msgs);
                const errorOrig = console.error;
                console.error = (...msgs) => storeWarnErrorLogs.push(msgs);

                // log using the library, with the console fully stubbed
                logger('testOutputBaseLog');
                logger.silly('testOutputSilly');
                logger.verbose('testOutputVerbose');
                logger.debug('testOutputDebug');
                logger.info('testOutputInfo');
                logger.warn('testOutputWarn');
                logger.error('testOutputError');
                logger.wtf('testOutputWtf');

                // restore the remaining console methods
                console.warn = warnOrig;
                console.error = errorOrig;
            });

            // test against the text intended for the terminal (but captured by the stub)
            expect(output).to.have.members([
                '[mad-logs.test]  testOutputBaseLog\n',
                '[mad-logs.test]  testOutputSilly\n',
                '[mad-logs.test]  testOutputVerbose\n',
                '[mad-logs.test]  testOutputDebug\n',
                '[mad-logs.test]  testOutputInfo\n'
            ]);

            // ensure the console outputs reached the console.warn & .error using log methods
            expect(storeWarnErrorLogs.some((curLog) =>
                curLog.some((lBit) => lBit === 'testOutputWarn'))).to.be.true;
            expect(storeWarnErrorLogs.some((curLog) =>
                curLog.some((lBit) => lBit === 'testOutputError'))).to.be.true;
            expect(storeWarnErrorLogs.some((curLog) =>
                curLog.some((lBit) => lBit === 'testOutputWtf'))).to.be.true;
        });
    });
});

describe('logMarkers', function() {
    it('exists', function() {
        expect(logMarkers).to.exist;
    });
    it('has over 20 defined styles', function () {
        expect(Object.keys(logMarkers)).to.have.length.above(20);
    });
    it('only contains objects with keys tagPrefix, tagSuffix, and style', function () {
        Object.keys(logMarkers).forEach((markerKey) => {
            const curLogMarker = logMarkers[markerKey];
            expect(curLogMarker.tagPrefix).to.be.a('string');
            expect(curLogMarker.tagSuffix).to.be.a('string');
            expect(curLogMarker.style).to.be.a('string');
        })
    });
});

// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
