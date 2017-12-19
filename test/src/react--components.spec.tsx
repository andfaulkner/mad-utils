/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

// setup file
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
console.log(`Adapter:`, Adapter);

(Enzyme as any).configure({ adapter: new Adapter() });


/*************************************** IMPORT TEST UTILS ****************************************/
import { expect } from 'chai';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { mount, shallow, ShallowWrapper, ReactWrapper} from 'enzyme';

import { expectFunctionExists, expectNonEmptyObjectExists } from '../../src/node/test';

/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
import { IfTruthy, IfFalsy, Switch, Case, Default } from '../../src/react/components';
// RouterProps, InputChangeType, FormSubmitHandler, FormSubmitType, InputChangeHandler, setSfcDisplayName, buildNamedStatelessComponent, ChildrenPassthruProps, NamedSFC

/******************************************** LOGGING *********************************************/
import { buildFileTag, nodeLogFactory, colors } from 'mad-logs/lib/node';
const log = nodeLogFactory(buildFileTag('react--components.spec.tsx', colors.black.bgCyan));

/******************************************** HELPERS *********************************************/
/**
 * Gets number of children of the rendered component.
 * @example numChildren(shallow(
 *              <div>
 *                  <span>El 1</span>
 *                  <span>El 2</span>
 *              </div>
 *          )); // => 2
 */
const numChildren = (cmp: ShallowWrapper<any, any>) => cmp.children().length;

/**
 * Gets the child of the rendered component.
 * @example getChildNode(shallow(<div>Hello</div>)); // => 'Hello'
 */
const getChildNode = (cmp: ShallowWrapper<any, any>) => cmp.children().first().text();

class TestClass extends React.Component<{}, {}> {
    render() {
        return (
            <div>ok</div>
        );
    }
}

/********************************************* TESTS **********************************************/
describe(`React module`, function() {
    expectFunctionExists(Switch, 'Switch', '(React utility component)');
    expectFunctionExists(Case, 'Case', '(React utility component)');
    expectFunctionExists(Default, 'Default', '(React utility component)');

    describe(`IfTruthy, IfFalsy`, function() {
        let trueElement: JSX.Element = <div>true child</div>;
        let falseElement: JSX.Element = <div>false child</div>;

        expectFunctionExists(IfTruthy, 'IfTruthy', '(React utility component)');
        expectFunctionExists(IfFalsy, 'IfFalsy', '(React utility component)');

        describe(`IfTruthy`, function() {
            let wrappedTruthyTrue: ShallowWrapper<any, any>;
            let wrappedTruthyFalse: ShallowWrapper<any, any>;

            before(function() {
                wrappedTruthyTrue = shallow(
                    <IfTruthy test={true}>
                        {trueElement}
                    </IfTruthy>
                );
                wrappedTruthyFalse = shallow(
                    <IfTruthy test={false}>
                        {falseElement}
                    </IfTruthy>
                );
            });

            it(`Renders children if value given to prop 'test' is truthy`, function() {
                expect(numChildren(wrappedTruthyTrue)).to.equal(1);
                expect(getChildNode(wrappedTruthyTrue)).to.equal('true child');
            });
            it(`Does not render children if value given to prop 'test' is not truthy`, function() {
                expect(numChildren(wrappedTruthyFalse)).to.eql(0);
                expect(wrappedTruthyFalse.props().children).to.be.undefined;
            });
        });

        describe(`IfFalsy`, function() {
            let wrappedFalsyTrue: ShallowWrapper<any, any>;
            let wrappedFalsyFalse: ShallowWrapper<any, any>;

            before(function() {
                wrappedFalsyTrue = shallow(
                    <IfFalsy test={true}>
                        {falseElement}
                    </IfFalsy>
                );
                wrappedFalsyFalse = shallow(
                    <IfFalsy test={false}>
                        {trueElement}
                    </IfFalsy>
                );
            });
            it(`Renders children if value given to prop 'test' is falsy`, function() {
                expect(numChildren(wrappedFalsyFalse)).to.eql(1);
                expect(getChildNode(wrappedFalsyFalse)).to.equal('true child');
            });
            it(`Does not render children if value given to prop 'test' is not falsy`, function() {
                expect(numChildren(wrappedFalsyTrue)).to.eql(0);
                expect(wrappedFalsyTrue.props().children).to.be.undefined;
            });
        });

        describe(`Switch-Case-Default component structure/collection`, function() {
            let switch_caseMatch_noDef: ShallowWrapper<any, any>;
            let switch_noCaseMatch_def: ShallowWrapper<any, any>;
            let switch_caseMatch_def_strRet: ShallowWrapper<any, any>;
            let switch_noCaseMatch_noDef: ShallowWrapper<any, any>;

            expectFunctionExists(Switch, 'Switch', '(React utility component)');
            expectFunctionExists(Case, 'Case', '(React utility component)');
            expectFunctionExists(Default, 'Default', '(React utility component)');

            before(function() {
                switch_caseMatch_noDef = shallow(
                    <Switch test={true}>
                        <Case val={false}><div>CASE1_should_not_match</div></Case>
                        <Case val={true}><div>CASE2_should_match</div></Case>
                    </Switch>);

                switch_noCaseMatch_def = shallow(
                    <Switch test={'test_str_w_no_matching_child_case'}>
                        <Case val={false}><div>CASE1_should_not_match</div></Case>
                        <Case val={false}><div>CASE2_should_not_match</div></Case>
                        <Default><span>DEFAULT_should_match</span></Default>
                    </Switch>);

                switch_caseMatch_def_strRet = shallow(
                    <Switch test={'MATCHING_CASE'}>
                        <Case val={'__NOT_A_MATCH__'}><div>CASE1_should_not_match</div></Case>
                        <Case val={'MATCHING_CASE'}>CASE2_str_should_match</Case>
                        <Default><span>DEFAULT_should_not_match</span></Default>
                    </Switch>);
            });

            it(`Returns the content of a matching <Case>, with <Default> defined`, function() {
                expect(switch_caseMatch_noDef.is('div')).to.be.true;
                expect(getChildNode(switch_caseMatch_noDef)).to.eql('CASE2_should_match');
            });

            it(`Returns the content of <Default> if no <Case val={x}> matches`, function() {
                expect(switch_noCaseMatch_def.is('span')).to.be.true;
                expect(getChildNode(switch_noCaseMatch_def)).to.eql('DEFAULT_should_match');
            });

            it(`Returns matching <Case> child wrapped in span if child is a plain str`, function() {
                expect(switch_caseMatch_def_strRet.is('span')).to.be.true;
                expect(getChildNode(switch_caseMatch_def_strRet)).to.eql('CASE2_str_should_match');
            });

        });
    });
});
