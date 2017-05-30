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
export function notForWebUse(alternative?: string, envUsage = 'native mobile client or Java server') {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('nonWebMethods', `${target.name} :: ${propertyKey}`, target,
                               '${target.name}_${propertyKey}');

        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.warn(
                `Method ${propertyKey} on class ${target.constructor.name} cannot be used in a ` +
                `Javascript/Typescript/web environment - it is for ${envUsage} usage only. ` +
                (alternative ? ('Use ' + alternative + ' instead.') : '')
            );
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }
};

/**
 * @alias notForWebUse
 */
export const methodNotForWebUse = notForWebUse;

export { DecoratorError, DecoratorErrorProps } from './error';
export { singleton } from './types-iso';
