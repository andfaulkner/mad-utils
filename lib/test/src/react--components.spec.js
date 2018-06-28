"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************* TEST SETUP *******************************************/
var Enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new Adapter() });
/*************************************** IMPORT TEST UTILS ****************************************/
var React = require("react");
var chai_1 = require("chai");
var enzyme_1 = require("enzyme");
var test_1 = require("../../src/node/test");
/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
var components_1 = require("../../src/react/components");
/******************************************** LOGGING *********************************************/
var node_1 = require("mad-logs/lib/node");
var log = node_1.nodeLogFactory(node_1.buildFileTag('react--components.spec.tsx', node_1.colors.black.bgCyan));
/******************************************** HELPERS *********************************************/
/**
 * Gets number of children of the rendered component
 * @example numChildren(shallow(
 *              <div>
 *                  <span>El 1</span>
 *                  <span>El 2</span>
 *              </div>
 *          )); // => 2
 */
var numChildren = function (cmp) { return cmp.children().length; };
/**
 * Gets the child of the rendered component
 * @example getChildNode(shallow(<div>Hello</div>)); // => 'Hello'
 */
var getChildNode = function (cmp) {
    return cmp
        .children()
        .first()
        .text();
};
var TestClass = /** @class */ (function (_super) {
    __extends(TestClass, _super);
    function TestClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestClass.prototype.render = function () {
        return React.createElement("div", null, "ok");
    };
    return TestClass;
}(React.Component));
/********************************************* TESTS **********************************************/
describe("React module", function () {
    test_1.expectFunctionExists(components_1.Switch, 'Switch', '(React utility component)');
    test_1.expectFunctionExists(components_1.Case, 'Case', '(React utility component)');
    test_1.expectFunctionExists(components_1.Default, 'Default', '(React utility component)');
    describe("IfTruthy, IfFalsy", function () {
        var trueElement = React.createElement("div", null, "true child");
        var falseElement = React.createElement("div", null, "false child");
        test_1.expectFunctionExists(components_1.IfTruthy, 'IfTruthy', '(React utility component)');
        test_1.expectFunctionExists(components_1.IfFalsy, 'IfFalsy', '(React utility component)');
        describe("IfTruthy", function () {
            var wrappedTruthyTrue;
            var wrappedTruthyFalse;
            before(function () {
                wrappedTruthyTrue = enzyme_1.shallow(React.createElement(components_1.IfTruthy, { test: true }, trueElement));
                wrappedTruthyFalse = enzyme_1.shallow(React.createElement(components_1.IfTruthy, { test: false }, falseElement));
            });
            it("Renders children if value given to prop 'test' is truthy", function () {
                chai_1.expect(numChildren(wrappedTruthyTrue)).to.equal(1);
                chai_1.expect(getChildNode(wrappedTruthyTrue)).to.equal('true child');
            });
            it("Does not render children if value given to prop 'test' is not truthy", function () {
                chai_1.expect(numChildren(wrappedTruthyFalse)).to.eql(0);
                chai_1.expect(wrappedTruthyFalse.props().children).to.be.undefined;
            });
        });
        describe("IfFalsy", function () {
            var wrappedFalsyTrue;
            var wrappedFalsyFalse;
            before(function () {
                wrappedFalsyTrue = enzyme_1.shallow(React.createElement(components_1.IfFalsy, { test: true }, falseElement));
                wrappedFalsyFalse = enzyme_1.shallow(React.createElement(components_1.IfFalsy, { test: false }, trueElement));
            });
            it("Renders children if value given to prop 'test' is falsy", function () {
                chai_1.expect(numChildren(wrappedFalsyFalse)).to.eql(1);
                chai_1.expect(getChildNode(wrappedFalsyFalse)).to.equal('true child');
            });
            it("Does not render children if value given to prop 'test' is not falsy", function () {
                chai_1.expect(numChildren(wrappedFalsyTrue)).to.eql(0);
                chai_1.expect(wrappedFalsyTrue.props().children).to.be.undefined;
            });
        });
        describe("Switch-Case-Default component structure/collection", function () {
            var switch_caseMatch_noDef;
            var switch_noCaseMatch_def;
            var switch_caseMatch_def_strRet;
            var switch_noCaseMatch_noDef;
            test_1.expectFunctionExists(components_1.Switch, 'Switch', '(React utility component)');
            test_1.expectFunctionExists(components_1.Case, 'Case', '(React utility component)');
            test_1.expectFunctionExists(components_1.Default, 'Default', '(React utility component)');
            before(function () {
                switch_caseMatch_noDef = enzyme_1.shallow(React.createElement(components_1.Switch, { test: true },
                    React.createElement(components_1.Case, { val: false },
                        React.createElement("div", null, "CASE1_should_not_match")),
                    React.createElement(components_1.Case, { val: true },
                        React.createElement("div", null, "CASE2_should_match"))));
                switch_noCaseMatch_def = enzyme_1.shallow(React.createElement(components_1.Switch, { test: 'test_str_w_no_matching_child_case' },
                    React.createElement(components_1.Case, { val: false },
                        React.createElement("div", null, "CASE1_should_not_match")),
                    React.createElement(components_1.Case, { val: false },
                        React.createElement("div", null, "CASE2_should_not_match")),
                    React.createElement(components_1.Default, null,
                        React.createElement("span", null, "DEFAULT_should_match"))));
                switch_caseMatch_def_strRet = enzyme_1.shallow(React.createElement(components_1.Switch, { test: 'MATCHING_CASE' },
                    React.createElement(components_1.Case, { val: '__NOT_A_MATCH__' },
                        React.createElement("div", null, "CASE1_should_not_match")),
                    React.createElement(components_1.Case, { val: 'MATCHING_CASE' }, "CASE2_str_should_match"),
                    React.createElement(components_1.Default, null,
                        React.createElement("span", null, "DEFAULT_should_not_match"))));
            });
            it("Returns the content of a matching <Case>, with <Default> defined", function () {
                chai_1.expect(switch_caseMatch_noDef.is('div')).to.be.true;
                chai_1.expect(getChildNode(switch_caseMatch_noDef)).to.eql('CASE2_should_match');
            });
            it("Returns the content of <Default> if no <Case val={x}> matches", function () {
                chai_1.expect(switch_noCaseMatch_def.is('span')).to.be.true;
                chai_1.expect(getChildNode(switch_noCaseMatch_def)).to.eql('DEFAULT_should_match');
            });
            it("Returns matching <Case> child wrapped in span if child is a plain str", function () {
                chai_1.expect(switch_caseMatch_def_strRet.is('span')).to.be.true;
                chai_1.expect(getChildNode(switch_caseMatch_def_strRet)).to.eql('CASE2_str_should_match');
            });
        });
    });
});
//# sourceMappingURL=react--components.spec.js.map