/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

import { expect } from 'chai';
import { expectNonEmptyObjectExists } from '../../src/node/test'

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import { m_, error, nodeError } from '../../node';

import {
    expressRouting,
    getFirstUrlPath
} from '../../node';

import * as nodeExpressRouting from '../../src/node/express-routing';

/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    expectNonEmptyObjectExists(expressRouting, 'nodeError (import all from nodeError.ts file)');
    expectNonEmptyObjectExists(nodeExpressRouting, 'nodeError (from Node export)');

    describe(`getFirstUrlPath`, function() {
        it(`returns first path in given insecure full path URL`, function() {
            expect(getFirstUrlPath(`http://example.com/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns first path in given secure full path URL`, function() {
            expect(getFirstUrlPath(`https://example.com/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns first path in given localhost URL`, function() {
            expect(getFirstUrlPath(`localhost:8080/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns first path in given partial URL (paths only), with preceding '/'`, function() {
            expect(getFirstUrlPath(`/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns first path in given partial URL (paths only), with no preceding '/'`, function() {
            expect(getFirstUrlPath(`CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
        it(`returns first path in given Request object (mock) at originalUrl`, function() {
            expect(getFirstUrlPath({ originalUrl: `http://example.com/CORRECT_PATH/two/3` } as any))
                .to.eql('CORRECT_PATH');
        });
    });
});
