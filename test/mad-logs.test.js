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
const colors = require('colors');

/*********************************** IMPORT FILES TO BE TESTED ************************************/
const { buildFileTagString, logFactory, logMarkers } = require('../lib/index');

/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result
 */
function blockErrorOutput(fn) {
    const errorLogs = [];
    const warnLogs = [];

    const errorOrig = console.error;
    console.error = (...msgs) => errorLogs.push(msgs);
    const warnOrig = console.warn;
    console.warn = (...msgs) => warnLogs.push(msgs);

    const result = fn();

    console.error = errorOrig;
    console.warn = warnOrig;

    return { errorLogs, warnLogs, result };
}

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

describe('buildFileTagString', function() {
    it('exists', function () {
        expect(buildFileTagString).to.exist;
    });
    it('outputs a string', function() {
        expect(buildFileTagString('test-name')).to.be.a('string');
    });
    it('includes the filename in the output', function () {
        expect(buildFileTagString('test-name')).to.contain('test-name');
    });
    it('surrounds output w colour codes if given function chain from colours module', function () {
        const testOutput = buildFileTagString('test-name', colors.blue);
        expect(testOutput).to.contain('\u001b[34m');
        expect(testOutput).to.contain('\u001b[39m');
        expect(testOutput).to.contain('\u001b[34mtest-name\u001b[39m');
    });
    it('does not leave the terminal output colourized after running', function() {
        const testOutput = buildFileTagString('test-name', colors.blue);
        const output = stdout.inspectSync(function(out) {
            console.log(`${testOutput} hey`);
            console.log(`this should not contain a colour code`);
        });
        expect(output[0]).to.contain('\u001b');
        expect(output[1]).to.not.contain('\u001b[39m');
    });
    it('pads the output to 20 characters if a pad length is not provided', function () {
        const testOutput = buildFileTagString('test-name', colors.blue);
        expect(testOutput).to.contain('           '); // 11 char space
        expect(testOutput).to.not.contain('            '); // 12 char space
        const testOutput2 = buildFileTagString('eighteen-char-str!', colors.blue);
        expect(testOutput2).to.contain('  ');
    });
    it('if a pad length is provided, pads output to given # of chars', function () {
        const testOutput = buildFileTagString('test-name', colors.blue, 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
        const testOutput2 = buildFileTagString('eighteen-char-str!', colors.blue, 25);
        expect(testOutput2).to.contain('       ');
        expect(partial(buildFileTagString, 'test-name', colors.blue, 25)).to.not.throw(TypeError);
    });
    it('throws if colourizer arg is non-function or function without _styles prop', function () {
        blockErrorOutput(() => {
            const output = stdout.inspectSync(function(out) {
                expect(
                    () => buildFileTagString('test-name', 'ccawa', 25)
                ).to.throw(TypeError);
                expect(
                    () => buildFileTagString('test-name', (() => 'out'), 25)
                ).to.throw(TypeError);
            });
        })
    });
    it('does not accept non-strings as tag argument', function () {
        blockErrorOutput(() => {
            const output = stdout.inspectSync(function(out) {
                expect(
                    () => buildFileTagString((() => ''), colors.blue, 25)
                ).to.throw(TypeError);
            });
        });
    });
    it('allows null as an arg for colourizer, & still pads if arg 3 is then a #', function () {
        const testOutput = buildFileTagString('test-name', null, 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
    });
    it('allows a number as 2nd arg, & pads by that amount', function () {
        const testOutput = buildFileTagString('test-name', 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
    });
});

// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
