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
export function notForWebUse(
    alternative?: string,
    envUsage = 'native mobile client or Java server',
) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata(
            'nonWebMethods',
            `${target.name} :: ${propertyKey}`,
            target,
            '${target.name}_${propertyKey}',
        );

        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            console.warn(
                `Method ${propertyKey} on class ${target.constructor.name} cannot be used in a ` +
                    `Javascript/Typescript/web environment - it is for ${envUsage} usage only. ` +
                    (alternative ? 'Use ' + alternative + ' instead.' : ''),
            );
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}

export {notForWebUse as methodNotForWebUse};

/**
 *  Perform actual decoration action, regardless of whether config was given or not
 */

function testDec(name) {
    return function testDecorator(...args): void {
        const isConstructor = !!(args[0] && args[0].constructor);
        const isProto = !!(args[0] && args[0].prototype);
        log.info(
            `testDec ~~[[${name}]]~~> declaration type :: ${getDeclarationType(...args)}`,
            `\n  args:`,
            args,
            `\n  target:`,
            args[0],
            `\n  target.constructor:`,
            args[0] && args[0].constructor,
            `\n  target.prototype:`,
            args[0] && args[0].prototype,
            `\n  target[key]:`,
            args[0] && args[0][args[1]],
            `\n  target.prototype[key]:`,
            isProto && args[0].prototype[args[1]],
            `\n  target.constructor[key]:`,
            isConstructor && args[0].constructor[args[1]],
        );
    };
}

export type DecoratorTargetType =
    | 'CLASS'
    | 'STATIC_PROPERTY'
    | 'INSTANCE_PROPERTY'
    | 'PARAMETER'
    | 'STATIC_METHOD'
    | 'INSTANCE_METHOD'
    | 'ACCESSOR'
    | 'INVALID';

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
 * @example
 *     @SomeDecorator
 *     class MyClass { ... }
 *
 *     function SomeDecorator(...args) {
 *         console.log(`SomeDecorator declaration type:`, getDeclarationType(...args));
 *     }
 *
 *     // --> "SomeDecorator declaration type: CLASS"
 *
 * @param {any[]} args Arguments initially passed to a function by decorator syntax e.g. @decorator
 *                     The "implicit" arguments given to a decorator by virtue of its placement.
 *
 * @return {string} CLASS, STATIC_PROPERTY, INSTANCE_PROPERTY, PARAMETER, ACCESSOR,
 *                  STATIC_METHOD, INSTANCE_METHOD, or INVALID (based on detected type).
 */
export function getDecoratorType(...args): DecoratorTargetType {
    const [target, key, descriptor] = args;

    const isTargetFunction = typeof target === 'function';
    const isTargetObject = typeof target === 'object';
    const isTargetConstructorFunction = typeof target.constructor === 'function';
    const targetHasPrototype = typeof target.prototype === 'object';
    const isKeyStringOrSymbol = typeof key === 'string' || typeof key === 'symbol';

    switch (args.filter(arg => typeof arg !== 'undefined' && arg !== null).length) {
        case 1:
            if (isTargetFunction) return 'CLASS';
            return 'INVALID';

        case 2:
            if (isTargetFunction && isKeyStringOrSymbol) return 'STATIC_PROPERTY';
            if (isTargetConstructorFunction && typeof key === 'string') return 'INSTANCE_PROPERTY';
            return 'INVALID';

        case 3:
            if (typeof descriptor === 'number') return 'PARAMETER';

            if (isTargetFunction && targetHasPrototype && isTargetConstructorFunction) {
                return 'STATIC_METHOD';
            }

            if (isTargetObject && isTargetConstructorFunction && typeof key === 'string') {
                return descriptor.get || descriptor.set ? 'ACCESSOR' : 'INSTANCE_METHOD';
            }
            return 'INVALID';

        default:
            return 'INVALID';
    }
}

/***************************************** BARREL EXPORTS *****************************************/
export {DecoratorError, DecoratorErrorProps} from './error';
export {singleton} from './types-iso';
