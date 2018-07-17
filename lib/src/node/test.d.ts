/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object
 * @param {any} testValue Value to check for emptiness
 */
export declare const expectEmptyObject: (testValue: any) => void;
/**
 * Create mocha unit test to ensure this function exists (success if this runs without throw)
 * Use given function name in test output
 * Display extraMsg after the rest of the test description
 *
 * @param {Function} func Function to test
 * @param {string} name? Name of function {OPTIONAL}
 */
export declare const expectFuncExists: (func: Function, name?: string, extraMsg?: string) => void;
/**
 * Object exists and is not empty if this runs without throwing
 *
 * @param {Object} nonEmptyObj Object to test
 * @param {string} name? Name of function {OPTIONAL}
 */
export declare const expectNonEmptyObjectExists: (nonEmptyObj: any, name: string, extraMsg?: string) => void;
export { expectFuncExists as expectFunctionExists };
