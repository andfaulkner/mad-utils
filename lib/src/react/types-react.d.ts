/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import { MandatoryInjection } from '../types-iso';
/******************************************** EXPORTS *********************************************/
export declare type InputChangeEvent = React.FormEvent<HTMLInputElement>;
export declare type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export declare type DivClickEvent = React.MouseEvent<HTMLDivElement>;
export declare type InputChangeHandler = React.EventHandler<InputChangeEvent>;
export declare type FormSubmitHandler = React.EventHandler<FormSubmitEvent>;
export declare type DivClickHandler = React.EventHandler<DivClickEvent>;
export declare type AnyEventHandler = React.EventHandler<any>;
export { InputChangeHandler as InputChangeType };
export { FormSubmitHandler as FormSubmitType };
export { AnyEventHandler as AnyEventType };
export interface ReactChildString {
    children?: string;
}
export { ReactChildString as ChildString };
/**
 * Type of a children prop in a React SFC (for most cases)
 *
 * Similar to ReactNode, but without type errors in some TS versions, and
 * doesn't accept undefined or number
 *
 * Example:
 *     const MySFC = ({children}: {children: ReactChildren}) => (...)
 */
export declare type ReactChildren<T = any> = JSX.Element | React.ReactElement<T> | React.ReactFragment | React.ReactPortal | string | null;
/**
 * Use with stateless functional components passing children through.
 */
export interface ChildrenPassthruProps {
    children?: any;
}
/**
 * Use on function params expecting an unconstructed React component class
 * Mainly for creation of higher-order components
 *
 * Example:
 *     function wrap(WrappedComponent: Newable<React.Component<any, any>>) {...}
 *
 * Example (Full including context):
 *     function logBeforeRender(WrappedComponent: Newable<React.Component<any, any>>) {
 *         return class Enhancer extends WrappedComponent {
 *             render() {
 *                 log.info(
 *                     `Rendering ${WrappedComponent.name} w props: ${this.props}`
 *                 );
 *                 super.render();
 *             }
 *         }
 *     }
 *
 *     // Then to use it:
 *     @logBeforeRender
 *     class SomeComponent extends React.Component<any, any> { ...etc... }
 */
export interface Newable<T> {
    new (...args: any[]): T;
    displayName?: string;
}
/************************************* ROUTING-RELATED TYPES **************************************/
/**
 * As used in react-router-dom. Delivered to a component in props.location via withRouter.
 */
export interface RRLocation {
    hash: string;
    key: string | null;
    pathname: string;
    search: string;
    state: string | null;
}
/**
 * As used in react-router-dom. Delivered to a component in props.history via withRouter.
 */
export interface RRHistory {
    action: 'POP' | 'PUSH' | 'REPLACE';
    block: () => any;
    createHref: (location: any) => any;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
    length: number;
    listen: (listener: any) => any;
    location: RRLocation;
    push: (path: string) => any;
    replace: (path: string, state: string) => void;
}
export interface RRMatch {
    isExact: boolean;
    params: any;
    path: string;
    url: string;
}
/**
 * Use with components wrapped in React-Router's withRouter decorator.
 */
export interface RouterProps {
    history?: MandatoryInjection<RRHistory>;
    location?: MandatoryInjection<RRLocation>;
    match?: MandatoryInjection<RRMatch>;
}
