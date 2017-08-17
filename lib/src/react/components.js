"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var React = require("react");
/************************************** THIRD-PARTY MODULES ***************************************/
var hocs_1 = require("./hocs");
/*************************************** BASIC CONDITIONALS ***************************************/
/**
 * Render the child if 'test' is truthy. Can only accept React components.
 * If given a string, wraps it in a span before returning it.
 * @param {any} test - If truthy, render children.
 * @return {JSX.Element|null} If test is truthy, return JSX element child. Otherwise return null.
 */
exports.IfTruthy = function (props) {
    if (!!props.test) {
        if (typeof props.children === 'string')
            return React.createElement("span", null, "props.children");
        return React.Children.only(props.children);
    }
    return null;
};
/**
 * Render the child if 'test' is falsy. Can only accept React components.
 * If given a string, wraps it in a span before returning it.
 * @param {any} test - If falsy, render children.
 * @return {JSX.Element|null} If test is falsy, return JSX element child. Otherwise return null.
 */
exports.IfFalsy = function (props) {
    if (!props.test) {
        if (typeof props.children === 'string')
            return React.createElement("span", null, "props.children");
        return React.Children.only(props.children);
    }
    return null;
};
/***************************** COMPONENT-BASED SWITCH-CASE STRUCTURE ******************************/
/**
 * If no val props of any of the (sibling) <Case> components match the test prop
 * of the current parent (<Switch>), render this component's children.
 * @return {null|JSX.Element} children if no Switch.test & Case.val props match...otherwise null.
 */
exports.DefaultRaw = Object.assign(function (props) { return props.children; }, { __IS_DEFAULT_CONDITION__: true });
exports.Default = hocs_1.setDisplayName('Default_(Conditional)', exports.DefaultRaw);
/**
 * Render as a child of a <Switch test={someValue} /> component.
 * If the content of the val prop matches the test prop of the parent <Switch>, render this
 * component's children, and stop testing the <Switch> component's children for a match.
 * @param {any} val Value to match against the content of the test prop of the parent <Switch>
 * @return {null|JSX.Element} children if Switch.test & val props match...otherwise null.
 */
exports.CaseRaw = Object.assign(function (props) { return props.children; }, { __IS_CASE_CONDITION__: true });
exports.Case = hocs_1.setDisplayName('Case_(Conditional)', exports.CaseRaw);
/**
 * Renders the children of the first matching '<Case test={checkThis}>Content here</Case>' where
 * Case's test prop's value matches the value in Switch's prop.
 * If no <Case> tests succeed, renders the <Default> child if present, or null if it is not.
 *
 * <Switch test={selectedColour}>
 *     <Case val={'#ff0000'}>
 *         <div>The selected colour is red!</div>
 *     </Case>
 *     <Case val={'#0000ff'}>
 *         <div>The selected colour is blue!</div>
 *     </Case>
 *     <Case val={'#00ff00'}>
 *         <div>The selected colour is green!</div>
 *     </Case>
 *     <Default>
 *         <div>The selected colour is not known, and could not be detected. Code: {selectedColour}</div>
 *     </Default>
 * </Switch>
 *
 * @example <Switch test={'asdfasdf'}>
 *              <Case val={'123'}>First child case! Contains text</Case>
 *              <Case val={'asdf1'}><span>2nd child case! Contains span w/ own children</span></Case>
 *              <Case val={'asdf'}>3rd child case! Contains text</Case>
 *              <Default><span>Default case</span></Default>
 *          </Switch>
 *      // Renders <span>Default case</span>
 * @example <Switch test={'asdf'}>
 *              <Case val={'123'}>First child case! Contains text</Case>
 *              <Case val={'asdf1'}><span>2nd child case! Contains span w/ own children</span></Case>
 *              <Case val={'asdf'}>3rd child case! Contains text</Case>
 *              <Default><span>Default case</span></Default>
 *          </Switch>
 *      // Renders '<span>3rd child case! Contains text</span>'
 *   - why the <span>? React can't just render text without an element around it.
 */
var SwitchRaw = function (_a) {
    var children = _a.children, test = _a.test;
    var switchErrMsg = "<Switch> components only allow <Case> & <Default> components as " +
        "direct children";
    var renderOutput;
    var defaultContent;
    React.Children.forEach(children, function (child, idx) {
        if (renderOutput)
            return;
        if (typeof child === 'string' || typeof child === 'number') {
            throw new TypeError(switchErrMsg);
        }
        if (child.type.__IS_CASE_CONDITION__ === true) {
            if (child.props.val === test) {
                renderOutput = child.props.children;
            }
            return;
        }
        if (child.type.__IS_DEFAULT_CONDITION__ === true) {
            defaultContent = child.props.children;
            return;
        }
        throw new TypeError(switchErrMsg);
    });
    var returnData = renderOutput || defaultContent || null;
    return ((typeof returnData === 'string' || typeof returnData === 'number')
        ? React.createElement("span", null, returnData)
        : returnData);
};
exports.Switch = hocs_1.setDisplayName('Switch_(Conditional)', SwitchRaw);
//# sourceMappingURL=components.js.map