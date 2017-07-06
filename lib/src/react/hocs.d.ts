/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
/********************************************* EXPORT *********************************************/
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
export declare const setCmpDisplayName: typeof buildNamedSfc;
export declare const setDisplayName: typeof buildNamedSfc;
