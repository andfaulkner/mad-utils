/// <reference path="./node_modules/@types/react/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
exports.namedSfcFactory = function (displayName, statelessComponent) {
    var namedSfcFactory = statelessComponent;
    namedSfcFactory.displayName = displayName;
    return namedSfcFactory;
};
exports.buildNamedSfc = exports.namedSfcFactory;
exports.buildNamedStatelessComponent = exports.namedSfcFactory;
exports.namedStatelessComponentFactory = exports.namedSfcFactory;
exports.namedSFCFactory = exports.namedSfcFactory;
exports.buildNamedSFC = exports.namedSfcFactory;
exports.nameSfc = exports.namedSfcFactory;
exports.nameSFC = exports.namedSfcFactory;
exports.setSFCDisplayName = exports.namedSfcFactory;
exports.setSfcDisplayName = exports.namedSfcFactory;
/**
 * Render the child if 'test' is truthy.
 * @param {any} test - If truthy, render children.
 */
exports.IfTrue = function (props) {
    if (!!props.test)
        return React.Children.only(props.children);
    return null;
};
//# sourceMappingURL=react.js.map