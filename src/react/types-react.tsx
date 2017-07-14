/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';


/******************************************** EXPORTS *********************************************/
export type InputChangeEvent = React.FormEvent<HTMLInputElement>;
export type FormSubmitEvent  = React.FormEvent<HTMLFormElement>;
export type DivClickEvent    = React.MouseEvent<HTMLDivElement>;

export type InputChangeHandler = React.EventHandler<InputChangeEvent>;
export type FormSubmitHandler  = React.EventHandler<FormSubmitEvent>;
export type DivClickHandler    = React.EventHandler<DivClickEvent>;
export type AnyEventHandler    = React.EventHandler<any>;

export { InputChangeHandler as InputChangeType }
export { FormSubmitHandler  as FormSubmitType  }
export { AnyEventHandler    as AnyEventType    }

/**
 * Should match any type of React component: Class, ClassicClass, or stateless functional component
 */
export type AnyComponent<T> =
    React.StatelessComponent<T> | React.ComponentClass<T> | React.ClassicComponentClass<T>;

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
    hash: string,
    key: string | null,
    pathname: string,
    search: string,
    state: string | null,
}

/**
 * As used in react-router-dom. Delivered to a component in props.history via withRouter.
 */
export interface RRHistory {
    action: "POP" | "PUSH" | "REPLACE"
    block: () => any
    createHref: (location: any) => any
    go: (n: number) => void
    goBack: () => void
    goForward: () => void
    length: number
    listen: (listener: any) => any
    location: RRLocation
    push: (path: string) => any
    replace: (path: string, state: string) => void
}

export interface RRMatch {
    isExact: boolean
    params: any
    path: string
    url: string
}

/**
 * Use with components wrapped in React-Router's withRouter decorator.
 */
export interface RouterProps {
    history: RRHistory
    location: RRLocation
    match: RRMatch
}
