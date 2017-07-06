"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var React = require("react");
/******************************************** EXPORTS *********************************************/
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
//# sourceMappingURL=components.js.map