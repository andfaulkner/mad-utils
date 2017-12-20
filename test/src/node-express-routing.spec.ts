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
        it(`returns first path in given URL`, function() {
            expect(getFirstUrlPath(`http://example.com/CORRECT_PATH/two/3`)).to.eql('CORRECT_PATH');
        });
    });
});
