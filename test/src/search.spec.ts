/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/******************************** IMPORT SEARCH MODULE FOR TESTING ********************************/
import { expect } from 'chai';

import { m_, search } from '../../shared';

const err = m_.search;


/********************************************* TESTS **********************************************/
describe(`search sub-module`, function() {
    it(`exists`, function() {
        expect(search).to.exist;
    });
});
