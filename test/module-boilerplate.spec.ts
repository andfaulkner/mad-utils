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
const __nodeModuleBoilerplate__ = require('../lib/index');
const nodeModuleBoilerplateExport = __nodeModuleBoilerplate__.nodeModuleBoilerplateExport;

/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors.
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result.
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
describe('nodeModuleBoilerplateExport', function() {
    it('exists', function() {
        expect(nodeModuleBoilerplateExport).to.exist;
    });
    it('is the thing', function() {
        expect(nodeModuleBoilerplateExport).to.be.an('object');
    });
    it('#nodeModuleBoilerplateExport.nodeModuleBoilerplatePlaceholderFn throws if run', function() {
        expect(nodeModuleBoilerplateExport.nodeModuleBoilerplatePlaceholderFn).to.throw(Error);
    });

    /**
     * Restore original process.argv.
     */
    after(function() {
        process.argv = Object.assign({}, oldProcArgs);
    });
});
