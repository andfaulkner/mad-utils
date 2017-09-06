/******************************** EXPORT ALL FROM REACT SRC FILES *********************************/
export * from './src/react/types-react';
export * from './src/react/hocs';
export * from './src/react/components';
/**
 * Log the value of a React Synthetic event's target component/element.
 * @param {string} callerName Name of function/method calling logSyntheticEvent.
 * @param {Function} logFn Function to use to perform the logging. Must accept at least 2 params.
 * @param {SyntheticEvent|any} event Event to log.
 */
export declare const logSyntheticEventValue: (callerName: string, logFn?: (arg1: any, ...args: any[]) => any) => (event: any) => void;
/********************************* EXPORT ALL FROM BROWSER UTILS **********************************/
export * from './browser';
