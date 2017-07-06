/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
/******************************************** EXPORTS *********************************************/
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
