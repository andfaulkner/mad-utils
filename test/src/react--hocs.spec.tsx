/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import { expectFunctionExists, expectNonEmptyObjectExists } from '../../src/node/test';

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { buildNamedSfc } from '../../src/react/hocs';

/********************************************* TESTS **********************************************/
describe(`React module`, function() {
    expectFunctionExists(buildNamedSfc, 'buildNamedSfc', '(React utility component)');
});
