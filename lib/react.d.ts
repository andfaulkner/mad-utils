/// <reference path="../node_modules/@types/react/index.d.ts" />
/// <reference path="../node_modules/@types/history/index.d.ts" />
/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import { History, Location } from 'history';
/****************************************** REACT TYPES *******************************************/
export declare type InputChangeEvent = React.FormEvent<HTMLInputElement>;
export declare type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export declare type InputChangeHandler = React.EventHandler<InputChangeEvent>;
export declare type FormSubmitHandler = React.EventHandler<FormSubmitEvent>;
export { InputChangeHandler as InputChangeType };
export { FormSubmitHandler as FormSubmitType };
/**
 * Named stateless functional components / JSX elements.
 * Normally Typescript does not allow you to assign them display names, resulting in:
 *     <Unknown></Unknown>
 */
export declare type NamedSFC<T> = ((args: T) => JSX.Element) & {
    displayName: string;
};
/**
 * Use with stateless functional components passing children through.
 */
export interface ChildrenPassthruProps {
    children?: any;
}
/**
 * Use with components wrapped in React-Router's withRouter decorator.
 */
export interface RouterProps {
    history: History;
    location: Location;
    match: {
        isExact: boolean;
        params: any;
        path: string;
        url: string;
    };
}
/*********************************** REACT COMPONENT FACTORIES ************************************/
/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
export declare function buildNamedSfc<T extends any>(displayName: string, statelessComponent: React.StatelessComponent<T> | React.ComponentClass<T>): React.StatelessComponent<T>;
export declare const buildNamedStatelessComponent: typeof buildNamedSfc;
export declare const setSfcDisplayName: typeof buildNamedSfc;
/************************************ REACT UTILITY COMPONENTS ************************************/
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
