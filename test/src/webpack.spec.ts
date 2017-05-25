/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, webpackUtils, webpack } from '../../node';
import { expectFunctionExists } from '../../node';

const docObjModel = m_.webpackUtils;


/********************************************* TESTS **********************************************/
describe(`webpack sub-module`, function() {
    it(`exists`, function() {
        expect(webpack).to.exist;
    });
    it(`has alias webpackUtils`, function() {
        expect(webpackUtils).to.exist;
    });
    describe(`function handlebarsPluginFactory`, function() {
        expectFunctionExists(webpack.handlebarsPluginFactory);
    });
});
