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
import { mUtils, jsonStringifyWFuncs, jsonParseWFuncRehydrate_unsafe } from '../index';

/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors.
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result.
 */
function blockErrorOutput(fn) {
}

const testObj = {
    func1: function() {
        console.log('Hello from func1!');
    },
    a: "one",
    b: "two",
    c: {
        ca: "cee_one",
        cb: "cee_two",
        cfunc1: function() {
            console.log('Hello from cfunc1! I\'m nested in object c.');
        },
        cc: 3,
        lambda1: ()=>console.log('Hello from a lambda arrow function!'),
        cd: "cee_4"
    },
    d: "four",
    e: 5,
    func2: function(name) {
        console.log(`Hello ${name}, this is func2. Say hello to my this value:`, this);
    },
    f: 6
};


/********************************************* TESTS **********************************************/
describe('mUtils', function() {
    let json: string;
    before(function() {
        json = jsonStringifyWFuncs(testObj);
    });
    it('exists', function() {
        expect(mUtils).to.exist;
    });
    describe(`[namespace json] jsonStringifyWFuncs`, function() {
        it(`exists`, function() {
            expect(jsonStringifyWFuncs).to.exist;
            expect(mUtils.json.jsonStringifyWFuncs).to.exist;
        });
        it(`stringifies objects to json strings, preserving functions in string form`, function() {
            expect(json).to.be.a('string');
            expect(json).to.contain('function');
            expect(json).to.contain('console.log');
            expect(json).to.contain('"a"');
            expect(json).to.contain('"b"');
            expect(json).to.contain('"c"');
            expect(json).to.contain('"f"');
        });
    });
    describe(`[namespace json] jsonParseWFuncRehydrate_unsafe`, function() {
        it(`exists`, function() {
            expect(mUtils.json.jsonParseWFuncRehydrate_unsafe).to.exist;
        });
    });

    /**
     * Restore original process.argv.
     */
    after(function() {
        process.argv = Object.assign({}, oldProcArgs);
    });
});
