/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import {expect} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow, ShallowWrapper} from 'enzyme';

import {expectFunctionExists, expectNonEmptyObjectExists} from '../../src/node/test';

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import {logOnRender} from '../../src/react/hocs';

/********************************************* TESTS **********************************************/
describe(`React module`, function() {
    expectFunctionExists(logOnRender, 'logOnRender', '(React utility component)');
});
