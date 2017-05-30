import 'reflect-metadata';
/**
 * Method decorator factory. Marks method as not being usable in a web/JS/TS environment. Emits a
 * warning if method is called. Automatically adds it into a Reflect.defineMetadata compartment
 * marking web-unfriendly methods on the class, when containing class is instantiated.
 *
 * Intended use: when transpiling from another OO language, if interfaces are created that
 * the TS environment must satisfy, and these interfaces contain methods that don't make sense
 * in a JS/TS/web environment, then they should be wrapped with this method to prevent anyone
 * from calling them.
 *
 * @param {string} alternative? - Method that should be used instead of the one called.
 * @param {string} envUsage - Environment the method is intended for use in.
 *
 * @return {Function} Actual decorator, for wrapping methods (this is a decorator factory).
 */
export declare function notForWebUse(alternative?: string, envUsage?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/**
 * @alias notForWebUse
 */
export declare const methodNotForWebUse: typeof notForWebUse;
export { DecoratorError, DecoratorErrorProps } from './error';
export { singleton } from './types-iso';
