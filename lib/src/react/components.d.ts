/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
/*************************************** BASIC CONDITIONALS ***************************************/
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
/***************************** COMPONENT-BASED SWITCH-CASE STRUCTURE ******************************/
/**
 * If no val props of any of the (sibling) <Case> components match the test prop
 * of the current parent (<Switch>), render this component's children.
 * @return {null|JSX.Element} children if no Switch.test & Case.val props match...otherwise null.
 */
export declare const DefaultRaw: (props: {
    children?: any;
}) => JSX.Element;
export declare const Default: React.StatelessComponent<{
    children?: any;
}>;
/**
 * Render as a child of a <Switch test={someValue} /> component.
 * If the content of the val prop matches the test prop of the parent <Switch>, render this
 * component's children, and stop testing the <Switch> component's children for a match.
 * @param {any} val Value to match against the content of the test prop of the parent <Switch>
 * @return {null|JSX.Element} children if Switch.test & val props match...otherwise null.
 */
export declare const CaseRaw: (props: {
    val: any;
    children?: any;
}) => JSX.Element;
export declare const Case: React.StatelessComponent<{
    val: any;
    children?: any;
}>;
export declare const Switch: React.StatelessComponent<{
    children?: any;
    test: any;
}>;
