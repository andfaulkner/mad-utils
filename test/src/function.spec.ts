/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import {expect} from 'chai';
import {expectFunctionExists, expectNonEmptyObjectExists} from '../../node';

/******************************* IMPORT FUNCTION MODULE FOR TESTING *******************************/
import {func as functionFromNode} from '../../node';
import {func as functionFromBrowser} from '../../browser';
import * as functionModule from '../../src/function';
import {
    m_,
    func,
    getFnAsArr,
    switchExpr,
    loopN,
    loop2,
    loop3,
    loop4,
    loop5,
    throttle,
    debounce,
    getArgNames,
    runAll,
} from '../../shared';

/********************************************* TESTS **********************************************/
describe(`function sub-module`, function() {
    expectNonEmptyObjectExists(func, 'function (from shared/base export)');
    expectNonEmptyObjectExists(m_.function, 'function (from m_ top-level namespace)');
    expectNonEmptyObjectExists(functionModule, 'function (import all from function.ts file)');
    expectNonEmptyObjectExists(functionFromNode, 'function (from Node export)');
    expectNonEmptyObjectExists(functionFromBrowser, 'function (from Browser export)');

    it(`exists`, function() {
        expect(func).to.exist;
        expect(m_.function).to.exist;
    });

    describe(`getFnAsArr function`, function() {
        expectFunctionExists(getFnAsArr);
        it(`Displays the source code of a function in an array, with 1 item per line`, function() {
            function exampleFunction() {
                console.log('I am an example');
            }
            const exampleFunctionFnArr = func.getFnAsArr(exampleFunction);
            expect(exampleFunctionFnArr).to.be.length(3);
            expect(exampleFunctionFnArr).to.be.an('array');
            expect(exampleFunctionFnArr[0]).to.match(/function exampleFunction\(\)/);
            expect(exampleFunctionFnArr[1]).to.match(/console\.log\('I am an example'\);/);
            expect(exampleFunctionFnArr[2]).to.match(/\}/);
        });
    });

    describe(`switchExpr function`, function() {
        expectFunctionExists(switchExpr);
        it(`Returns the 2nd arg if the 1st arg is truthy`, function() {
            expect(switchExpr(true, 'val1', 'elseVal')).to.eql('val1');
            expect(switchExpr(true, 'val1', true, 'arg2', true, 'arg3', 'elseVal')).to.eql('val1');
            expect(switchExpr('cond1', 'val1', 'cond2', 'val2', 'cond3', 'val3', 'elseVal')).to.eql(
                'val1'
            );
        });
        it(`Returns the 3rd arg if the 1st arg is falsy and only 3 args were given`, function() {
            expect(switchExpr(false, 'val1', 'elseVal')).to.eql('elseVal');
        });
        it(`Returns the last arg if all other 'condition' args are falsy`, function() {
            expect(switchExpr(false, 'val1', undefined, 'val2', 'elseVal')).to.eql('elseVal');
            expect(switchExpr(0, 'v1', null, 'v2', NaN, 'v3', 'elseVal')).to.eql('elseVal');
            expect(switchExpr('', 'v1', false, 'v2', null, 'v3', 'elseVal')).to.eql('elseVal');
        });
        it(`Allows any odd number of conditions`, function() {
            expect(
                switchExpr(
                    '' + '',
                    'val1',
                    undefined,
                    'val2',
                    0,
                    'val3',
                    null,
                    'val4',
                    NaN,
                    'val5',
                    '',
                    'val6',
                    false,
                    'val7',
                    0 + 0,
                    'val8',
                    'elseVal'
                )
            ).to.eql('elseVal');
            const nan = ('' as any) / 0;
            expect(
                switchExpr(
                    '' + '',
                    'val1',
                    undefined,
                    'val2',
                    0,
                    'val3',
                    null,
                    'val4',
                    NaN,
                    'val5',
                    '',
                    'val6',
                    false,
                    'val7',
                    0 + 0,
                    'val8',
                    0 - 0,
                    'val9',
                    1 - 1,
                    'val10',
                    nan,
                    'val11',
                    0 * 0,
                    'val12',
                    0 / 0,
                    'val13',
                    10099 * 0,
                    'val14',
                    'elseVal'
                )
            ).to.eql('elseVal');
            expect(
                switchExpr(
                    '' + '',
                    'val1',
                    undefined,
                    'val2',
                    0,
                    'val3',
                    null,
                    'val4',
                    NaN,
                    'val5',
                    '',
                    'val6',
                    false,
                    'val7',
                    0 + 0,
                    'val8',
                    0 - 0,
                    'val9',
                    1 - 1,
                    'val10',
                    true,
                    'val11',
                    0 * 0,
                    'val12',
                    0 / 0,
                    'val13',
                    10099 * 0,
                    'val14',
                    'elseVal'
                )
            ).to.eql('val11');
        });
        it(`allows an even number of conditions as long as at least one condition returns truthy`, function() {
            expect(switchExpr(true, 'v1', false, 'v2')).to.eql('v1');
            expect(switchExpr(false, 'v1', true, 'v2', 'c3', 'v3')).to.eql('v2');
            expect(switchExpr(false, 'v1', null, 'v2', 0, 'v3', 'c4', 'v4')).to.eql('v4');
        });
        it(`throws if given an even number of conditions and no conditions are truthy`, function() {
            expect(() => switchExpr(0, 'v1', false, 'v2')).to.throw(Error);
            expect(() => switchExpr(null, 'v1', false, 'v2', '', 'v3')).to.throw(Error);
            expect(() => switchExpr(false, 'v1', null, 'v2', '', 'v3', 0, 'v4')).to.throw(Error);
        });
    });

    describe(`loopN`, function() {
        it(`runs given function requested # of times, & returns array holding all return values.`, function() {
            expect(loopN(2, () => 'return_value')).to.eql(['return_value', 'return_value']);
            let i = 0;
            expect(loopN(3, () => ++i)).to.eql([1, 2, 3]);
            expect(i).to.eql(3);

            let j = 0;
            expect(loopN(15, () => j++)).to.eql([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
            expect(j).to.eql(15);
        });
    });

    describe(`loop2`, function() {
        it(`runs given function twice, & returns array holding both return values.`, function() {
            expect(loop2(() => 'ret_val')).to.eql(['ret_val', 'ret_val']);
            let j = 0;
            expect(loop2(() => j++)).to.eql([0, 1]);
            expect(j).to.eql(2);
        });
    });

    describe(`loop3`, function() {
        it(`runs given function 3X, & returns array holding all 3 return values.`, function() {
            expect(loop3(() => 'ret_val')).to.eql(['ret_val', 'ret_val', 'ret_val']);
            let j = 0;
            expect(loop3(() => j++)).to.eql([0, 1, 2]);
            expect(j).to.eql(3);
        });
    });

    describe(`loop4`, function() {
        it(`runs given function 4X, & returns array holding all 4 return values.`, function() {
            expect(loop4(() => 'ret_val')).to.eql(['ret_val', 'ret_val', 'ret_val', 'ret_val']);
            let j = 0;
            expect(loop4(() => j++)).to.eql([0, 1, 2, 3]);
            expect(j).to.eql(4);
        });
    });

    describe(`loop5`, function() {
        it(`runs given function 5X, & returns array holding all 5 return values.`, function() {
            expect(loop5(() => 'r_val')).to.eql(['r_val', 'r_val', 'r_val', 'r_val', 'r_val']);
            let j = 0;
            expect(loop5(() => j++)).to.eql([0, 1, 2, 3, 4]);
            expect(j).to.eql(5);
        });
    });

    describe(`throttle`, function() {
        it(`runs given function immediately if immediate param = true (default)`, function() {
            let val = false;
            const throttledFn = throttle(() => (val = true), 200);
            throttledFn();
            expect(val).to.be.true;

            let val2 = false;
            const throttledFn2 = throttle(() => (val2 = true), 200, true);
            throttledFn2();
            expect(val2).to.be.true;
        });
        it(`doesn't run given function immediately if immediate param = false`, function() {
            let val = false;
            const throttledFn = throttle(() => (val = true), 200, false);
            throttledFn();
            expect(val).to.be.false;
        });
        it(`doesn't run function 2X if request to run occurs before [wait]ms elapses`, function() {
            let val = 0;
            const throttledFn = throttle(() => val++, 200, true);
            throttledFn();
            throttledFn();
            throttledFn();
            expect(val).to.eql(1);
        });
        it(`runs function again if request to run occurs after [wait]ms elapses`, function() {
            let val = 0;
            const throttledFn = throttle(() => val++, 50, true);
            throttledFn();
            setTimeout(() => throttledFn(), 100);
            throttledFn();
            throttledFn();
            setTimeout(() => expect(val).to.eql(2), 150);
        });
        it(`requires the correct arguments for the created 'throttled' function`, function() {
            let arr = [];
            const throttledFn = throttle((str: string) => arr.push(str), 50, true);
            throttledFn('First');
            setTimeout(() => throttledFn('Second'), 100);
            throttledFn("WON'T BE INCLUDED");
            throttledFn("ALSO WON'T BE INCLUDED");
            setTimeout(() => expect(arr).to.eql(['First', 'Second']), 150);
        });
        it(`transfers data keys from given function to throttled function`, function() {
            const arr = [];
            const fn = Object.assign(() => arr.push(fn.dataVal), {dataVal: 'VALUE'});
            const throttledFn = throttle(fn, 50, true);
            expect((throttledFn as any).dataVal).to.eql('VALUE');
            throttledFn();
            throttledFn();
            setTimeout(() => throttledFn(), 100);
            setTimeout(() => expect(arr).to.eql(['VALUE', 'VALUE']), 150);
        });
    });

    describe(`debounce`, function() {
        it(`runs given function only after [wait] ms have passed, not immediately`, function(done) {
            let val = false;
            const debouncedFn = debounce(() => (val = true), 200);
            debouncedFn();
            expect(val).to.be.false;

            setTimeout(() => {
                expect(val).to.be.true;
                done();
            }, 250);
        });

        it(`runs given function immediately if true given as 3rd arg`, function() {
            let val = false;
            const debouncedFn2 = debounce(() => (val = true), 200, true);
            debouncedFn2();
            expect(val).to.be.true;
        });

        it(`doesn't run given function immediately if immediate param = false`, function(done) {
            let val = false;
            const debouncedFn = debounce(() => (val = true), 200);
            debouncedFn();
            expect(val).to.be.false;

            setTimeout(() => {
                expect(val).to.be.true;
                done();
            }, 250);
        });

        it(`runs function 1X even if multiple requests received to run it before before [wait]ms elapses`, function(done) {
            let val = 0;
            const debouncedFn = debounce(() => val++, 200, true);
            debouncedFn();
            debouncedFn();
            debouncedFn();
            setTimeout(() => {
                expect(val).to.eql(1);
                done();
            }, 250);
        });

        it(`runs function again if request to run occurs after [wait]ms elapses`, function(done) {
            let val = 0;
            const debouncedFn = debounce(() => val++, 50, true);
            debouncedFn();

            setTimeout(() => debouncedFn(), 100);

            debouncedFn();
            debouncedFn();

            setTimeout(() => {
                expect(val).to.eql(2);
                done();
            }, 150);
        });
    });

    describe('getArgNames', function() {
        it(`returns empty list given arrow function with no params`, function() {
            const fn = () => console.log('output');
            expect(getArgNames(fn)).to.eql([]);
        });
        it(`gets list of arguments from given arrow function with params`, function() {
            const fn = (arg1, arg2) => console.log('output');
            expect(getArgNames(fn)).to.eql(['arg1', 'arg2']);
        });
        it(`returns empty list given classic named function with no params`, function() {
            function fn() {
                console.log('output');
            }
            expect(getArgNames(fn)).to.eql([]);
        });
        it(`gets list of arguments from given classic function with params`, function() {
            function fn(arg1, arg2) {
                console.log('output');
            }
            expect(getArgNames(fn)).to.eql(['arg1', 'arg2']);
        });
        it(`returns empty list given classic lambda with no params`, function() {
            const fn = function() {
                console.log('output');
            };
            expect(getArgNames(fn)).to.eql([]);
        });
        it(`gets list of arguments from given classic lambda with params`, function() {
            const fn = function(arg1, arg2) {
                console.log('output');
            };
            expect(getArgNames(fn)).to.eql(['arg1', 'arg2']);
        });
    });

    describe(`runAll`, function() {
        it(`returns empty array given an empty array`, function() {
            expect(runAll([])).to.eql([]);
        });
        it(`returns return val of function in an array, if given array w/ 1 function`, function() {
            expect(runAll([() => 'result'])).to.eql(['result']);
        });
        it(`returns array of return vals from all functions in an array`, function() {
            expect(runAll([() => 'result 1', () => 'result 2', () => 'result 3'])).to.eql([
                'result 1',
                'result 2',
                'result 3',
            ]);
        });
        it(`Passes args past 1st arg to all functions in array (as arguments)`, function() {
            // prettier-ignore
            expect(
                runAll(
                    [
                        (name, age) => `Hello ${age}-year-old ${name}!`,
                        (name, age) => `How are you doing, ${age}-year-old ${name}?`,
                    ],
                    'Meeka', 7
                )
            ).to.eql([
                'Hello 7-year-old Meeka!',
                'How are you doing, 7-year-old Meeka?'
            ]);
        });
    });
});
