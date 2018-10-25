/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {RealAny} from '../types-iso';
import {ReactChildren} from './types-react';

/********************************************* CONFIG *********************************************/
const switchErrMsg = `<Switch> components only allow <Case> & <Default> components as direct children`;

/*************************************** BASIC CONDITIONALS ***************************************/
/**
 * Render the child if 'test' is truthy
 * Can only accept React components
 * If given a string, wraps it in a span before returning it
 *
 * @param {any} test If truthy, render children
 * @return {JSX.Element|null} If test is truthy, return JSX element child; otherwise null
 */
export const IfTruthy = (props: {test: RealAny; children?: any}) => {
    // If test prop has falsy val, return given children
    if (!!props.test) {
        if (typeof props.children === `string`) {
            return <span>{props.children}</span>;
        }
        return React.Children.only(props.children) as JSX.Element;
    }

    return null;
};

(IfTruthy as any).displayName = `IfTruthy`;

/**
 * Render the child if `test` is falsy
 * Can only accept React components
 * If given a string, wraps it in a span before returning it
 *
 * @param {any} test If falsy, render children
 * @return {JSX.Element|null} If test is falsy, return JSX element child; otherwise null
 */
export const IfFalsy = (props: {test: RealAny; children?: any}) => {
    // If test prop has falsy val, return given children
    if (!props.test) {
        if (typeof props.children === `string`) {
            return <span>{props.children}</span>;
        }
        return React.Children.only(props.children) as JSX.Element;
    }

    return null;
};

(IfFalsy as any).displayName = `IfFalsy`;

/***************************** COMPONENT-BASED SWITCH-CASE STRUCTURE ******************************/
/**
 * If no val props of any of the (sibling) <Case> components match the test
 * prop of the current parent (<Switch>), render this component's children
 *
 * Example:
 *     <Default>
 *         <span className={cn(`pt-5`, `center`)}>Result</span>
 *     </Default>
 *
 * @return {null|JSX.Element} children if no Switch.test & Case.val props match,
 *                            otherwise null
 */
export const Default = Object.assign(
    (props: {children?: ReactChildren}) => props.children,
    {
        __IS_DEFAULT_CONDITION__: true,
    }
) as (props: {children?: any}) => JSX.Element | null;

(Default as any).displayName = `Default_(Conditional)`;

/**
 * Render as a child of a <Switch test={someValue} /> component
 *
 * If the content of the val prop matches the test prop of the parent <Switch>,
 * render this component's children, and stop testing the <Switch> component's
 * children for a match
 *
 * @param {any} val Value to match vs content of test prop of parent <Switch>
 * @return {null|JSX.Element} children if Switch.test & val props match, otherwise null
 */
export const Case = Object.assign((props: {children?: any; val: any}) => props.children, {
    __IS_CASE_CONDITION__: true,
}) as (props: {val: any; children?: any}) => JSX.Element | null;

(Case as any).displayName = `Case_(Conditional)`;

/**
 * Renders children of 1st matching `<Case test={checkThis}>Content here</Case>`
 * where Case's "test" prop's value matches the value in Switch's "test" prop
 *
 * If no <Case> tests succeed, renders <Default> child if present, or null if not
 *
 * Example:
 *     <Switch test={selectedColour}>
 *         <Case val={`#ff0000`}>
 *             <div>The selected colour is red!</div>
 *         </Case>
 *         <Case val={`#0000ff`}>
 *             <div>The selected colour is blue!</div>
 *         </Case>
 *         <Case val={`#00ff00`}>
 *             <div>The selected colour is green!</div>
 *         </Case>
 *         <Default>
 *             <div>
 *                 Selected colour isn't known & couldn't be detected; colour:
 *                 {selectedColour}
 *             </div>
 *         </Default>
 *     </Switch>
 *
 * Example:
 *     <Switch test={`asdfasdf`}>
 *         <Case val={`123`}>1st child case! Contains text</Case>
 *         <Case val={`asdf`}>2nd child case! Contains text</Case>
 *         <Default><span>Default case</span></Default>
 *     </Switch>
 *     // Renders <span>Default case</span>
 *
 * Example:
 *     <Switch test={`asdf`}>
 *         <Case val={`123`}>1st child case! Contains text</Case>
 *         <Case val={`asdf1`}>
 *             <span>2nd child case! Contains span w/ own children</span>
 *         </Case>
 *         <Case val={`asdf`}>3rd child case! Contains text</Case>
 *         <Default><span>Default case</span></Default>
 *     </Switch>
 *     // Renders `<span>3rd child case! Contains text</span>`
 *     - Why a <span>? React can't just render text without an element around it
 */
export const Switch = ({children, test}: {children?: any; test: any}): JSX.Element | null => {
    let renderOutput;
    let defaultContent;

    React.Children.forEach(children, (child, idx) => {
        // Ensure it finishes on 1st match (keep ret once renderOutput defined)
        if (renderOutput) return;

        // Throw if a string or number is given as a child of Switch
        if (typeof child === `string` || typeof child === `number`) {
            throw new TypeError(switchErrMsg);
        }

        // If the current child is a <Case> component, and 'val' prop equals
        // this component's 'test' prop, render children of <Case>
        if ((child.type as any).__IS_CASE_CONDITION__ === true) {
            if (child.props.val === test) {
                renderOutput = child.props.children;
            }
            return;
        }

        // If the current child is a <Default> component, and no <Case> has
        // been triggered, store children of <Default> as defaultContent, to
        // render if no Cases get triggered
        if ((child.type as any).__IS_DEFAULT_CONDITION__ === true) {
            defaultContent = child.props.children;
            return;
        }

        throw new TypeError(switchErrMsg);
    });

    const returnData = renderOutput || defaultContent || null;

    return typeof returnData === `string` || typeof returnData === `number` ? (
        <span>{returnData}</span>
    ) : (
        returnData
    );
};

(Switch as any).displayName = `Switch_(Conditional)`;

// TODO Create SwitchMatch (?)
