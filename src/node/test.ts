import { expect } from 'chai';

/********************************** TEST (MOCHA, CHAI) UTILITIES **********************************/
/**
 * Expect that testValue is an empty object.
 * @param {any} testValue - variable to check for emptiness.
 */
export const expectEmptyObject = (testValue: any) => {
    expect(Object.keys(testValue)).to.be.empty;
    console.log('typeof testValue:', typeof testValue);
    expect(testValue).to.be.an('object');
    expect(testValue).to.not.be.null;
    expect(testValue).to.not.be.undefined;
};

/**
 * Function exists if this runs without throwing.
 * @param {Function} func - Function to test
 * @param {string} name? - Name of function {OPTIONAL}
 */
export const expectFuncExists = (func: Function, name?: string, extraMsg?: string) => {
    it(`has function ${name ? name : func.name}${extraMsg ? ' ' + extraMsg : ''}`, function() {
        expect(func).to.exist;
        expect(func).to.be.a('function');
    })
};

export { expectFuncExists as expectFunctionExists }
