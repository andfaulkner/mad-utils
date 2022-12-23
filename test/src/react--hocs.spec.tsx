/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

// TODO test more than just "logOnRender" from hocs.

/*-------------------------------------- IMPORT TEST UTILS ---------------------------------------*/
import {expectFunctionExists} from '../../src/node/test';

/*-------------------------------- IMPORT HOCS MODULE FOR TESTING --------------------------------*/
import {logOnRender} from '../../src/react/hocs';

/*-------------------------------------------- TESTS ---------------------------------------------*/
describe(`React module`, function() {
    expectFunctionExists(logOnRender, 'logOnRender', '(React utility component)');
});
