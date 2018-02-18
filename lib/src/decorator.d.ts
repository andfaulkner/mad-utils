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
export { notForWebUse as methodNotForWebUse };
/***************************************** DECORATOR TYPE *****************************************/
/**
 * Available decorator types
 */
export declare type DecoratorTargetType = 'CLASS' | 'STATIC_PROPERTY' | 'INSTANCE_PROPERTY' | 'PARAMETER' | 'STATIC_METHOD' | 'INSTANCE_METHOD' | 'ACCESSOR' | 'INVALID';
/**
 * Determine the decorator declaration type based on the arguments it receives.
 *
 *    Less than 1, or more than 3 arguments                                    --> INVALID
 *    1 arg  : arg1 is function                                                --> CLASS
 *    2 args : arg1 is function; arg2 is string or symbol                      --> STATIC_PROPERTY
 *    2 args : arg1.constructor is function, arg2 is string                    --> INSTANCE_PROPERTY
 *    3 args : arg3 is number                                                  --> PARAMETER
 *    3 args : arg1 is function w prototype & constructor; arg3 is descriptor  --> STATIC_METHOD
 *    3 args : arg1.constructor is function; arg3 is descriptor w no get, set  --> INSTANCE_METHOD
 *    3 args : arg1.constructor is function; arg3 is descriptor w get &/or set --> ACCESSOR
 *
 * @example Usage on class:
 *     @someDecorator
 *     class MyClass { ... }
 *     // On MyClass init, emits: "someDecorator declaration type: CLASS"
 *
 * @example Usage on parts of in a class:
 *     class MyClass {
 *         @someDecorator
 *         username: string = '';
 *         // On MyClass init, emits: "someDecorator declaration type: INSTANCE_PROPERTY"
 *
 *         @someDecorator
 *         fetchData() { ... }
 *         // On MyClass init, emits: "someDecorator declaration type: INSTANCE_METHOD"
 *     }
 *
 * @param {any[]} args Arguments initially passed to a function by decorator syntax e.g. @decorator
 *                     The "implicit" arguments given to a decorator by virtue of its placement.
 *
 * @return {string} CLASS, STATIC_PROPERTY, INSTANCE_PROPERTY, PARAMETER, ACCESSOR,
 *                  STATIC_METHOD, INSTANCE_METHOD, or INVALID (based on detected type).
 */
export declare function getDecoratorType(...args: any[]): DecoratorTargetType;
/***************************************** BARREL EXPORTS *****************************************/
export { DecoratorError, DecoratorErrorProps } from './error';
export { singleton } from './types-iso';
