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
 * Function exists if this runs without throwing. Creates a mocha unit test to ensure this. Use
 * given function name in test output. Display extraMsg after the rest of the test description.
 * @param {Function} func - Function to test
 * @param {string} name? - Name of function {OPTIONAL}
 */
export const expectFuncExists = (func: Function, name?: string, extraMsg?: string) => {
    it(`has function ${name ? name : func.name}${extraMsg ? ' ' + extraMsg : ''}`, function() {
        expect(func).to.exist;
        expect(func).to.be.a('function');
    })
};

/**
 * Object exists and is not empty if this runs without throwing.
 *
 * @param {Object} nonEmptyObj - Object to test.
 * @param {string} name? - Name of function {OPTIONAL}
 */
export const expectNonEmptyObjectExists = (nonEmptyObj: any, name: string, extraMsg?: string) => {
    it(`${name} exists and is not empty${extraMsg ? '. ' + extraMsg : ''}`, function() {
        expect(nonEmptyObj).to.exist;
        expect(nonEmptyObj).to.be.an('object');
        expect(nonEmptyObj).to.not.be.null;
        expect(nonEmptyObj).to.not.be.undefined;
        expect(nonEmptyObj).to.not.eql({});
        expect(nonEmptyObj).to.not.eql([]);
    });
};

export { expectFuncExists as expectFunctionExists }
