/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, file } from '../../node';

const docObjModel = m_.file;


/********************************************* TESTS **********************************************/
describe(`file sub-module`, function() {
    it(`exists`, function() {
        expect(file).to.exist;
    });
});
