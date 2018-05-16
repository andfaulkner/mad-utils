/************************************ THROTTLE WITH ARGUMENTS *************************************/
//
// REPLACED WITH THROTTLE WITHOUT ARGUMENTS
//
/**
 * @param {Function} cb Call max 1X/[wait]ms & call at interval start if [immediate]=true {default}
 * @param {number} wait Time to wait before next call of function allowed
 * @param {boolean} immediate If true, call at the beginning of the interval {default=true}
 */
function throttle(cb: (() => any), wait: number, immediate?: boolean): (() => void);
function throttle<A = any>(
    cb: ((a: A) => any),
    wait: number,
    immediate?: boolean
): ((a: A) => void);
function throttle<A = any, B = any>(
    cb: (a: A, b: B) => any,
    wait: number,
    immediate?: boolean
): (a: A, b: B) => void;
function throttle<A = any, B = any, C = any>(
    cb: (a: A, b: B, c: C) => any,
    wait: number,
    immediate?: boolean
): (a: A, b: B, c: C) => void;
function throttle<A = any, B = any, C = any, D = any>(
    cb: (a: A, b: B, c: C, d: D) => any,
    wait: number,
    immediate?: boolean
): (a: A, b: B, c: C, d: D) => void;
function throttle<A = any, B = any, C = any, D = any, E = any>(
    cb: (a: A, b: B, c: C, d: D, e: E) => any,
    wait: number,
    immediate?: boolean
): (a: A, b: B, c: C, d: D, e: E) => void;
function throttle<A = any, B = any, C = any, D = any, E = any, F = any, G = any, RType = any>(
    cb: ((a?: A, b?: B, c?: C, d?: D, e?: E, f?: F, g?: G, ...rest: RType[]) => any),
    wait: number,
    immediate?: boolean
): ((a?: A, b?: B, c?: C, d?: D, e?: E, f?: F, g?: G, ...rest: RType[]) => void);

function throttle<A = any>(
    cb: ((...args: any[]) => any),
    wait: number,
    immediate: boolean = true
): ((...args: any[]) => void) {
    let blocked = false;
    let cbArgs = null;

    return (...args) => {
        if (!blocked) {
            cbArgs = args;
            blocked = true;
            setTimeout(() => {
                blocked = false;
                if (!immediate) return cb(...cbArgs);
            }, wait);
            if (immediate) cb(...cbArgs);
        }
    };
}
