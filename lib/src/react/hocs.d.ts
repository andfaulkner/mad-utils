/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import { Newable } from './types-react';
/******************************************** LOGGING *********************************************/
import { MadLog } from 'mad-logs';
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
/**
 * Log a React class component's name and props directly before rendering.
 * @param {MadLog} logger - MadLogs instance to use for logging the component data.
 * @param {string} verbosity - verbosity level to log at. Defaults to 'verbose'.
 * @example @logOnRender(log) class MyClass { ... }
 */
export declare function logOnRender(logger?: MadLog, verbosity?: 'silly' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'wtf'): (WrappedComponent: Newable<React.Component<any, any>>) => React.StatelessComponent<any>;
