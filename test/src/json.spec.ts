/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />

/************************************** THIRD-PARTY IMPORTS ***************************************/
import { expect } from 'chai';

import { json, m_, mUtils, } from '../../index';

const jsObjectNotation = m_.json;


/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('mad-utils.spec.ts', colors.green.bgWhite));


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
    it(`exists`, function() {
        expect(json).to.exist;
    });

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

