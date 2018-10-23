/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import { Newable } from './types-react';
/******************************************** LOGGING *********************************************/
import { Log } from 'mad-logs/lib/shared';
/********************************************* EXPORT *********************************************/
/**
 * Log a React class component's name and props directly before rendering
 *
 * Example: @logOnRender(log) class MyClass { ... }
 *
 * @param {Log} logger MadLogs instance to use for logging the component data
 * @param {string} verbosity verbosity level to log at {Default: 'verbose'}
 */
export declare function logOnRender(logger?: Log & ((...args: any[]) => void) & {
    inspect: (obj: any) => import("../../../../../../../Users/andfaulkner/projects/new_node_modules/mad-utils/src/types-iso").StrOrVoid;
}, verbosity?: 'silly' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'wtf'): <T extends Newable<React.Component<any, any, never>>>(WrappedComponent: T) => T;
