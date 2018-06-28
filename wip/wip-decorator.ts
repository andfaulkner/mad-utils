/******************************************** LOGGING *********************************************/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory('wip-decorator.ts', Styles.neverEnough);

// Entry:
//     if args, log:  `ClassName#methodName ran :: args:`, args
//     if !args, log: `ClassName#methodName entered`
//
// Exit:
//     `ClassName#methodName returns:`, retVal
/**
 * @function @decorator logMethod
 * @description Log input & output of method
 */
function logMethodOrProp() {
    return function decorateLogMethod(target, name, descriptor?) {
        // ---------- LOG PROPERTY ----------
        if (!descriptor) {
            // TODO log property
        }

        // ----------- LOG METHOD -----------

        const origMethod = descriptor.value;
        log.info(
            `logMethod ::`,
            `\n  origMethod ::`, origMethod,
            `\n  origMethod.toString():`, origMethod.toString(),
            `\n  target:`, target,
            `\n  name:`, name,
            `\n  descriptor:`, descriptor
        );

        descriptor.value = function returnedWrappedMethodForLogMethod(...args) {
            const fn = `${this.constructor.name}#${name} ::`;

            if (origMethod.toString().match(/\(\)/)) {
                log.info(`${fn} entered`);
            } else {
                log.info(`${fn} args:`, ...args);
            }

            // Original wrapped method call
            const result = origMethod.bind(this)(...args);
            log.info(`${fn} result:`, result);

            return result;
        };

        return descriptor;
    }
}
