/******************************************** IMPORTS *********************************************/
import * as React from 'react';

import {Newable} from './types-react';

/******************************************** LOGGING *********************************************/
import {logFactory, Styles, Log} from 'mad-logs/lib/shared';
const log = logFactory(`hocs`, Styles.angryBird);

/********************************************* EXPORT *********************************************/
/**
 * Log a React class component's name and props directly before rendering
 *
 * Example: @logOnRender(log) class MyClass { ... }
 *
 * @param {Log} logger MadLogs instance to use for logging the component data
 * @param {string} verbosity verbosity level to log at {Default: 'verbose'}
 */
export function logOnRender(
    logger = log,
    verbosity: 'silly' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'wtf' = 'verbose'
) {
    return function logOnRenderHOC<T extends Newable<React.Component<any, any>>>(
        WrappedComponent: T
    ): T {
        class Enhancer extends WrappedComponent {
            render() {
                const parentName = Object.getPrototypeOf(this.constructor).name;
                logger[verbosity](`Rendering ${parentName} with this.props:`, this.props);
                return super.render();
            }
        }
        Enhancer.displayName = `${(WrappedComponent as any).name}_logger`;
        return Enhancer;
    };
}
