"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/**
 * Method decorator factory. Marks method as not being usable in a web environment. Emits a
 * warning if method is called. Automatically adds it into a Reflect.defineMetadata compartment
 * marking web-unfriendly methods on the class, when containing class is instantiated.
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
                ("Javascript/Typescript environment - it is for " + envUsage + " usage only. ") +
                (alternative ? ('Use ' + alternative + ' instead.') : ''));
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.notForWebUse = notForWebUse;
;
//# sourceMappingURL=decorator.js.map