/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
/******************************************** EXPORTS *********************************************/
export declare type InputChangeEvent = React.FormEvent<HTMLInputElement>;
export declare type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export declare type DivClickEvent = React.MouseEvent<HTMLDivElement>;
export declare type InputChangeHandler = React.EventHandler<InputChangeEvent>;
export declare type FormSubmitHandler = React.EventHandler<FormSubmitEvent>;
export declare type DivClickHandler = React.EventHandler<DivClickEvent>;
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
export interface Newable<T> {
    new (...args: any[]): T;
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
    action: "POP" | "PUSH" | "REPLACE";
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
    history: RRHistory;
    location: RRLocation;
    match: RRMatch;
}
