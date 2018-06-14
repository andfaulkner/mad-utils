/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/****************************** IMPORT MIDDLEWARE MODULE FOR TESTING ******************************/
import {expect} from 'chai';

import {m_, middleware} from '../../node';
import {middleware as middlewareFromNode} from '../../node';
import * as middlewareModule from '../../src/node/middleware';

import {expectNonEmptyObjectExists} from '../../src/node/test';
const mw = m_.middleware;

/********************************************* TESTS **********************************************/
describe(`middleware sub-module`, function() {
    expectNonEmptyObjectExists(middleware, 'middleware (from shared/base export)');
    expectNonEmptyObjectExists(m_.middleware, 'middleware (from m_ top-level namespace)');
    expectNonEmptyObjectExists(middlewareModule, 'middleware (import all from middleware.ts file)');
    expectNonEmptyObjectExists(middlewareFromNode, 'middleware (from node export)');
});
