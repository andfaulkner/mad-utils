/// <reference types="react" />
/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import { Newable } from './types-react';
/******************************************** LOGGING *********************************************/
import { MadLog } from 'mad-logs';
/********************************************* EXPORT *********************************************/
/**
 * Log a React class component's name and props directly before rendering.
 * @param {MadLog} logger - MadLogs instance to use for logging the component data.
 * @param {string} verbosity - verbosity level to log at. Defaults to 'verbose'.
 * @example @logOnRender(log) class MyClass { ... }
 */
export declare function logOnRender(logger?: MadLog, verbosity?: 'silly' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'wtf'): <T extends Newable<React.Component<any, any>>>(WrappedComponent: T) => T;
