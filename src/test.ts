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
