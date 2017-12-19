/******************************************** IMPORTS *********************************************/
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Newable, NamedSFC } from './types-react';

/******************************************** LOGGING *********************************************/
import { logFactory, logMarkers, MadLog } from 'mad-logs';
const log = logFactory()(`hocs`, logMarkers.angryBird);



/********************************************* EXPORT *********************************************/

/**
 * @TODO unit test this namedStatelessComponent
 * Build a named stateless functional component.
 * @param {string} displayName - Name you'd like to give the stateless functional component.
 * @param {React.StatelessComponent} sfc - Stateless functional component to name.
 * @return {React.StatelessComponent} Named stateless functional component.
 */
export function buildNamedSfc <T extends any>(
    displayName: string,
    statelessComponent: React.StatelessComponent<T> | React.ComponentClass<T>
) {
    const NamedSfc: NamedSFC<T> = statelessComponent as NamedSFC<T>;
    NamedSfc.displayName = displayName;
    return NamedSfc;
};

// Aliases for buildNamedSfc
export const buildNamedStatelessComponent = buildNamedSfc;
export const setSfcDisplayName = buildNamedSfc;
export const setCmpDisplayName = buildNamedSfc;
export const setDisplayName = buildNamedSfc;

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
        setDisplayName(`${(WrappedComponent as any).name}_logger`, Enhancer);
        return Enhancer;
    }
}
