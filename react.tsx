/******************************** EXPORT ALL FROM REACT SRC FILES *********************************/
export * from './src/react/types-react';
export * from './src/react/hocs';
export * from './src/react/components';

export interface FuncW2OrMoreArgs {
  (arg1: any, arg2?: any): any | void;
  (arg1: any, ...args: any[]): any | void;
}

/**
 * Log the value of a React Synthetic event's target component/element.
 * @param {string} callerName Name of function/method calling logSyntheticEvent.
 * @param {Function} logFn Function to use to perform the logging. Must accept at least 2 params.
 * @param {SyntheticEvent|any} event Event to log.
 */
export const logSyntheticEventValue = (callerName: string, logFn: FuncW2OrMoreArgs = console.log) => (event): void => {
    logFn(`${callerName} :: event:`, event)

    // Handle cases where event is not an object or function.
    if (typeof event === 'undefined' || event === null || (typeof event !== 'object' && typeof event !== 'function')) {
        return logFn(`${callerName} :: event must be an object w key target. typeof event:`, typeof event);
    }

    logFn(`${callerName} :: event.target:`, event.target)

    // Handle cases where event does not have key 'target'.
    if (!(event.target && (typeof event.target === 'object' || typeof event.target === 'function'))) {
        logFn(`${callerName} :: value not present in event.target`);
    
    // Handle cases where event *does* have key 'target' (happy path!).
    } else {
        logFn(`${callerName} :: event.target['value']:`, event.target['value']);
    }
};
