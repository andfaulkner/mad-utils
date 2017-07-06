/// <reference path="./node_modules/@types/react/index.d.ts" />
/// <reference path="./node_modules/@types/history/index.d.ts" />

/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RealAny } from './src/types-iso';
import { History, Location } from 'history';


/****************************************** REACT TYPES *******************************************/
export type InputChangeEvent = React.FormEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export type InputChangeHandler = React.EventHandler<InputChangeEvent>;
export type FormSubmitHandler = React.EventHandler<FormSubmitEvent>;

export { InputChangeHandler as InputChangeType }
export { FormSubmitHandler as FormSubmitType }

/**
 * Named stateless functional components / JSX elements.
 * Normally Typescript does not allow you to assign them display names, resulting in:
 *     <Unknown></Unknown>
 */
export type NamedSFC<T> = ((args: T) => JSX.Element) & { displayName: string };

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
    match: { isExact: boolean, params: any, path: string, url: string }
}

/**
 * Use on function params expecting an unconstructed React component class.
 * Mainly for creation of higher-order components.
 * @example function wrap(WrappedComponent: Newable<React.Component<any, any>>) { ... }
 *
 * @example Full example including context:
 *     function logBeforeRender(WrappedComponent: Newable<React.Component<any, any>>) {
 *         return class Enhancer extends WrappedComponent {
 *             events = this.events || {}
 *             render() {
 *                 log.info(`Rendering ${WrappedComponent.name} with props: ${this.props}`);
 *                 super.render();
 *             }
 *         }
 *     }
 *
 *     // Then to use it ::
 *     @logBeforeRender
 *     class SomeComponent extends React.Component<any, any> { ...etc... }
 */
interface Newable<T> {
    new (...args: any[]): T;
}

/*********************************** REACT COMPONENT FACTORIES ************************************/
/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
export function buildNamedSfc <T extends any>(
    displayName: string,
    statelessComponent: React.StatelessComponent<T> | React.ComponentClass<T>
): React.StatelessComponent<T> {
    const NamedSfc: NamedSFC<T> = statelessComponent as NamedSFC<T>;
    NamedSfc.displayName = displayName;
    return NamedSfc;
};

export const buildNamedStatelessComponent = buildNamedSfc;
export const setSfcDisplayName = buildNamedSfc;
export const setCmpDisplayName = buildNamedSfc;
export const setDisplayName = buildNamedSfc;


/************************************ REACT UTILITY COMPONENTS ************************************/
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
