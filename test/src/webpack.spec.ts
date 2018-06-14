/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/**************************************** IMPORT UTILITIES ****************************************/
import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
import {m_, webpackUtils, webpack} from '../../node';
import {expectFunctionExists} from '../../node';

import {webpack as webpackFromNode} from '../../node';
import * as webpackModule from '../../src/node/webpack';

/********************************************* TESTS **********************************************/
describe(`webpack sub-module`, function() {
    expectNonEmptyObjectExists(webpack, 'webpack (from shared/base export)');
    expectNonEmptyObjectExists(m_.webpack, 'webpack (from m_ top-level namespace)');
    expectNonEmptyObjectExists(webpackModule, 'webpack (import all from webpack.ts file)');
    expectNonEmptyObjectExists(webpackFromNode, 'webpack (from Node export)');

    it(`has alias webpackUtils`, function() {
        expect(webpackUtils).to.exist;
    });
    describe(`function handlebarsPluginFactory`, function() {
        expectFunctionExists(webpack.handlebarsPluginFactory);
    });
});
