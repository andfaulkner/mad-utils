/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
/******************************************** EXPORTS *********************************************/
/**
 * Render the child if 'test' is truthy. Can only accept React components.
 * If given a string, wraps it in a span before returning it.
 * @param {any} test - If truthy, render children.
 * @return {JSX.Element|null} If test is truthy, return JSX element child. Otherwise return null.
 */
export declare const IfTruthy: (props: {
    test: any;
    children?: any;
}) => React.ReactElement<any>;
/**
 * Render the child if 'test' is falsy. Can only accept React components.
 * If given a string, wraps it in a span before returning it.
 * @param {any} test - If falsy, render children.
 * @return {JSX.Element|null} If test is falsy, return JSX element child. Otherwise return null.
 */
export declare const IfFalsy: (props: {
    test: any;
    children?: any;
}) => React.ReactElement<any>;
/**************************************** TYPE DEFINITIONS ****************************************/
/********************************************* EXPORT *********************************************/
export declare const Default: (props: {
    children?: any;
}) => JSX.Element;
export declare const Case: (props: {
    val: any;
    children?: any;
}) => JSX.Element;
declare const Switch: React.StatelessComponent<{
    children?: any;
    test: any;
}>;
export { Switch };
