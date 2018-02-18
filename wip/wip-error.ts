// TODO Test runInTryCatch, ensure it works
/**
 * Run given function with a try-catch wrapped around it, a default error handler, and
 * option whether or not to rethrow.
 */
export function runInTryCatch<T = any>(
    func: Function,
    rethrow = true,
    onError?: (error: Error) => any,
): T | Error {
    const fn = (func as (Function & {name: string})).name || '';

    try {
        return func.apply(this, arguments);

    } catch (error) {
        console.error(`[mad-utils->tryCatch] function ${fn || '(anonymous)'} threw error:`, error);
        if (onError) onError(error);
        if (rethrow) throw error;
        return error;
    }
}
