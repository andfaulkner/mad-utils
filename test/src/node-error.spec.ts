/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/****************************** IMPORT DECORATOR MODULE FOR TESTING *******************************/
import {m_, error, nodeError} from '../../node';
import {error as nodeErrorFromNode} from '../../node';
import nodeErrorModule from '../../src/node/node-error';

/********************************************* TESTS **********************************************/
describe(`error sub-module`, function() {
    expectNonEmptyObjectExists(nodeError, 'nodeError (from shared/base export)');
    expectNonEmptyObjectExists(m_.nodeError, 'm_.nodeError (from m_ top-level namespace)');
    expectNonEmptyObjectExists(m_.nodeErr, 'm_.nodeErr (from m_ top-level namespace)');
    expectNonEmptyObjectExists(nodeErrorModule, 'nodeError (import all from nodeError.ts file)');
    expectNonEmptyObjectExists(nodeErrorFromNode, 'nodeError (from Node export)');
});
