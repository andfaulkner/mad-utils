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

/************************************** THIRD-PARTY MODULES ***************************************/
import { setDisplayName } from './hocs';
import { InjectionType } from '../types-iso';

/**************************************** TYPE DEFINITIONS ****************************************/

// TODO make this work with regexes.

/********************************************* EXPORT *********************************************/
export const Default = Object.assign(
    (props: { children?: any }) => props.children,
    { __IS_DEFAULT_CONDITION__: true }
) as (props: ({ children?: any })) => JSX.Element | null;


export const Case = Object.assign(
    (props: { children?: any, val: any }) => props.children,
    { __IS_CASE_CONDITION__: true }
) as (props: ({ val: any, children?: any })) => JSX.Element | null;

const switchErrMsg = `<Switch> components only allow <Case> & <Default> components ` +
                     `as direct children`;

/**
 * Renders the children of the first matching '<Case test={checkThis}>Content here</Case>' where
 * Case's test prop's value matches the value in Switch's prop.
 * If no <Case> tests succeed, renders the <Default> child if present, or null if it is not.
 *
 * <Switch test={selectedColour}>
 *     <Case matches={'#ff0000'}>
 *         <div>The selected colour is red!</div>
 *     </Case>
 *     <Case matches={'#0000ff'}>
 *         <div>The selected colour is blue!</div>
 *     </Case>
 *     <Case matches={'#00ff00'}>
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
const SwitchRaw = ({ children, test }: { children?: any, test: any }): JSX.Element | null => {
    let renderOutput;
    let defaultContent;
    React.Children.forEach(children, (child, idx) => {
        if (renderOutput) return;
        if (typeof child === 'string' || typeof child === 'number') {
            throw new TypeError(switchErrMsg);
        }

        if ((child.type as any).__IS_CASE_CONDITION__ === true) {
            if (child.props.val === test) {
                renderOutput = child.props.children;
            }
            return;
        }
        if ((child.type as any).__IS_DEFAULT_CONDITION__ === true) {
            defaultContent = child.props.children;
            return;
        }
        throw new TypeError(switchErrMsg);
    });
    const returnData = renderOutput || defaultContent || null;
    return ((typeof returnData === 'string' || typeof returnData === 'number')
            ? <span>{returnData}</span>
            : returnData);
};

const Switch = setDisplayName('Switch', SwitchRaw);

export { Switch };
