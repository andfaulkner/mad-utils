"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
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
function notForWebUse(alternative, envUsage) {
    if (envUsage === void 0) { envUsage = 'native mobile client or Java server'; }
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('nonWebMethods', target.name + " :: " + propertyKey, target, '${target.name}_${propertyKey}');
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn("Method " + propertyKey + " on class " + target.constructor.name + " cannot be used in a " +
                ("Javascript/Typescript/web environment - it is for " + envUsage + " usage only. ") +
                (alternative ? ('Use ' + alternative + ' instead.') : ''));
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.notForWebUse = notForWebUse;
exports.methodNotForWebUse = notForWebUse;
;
/*********************************** DECORATOR CREATION HELPERS ***********************************/
// const declarationTypes = [
//     'CLASS',
//     'CLASS_METHOD',
//     'CLASS_ACCESSOR',
//     'OBJECT_LITERAL_METHOD',
//     'OBJECT_LITERAL_ACCESSOR',
// ].reduce((obj, name) => Object.defineProperty(obj, name, {value: Symbol(name)}), {});
// export function getDeclarationType(args) {
//     const [target, name, descriptor] = Array.prototype.slice.call(args);
//     if (args.length === 1 && typeof target === 'function') {
//         return declarationTypes.CLASS;
//     } else if (args.length === 3 && typeof target === `object` && typeof target.constructor === `function`) {
//         const isObjectLiteral = target.constructor.name === `Object`;
//         const isAccessor = descriptor.get || descriptor.set;
//         return declarationTypes[
//             `${isObjectLiteral ? 'OBJECT_LITERAL' : 'CLASS'}_${isAccessor ? 'ACCESSOR' : 'METHOD'}`
//         ];
//     }
//     throw new Error(`Invalid decorator declaration type.`);
// }
/***************************************** BARREL EXPORTS *****************************************/
var error_1 = require("./error");
exports.DecoratorError = error_1.DecoratorError;
var types_iso_1 = require("./types-iso");
exports.singleton = types_iso_1.singleton;
//# sourceMappingURL=decorator.js.map