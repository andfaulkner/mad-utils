/// <reference path="./node_modules/@types/react/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************** IMPORTS *********************************************/
var React = require("react");
/*********************************** REACT COMPONENT FACTORIES ************************************/
/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
exports.buildNamedSfc = function (displayName, statelessComponent) {
    var NamedSfc = statelessComponent;
    NamedSfc.displayName = displayName;
    return NamedSfc;
};
exports.buildNamedStatelessComponent = exports.buildNamedSfc;
exports.setSfcDisplayName = exports.buildNamedSfc;
/************************************ REACT UTILITY COMPONENTS ************************************/
/**
 * Render the child if 'test' is truthy.
 * @param {any} test - If truthy, render children.
 * @return {JSX.Element|null} If test is truthy, return JSX element child. Otherwise return null.
 */
exports.IfTruthy = function (props) {
    return (!!props.test)
        ? React.Children.only(props.children)
        : null;
};
//# sourceMappingURL=react.jsx.map