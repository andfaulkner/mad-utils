/// <reference path="./node_modules/@types/react/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type InputChange = React.EventHandler<React.FormEvent<HTMLInputElement>>;
export type FormSubmit = React.EventHandler<React.FormEvent<HTMLFormElement>>;

export { InputChange as InputChangeType }
export { FormSubmit as FormSubmitType }

/****************************************** REACT TYPES *******************************************/
/**
 * Named stateless functional components / JSX elements.
 * Normally Typescript does not allow you to assign them display names, resulting in:
 *     <Unknown></Unknown>
 *
 */
export type NamedSFC<T> = ((args: T) => JSX.Element) & { displayName: string };

/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
export const namedSfcFactory =
    <T extends any>(displayName: string,
                    statelessComponent: React.StatelessComponent<T>): React.StatelessComponent<T> =>
{
    const namedSfcFactory: NamedSFC<T> = statelessComponent as NamedSFC<T>;
    namedSfcFactory.displayName = displayName;
    return namedSfcFactory;
};

export const buildNamedSfc = namedSfcFactory;
export const buildNamedStatelessComponent = namedSfcFactory;
export const namedStatelessComponentFactory = namedSfcFactory;
export const namedSFCFactory = namedSfcFactory;
export const buildNamedSFC = namedSfcFactory;
export const nameSfc = namedSfcFactory;
export const nameSFC = namedSfcFactory;
export const setSFCDisplayName = namedSfcFactory;
export const setSfcDisplayName = namedSfcFactory;
