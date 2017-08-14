/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import { expectFunctionExists, expectNonEmptyObjectExists } from '../../src/node/test';

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { IfTruthy, IfFalsy, buildNamedSfc, RouterProps, InputChangeType,
         FormSubmitHandler, FormSubmitType, InputChangeHandler, setSfcDisplayName,
         buildNamedStatelessComponent, ChildrenPassthruProps, NamedSFC } from '../../react';

/********************************************* TESTS **********************************************/
describe(`React module`, function() {
    expectFunctionExists(IfTruthy, 'IfTruthy', '(React utility component)');
    expectFunctionExists(IfFalsy, 'IfFalsy', '(React utility component)');
    expectFunctionExists(buildNamedSfc, 'buildNamedSfc', '(React utility component)');

    describe(`IfTruthy`, function() {
        let wrappedTruthy: ShallowWrapper<any, any>;
        before(function() {
            wrappedTruthy = shallow(<IfTruthy test={true}><div>Child</div></IfTruthy>);
        });
        it(`Renders children if value given to prop 'test' is truthy`, function() {
            console.log('----- wrappedTruthy:::::', wrappedTruthy);
            console.log('wrappedTruthy props:', wrappedTruthy.props);
            // TODO this is not a working test - just an experiment to try out Enzyme with the
            //      new React component utilities. Set this up to actually work.
            expect(true).to.equal(true);
        });
    });

    describe(`IfFalsy`, function() {
        let wrappedFalsy: ShallowWrapper<any, any>;
        before(function() {
            wrappedFalsy = shallow(<IfFalsy test={false}><div>Child</div></IfFalsy>);
        });
        it(`Renders children if value given to prop 'test' is truthy`, function() {
            console.log('----- wrappedFalsy:::::', wrappedFalsy);
            console.log('wrappedFalsy props:', wrappedFalsy.props);
            // TODO this is not a working test - just an experiment to try out Enzyme with the
            //      new React component utilities. Set this up to actually work.
            expect(true).to.equal(true);
        });
    });
});
