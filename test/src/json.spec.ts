/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

/************************************** THIRD-PARTY IMPORTS ***************************************/
import { json, m_, mUtils, } from '../../shared';
import { json as jsonFromNode } from '../../node';
import { json as jsonFromBrowser } from '../../browser';
import * as jsonModule from '../../src/json';

/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('mad-utils::json.spec.ts', colors.green.bgWhite));


/********************************************** MOCK **********************************************/
const testObj = {
    a: 1,
    b: 2,
    c: 'cee',
    d: 'dee',
    fn1: function() {
        return 'Hello all!';
    },
    e: 'e',
    f: 6,
    g: 'seven',
    fn2: function() {
        return `Look at me, I'm the second function!`;
    },
    h: 'Final data item in json',
    fn3: function() {
        console.log('Goodbye everyone!');
    }
};

const testObjJsonStr = JSON.stringify(testObj);

/********************************************* TESTS **********************************************/
describe(`json sub-module`, function() {
    expectNonEmptyObjectExists(json, 'json (from shared/base export)');
    expectNonEmptyObjectExists(m_.json, 'json (from m_ top-level namespace)');
    expectNonEmptyObjectExists(jsonModule, 'json (import all from json.ts file)');
    expectNonEmptyObjectExists(jsonFromNode, 'json (from Node export)');
    expectNonEmptyObjectExists(jsonFromBrowser, 'json (from Browser export)');

    describe(`functions exported`, function() {
        let jsonStrWFuncs: string;
        let jsonParseWFuncRehydrate: Object;
        before(function() {
            jsonStrWFuncs = json.jsonStringifyWFuncs(testObj);
            jsonParseWFuncRehydrate = json.jsonParseWFuncRehydrate_unsafe(testObjJsonStr);
        });
        it('exists', function() {
            expect(mUtils).to.exist;
        });
        describe(`[namespace json] jsonStringifyWFuncs`, function() {
            it(`exists`, function() {
                expect(json.jsonStringifyWFuncs).to.exist;
            });
            it(`stringifies objects to json strings, preserving functions in string form`, function() {
                expect(jsonStrWFuncs).to.be.a('string');
                expect(jsonStrWFuncs).to.contain('function');
                expect(jsonStrWFuncs).to.contain('console.log');
                expect(jsonStrWFuncs).to.contain('"a"');
                expect(jsonStrWFuncs).to.contain('"b"');
                expect(jsonStrWFuncs).to.contain('"c"');
                expect(jsonStrWFuncs).to.contain('"f"');
            });
        });

        describe(`[namespace json] jsonParseWFuncRehydrate_unsafe`, function() {
            it(`exists`, function() {
                expect(mUtils.json.jsonParseWFuncRehydrate_unsafe).to.exist;
            });
            it(`can be instantiated`, function() {
                expect(jsonParseWFuncRehydrate).to.exist;
                expect(jsonParseWFuncRehydrate).to.be.an('object');
            });
        });
    });
});

