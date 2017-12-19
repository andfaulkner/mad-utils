/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Newable, NamedSFC } from './types-react';

/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers, MadLog } from 'mad-logs';
const log = logFactory()(`hocs`, logMarkers.angryBird);

/********************************************* EXPORT *********************************************/
/**
 * Log a React class component's name and props directly before rendering.
 * @param {MadLog} logger - MadLogs instance to use for logging the component data.
 * @param {string} verbosity - verbosity level to log at. Defaults to 'verbose'.
 * @example @logOnRender(log) class MyClass { ... }
 */
export function logOnRender(
    logger = log,
    verbosity: 'silly' | 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'wtf' = 'verbose'
) {
    return function logOnRenderHOC<T extends Newable<React.Component<any, any>>>(WrappedComponent: T): T {
        class Enhancer extends WrappedComponent {
            state = this.state || {}
            events = this.events || {}
            render(){
                const parentName = Object.getPrototypeOf(this.constructor).name;
                logger[verbosity](`Rendering ${parentName} with this.props:`, this.props);
                return super.render();
            }
        }
        (Enhancer as any).displayName = `${(WrappedComponent as any).name}_logger`;
        return Enhancer;
    }
}
