/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, shallow, ShallowWrapper } from 'enzyme';

import { expectFunctionExists, expectNonEmptyObjectExists } from '../../src/node/test';

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { IfTruthy, IfFalsy, Switch, Case, Default } from '../../src/react/components';
// RouterProps, InputChangeType, FormSubmitHandler, FormSubmitType, InputChangeHandler, setSfcDisplayName, buildNamedStatelessComponent, ChildrenPassthruProps, NamedSFC

/********************************************* TESTS **********************************************/
describe(`React module`, function() {
    expectFunctionExists(IfTruthy, 'IfTruthy', '(React utility component)');
    expectFunctionExists(IfFalsy, 'IfFalsy', '(React utility component)');

    describe(`IfTruthy, IfFalsy`, function() {
        let trueElement: JSX.Element = <div>true child</div>;
        let falseElement: JSX.Element = <div>false child</div>;

        describe(`IfTruthy`, function() {
            let wrappedTruthyTrue: ShallowWrapper<any, any>;
            let wrappedTruthyFalse: ShallowWrapper<any, any>;

            before(function() {
                wrappedTruthyTrue = shallow(<IfTruthy test={true}>{trueElement}</IfTruthy>);
                wrappedTruthyFalse = shallow(<IfTruthy test={false}>{falseElement}</IfTruthy>);
            });

            it(`Renders children if value given to prop 'test' is truthy`, function() {
                expect(wrappedTruthyTrue.children().length).to.equal(1);
                expect(wrappedTruthyTrue.children().getNode()).to.equal('true child');
            });
            it(`Does not render children if value given to prop 'test' is not truthy`, function() {
                expect(wrappedTruthyFalse.children().length).to.eql(0);
                expect(wrappedTruthyFalse.props().children).to.be.undefined;
            });
        });

        describe(`IfFalsy`, function() {
            let wrappedFalsyTrue: ShallowWrapper<any, any>;
            let wrappedFalsyFalse: ShallowWrapper<any, any>;

            before(function() {
                wrappedFalsyTrue = shallow(<IfFalsy test={true}>{falseElement}</IfFalsy>);
                wrappedFalsyFalse = shallow(<IfFalsy test={false}>{trueElement}</IfFalsy>);
            });
            it(`Renders children if value given to prop 'test' is falsy`, function() {
                expect(wrappedFalsyFalse.children().length).to.equal(1);
                expect(wrappedFalsyFalse.children().getNode()).to.equal('true child');
            });
            it(`Does not render children if value given to prop 'test' is not falsy`, function() {
                expect(wrappedFalsyTrue.children().length).to.eql(0);
                expect(wrappedFalsyTrue.props().children).to.be.undefined;
            });
        });
    });
});
