/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RealAny } from '../types-iso';


/******************************************** EXPORTS *********************************************/
/**
 * Render the child if 'test' is truthy. Can only accept React components.
 * If given a string, wraps it in a span before returning it.
 * @param {any} test - If truthy, render children.
 * @return {JSX.Element|null} If test is truthy, return JSX element child. Otherwise return null.
 */
export const IfTruthy = (props: { test: RealAny, children?: any }): React.ReactElement<any> => {
    if (!!props.test) {
        if (typeof props.children === 'string') return <span>props.children</span>;
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
export const IfFalsy = (props: { test: RealAny, children?: any }): React.ReactElement<any> => {
    if (!props.test) {
        if (typeof props.children === 'string') return <span>props.children</span>;
        return React.Children.only(props.children);
    }
    return null;
};