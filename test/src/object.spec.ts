/// <reference path="../../node_modules/@types/node/index.d.ts" />
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />

import {expect} from 'chai';
import {expectNonEmptyObjectExists} from '../../src/node/test';

/******************************** IMPORT OBJECT MODULE FOR TESTING ********************************/
import {
    m_,
    object,
    assignFrozenClone,
    defineImmutableProp,
    defineMutableProp,
    defineDeletableProp,
    defineProp,
    defineGetterProp,
    defineMethod,
    numKeys,
    hasKey,
    inspectKeyTree,
    eachPair,
    isMultilangTextObj,
    get,
    omit,
    sortObject,
} from '../../shared';

import {expectFunctionExists} from '../../node';

import {object as objectFromNode} from '../../node';
import {object as objectFromBrowser} from '../../browser';
import * as objectModule from '../../src/object';

/********************************************* TESTS **********************************************/
describe(`object sub-module`, function() {
    expectNonEmptyObjectExists(object, 'object (from shared/base export)');
    expectNonEmptyObjectExists(m_.object, 'object (from m_ top-level namespace)');
    expectNonEmptyObjectExists(objectModule, 'object (import all from object.ts file)');
    expectNonEmptyObjectExists(objectFromNode, 'object (from Node export)');
    expectNonEmptyObjectExists(objectFromBrowser, 'object (from Browser export)');

    describe(`.assignFrozenClone -- merge objs into new obj & deepfreeze the result`, function() {
        const obj1 = {a: 1, b: 2};
        const obj2 = {c: 3, d: 4};
        const frozenClonedObj = assignFrozenClone<typeof obj1 & typeof obj2>(obj1, obj2);

        expectFunctionExists(assignFrozenClone);
        expectFunctionExists(m_.object.assignFrozenClone);

        it(`--merges objects`, function() {
            expect(frozenClonedObj).to.have.keys('a', 'b', 'c', 'd');
            expect(frozenClonedObj.a).to.eql(1);
            expect(frozenClonedObj.b).to.eql(2);
            expect(frozenClonedObj.c).to.eql(3);
            expect(frozenClonedObj.d).to.eql(4);
        });
        it(`--does not mutate original objects`, function() {
            expect(obj1).to.not.have.keys('c', 'd');
            expect(obj2).to.not.have.keys('a', 'b');
        });
        it(`--freezes the resultant merged object`, function() {
            expect(() => {
                (frozenClonedObj as any).e = 'gr';
            }).to.throw(TypeError);
            expect((frozenClonedObj as any).e).to.not.exist;
        });
    });

    describe('numKeys', function() {
        expectFunctionExists(numKeys);
        expectFunctionExists(m_.object.numKeys);

        it('returns number of keys in an object', function() {
            expect(numKeys({})).to.eql(0);
            expect(numKeys({a: 'one'})).to.eql(1);
            expect(numKeys({a: 'one', b: 'two', c: 'three'})).to.eql(3);
        });

        it(
            'returns 0 if given non-object or array or function w/ no keys ' + 'directly assigned',
            function() {
                expect(numKeys(null)).to.eql(0);
                expect(numKeys(undefined)).to.eql(0);
                expect(numKeys(10)).to.eql(0);
                expect(numKeys('ok')).to.eql(0);
                expect(numKeys([])).to.eql(0);
                expect(numKeys(false)).to.eql(0);
                expect(numKeys(true)).to.eql(0);
            }
        );
    });

    describe(`inspectKeyTree`, function() {
        it(`returns array (and can run without crashing)`, function() {
            expect(inspectKeyTree({})).to.exist;
            expect(inspectKeyTree({})).to.be.an('array');
        });
    });

    describe('eachPair', function() {
        expectFunctionExists(eachPair);
        expectFunctionExists(m_.object.eachPair);
        it(
            `runs given function taking args (val, key) on each key-value pair in an ` + `object`,
            function() {
                let count = 0;
                const testObj = {a: 'eh', b: 'bee', c: 'cee', d: 'dee'};
                eachPair<any>((val, key) => count++)(testObj);
                expect(count).to.eql(4);

                const testObj2 = {a: 1, b: 2, c: 3, d: 4};
                let total = 0;
                eachPair<any>((val, key) => {
                    total = total + val;
                })(testObj2);
                expect(total).to.eql(10);
            }
        );
    });

    describe('isMultilangTextObj', function() {
        expectFunctionExists(isMultilangTextObj);
        expectFunctionExists(m_.object.isMultilangTextObj);
        it(
            `should return true if given an object with key en or english (upper or lower case), ` +
                `containing a string`,
            function() {
                expect(isMultilangTextObj({en: 'hello'})).to.be.true;
                expect(isMultilangTextObj({En: 'hello'})).to.be.true;
                expect(isMultilangTextObj({English: 'hello'})).to.be.true;
                expect(isMultilangTextObj({EngliSh: 'hello'})).to.be.true;
                expect(isMultilangTextObj({EN: 'hello'})).to.be.true;
            }
        );
        it(
            `should return true if given an object with key en or english (upper or lower case), ` +
                `containing null`,
            function() {
                expect(isMultilangTextObj({en: null})).to.be.true;
                expect(isMultilangTextObj({english: null})).to.be.true;
                expect(isMultilangTextObj({ENGLISH: null})).to.be.true;
                expect(isMultilangTextObj({EN: null})).to.be.true;
            }
        );
        it(
            `should return true if given an object with key fr or french, containing a ` + `string`,
            function() {
                expect(isMultilangTextObj({fr: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({french: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({FR: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({fReNCh: 'bonjour'})).to.be.true;
            }
        );
        it(`should return true if given an object with key fr, containing null`, function() {
            expect(isMultilangTextObj({fr: null})).to.be.true;
            expect(isMultilangTextObj({french: null})).to.be.true;
            expect(isMultilangTextObj({fR: null})).to.be.true;
            expect(isMultilangTextObj({FRENCH: null})).to.be.true;
        });
        it(
            `should return true if given an object with keys en & fr (or english and french, or ` +
                `any combination -- in any case), both containing either null or strings`,
            function() {
                expect(isMultilangTextObj({en: 'hello', fr: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({en: 'hello', fr: null})).to.be.true;
                expect(isMultilangTextObj({En: null, french: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({engLiSh: 'hello', frENch: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({EN: 'hello', fr: null})).to.be.true;
                expect(isMultilangTextObj({EN: null, FR: 'bonjour'})).to.be.true;
                expect(isMultilangTextObj({ENGLISH: null, FRENCH: null})).to.be.true;
            }
        );
        it(
            `should return true if given an object with numerous keys besides en or fr, but with ` +
                `en included (any combo, in any case), with all containing strings`,
            function() {
                expect(isMultilangTextObj({za: 'ok', en: 'hello', ge: 'ein'})).to.be.true;
                expect(isMultilangTextObj({za: 'ok', FRENCH: 'bonjour', ge: 'ein', '1': 'one'})).to
                    .be.true;
            }
        );
        it(
            `should return false if given object without either key fr or en, or both, or some ` +
                `variant of either`,
            function() {
                expect(isMultilangTextObj({asdf: 'zzzzz', noteng: 'fr'})).to.be.false;
                expect(isMultilangTextObj({asdfen: 'enenen', frfrfr: 'french'})).to.be.false;
            }
        );
    });

    describe(`hasKey`, function() {
        expectFunctionExists(m_.object.hasKey);
        expectFunctionExists(hasKey);
        it(`returns true if key exists in object`, function() {
            const obj = {a: 'one'};
            expect(hasKey(obj, 'a')).to.equal(true);
        });
        it(`returns false if key doesn't exist in object`, function() {
            const obj = {a: 'one'};
            expect(hasKey(obj, 'b')).to.equal(false);
        });
        it(`returns false if object doesn't exist`, function() {
            let obj: Object;
            expect(hasKey(obj, 'a')).to.equal(false);
        });
    });

    describe(`get`, function() {
        expectFunctionExists(m_.object.get);
        expectFunctionExists(get);

        const obj1 = {a: 'one'};
        const obj2 = {a: {b: 'innerLvl2'}};
        const obj3 = {a: {b: {c: 'innerLvl3'}}};

        // Objects given as obj input, with valid paths
        it(`returns matching key in object, when given string propPath w/ dots`, function() {
            expect(get(obj1, 'a')).to.eql('one');
            expect(get(obj2, 'a.b')).to.eql('innerLvl2');
            expect(get(obj3, 'a.b.c')).to.eql('innerLvl3');
        });
        it(`returns matching key in object when given string propPath w/ square braces`, function() {
            expect(get(obj2, 'a[b]')).to.eql('innerLvl2');
            expect(get(obj3, 'a[b][c]')).to.eql('innerLvl3');
        });
        it(`returns undefined if key doesn't exist in object & no defVal given`, function() {
            expect(get(obj1, 'b')).to.be.undefined;
            expect(get(obj1, 'a.b.d.h.j')).to.be.undefined;
            expect(get(obj2, 'a[j][z][gr]')).to.be.undefined;
        });

        // Empty objects as obj input
        it(`returns undefined if object doesn't exist & no defVal given`, function() {
            let obj: Object;
            expect(get(obj, 'a')).to.be.undefined;
        });
        it(`returns undefined if given undefined as input object`, function() {
            expect(get(undefined, 'a')).to.be.undefined;
        });
        it(`returns null if given null as input object`, function() {
            expect(get(null, 'a')).to.be.null;
        });
        it(`returns null if given null as input object & a default value`, function() {
            expect(get(null, 'a', 'ok')).to.be.null;
        });

        // Default value tests
        it(`if given defaultValue, return it if key doesn't exist in object`, function() {
            expect(get(obj1, 'b', 'DEFAULT')).to.eql('DEFAULT');
            expect(get(obj1, 'a.b.d.h.j', 'DEFAULT')).to.eql('DEFAULT');
            expect(get(obj2, 'a[j][z][gr]', 'DEFAULT')).to.eql('DEFAULT');
        });
        it(`if given defaultValue, return it if object doesn't exist`, function() {
            let obj: Object;
            expect(get(obj, 'b', 'DEFAULT')).to.eql('DEFAULT');
        });

        it(`handles null property by returning undefined or default value`, function() {
            expect(get(obj1, null)).to.be.undefined;
            expect(get(obj1, null, 'DEF')).to.eql('DEF');
        });
        it(`handles undefined property by returning undefined or default value`, function() {
            expect(get(obj1, undefined)).to.be.undefined;
            expect(get(obj1, undefined, 'DEF')).to.eql('DEF');
        });
        it(`handles '' property by returning undefined or default value`, function() {
            expect(get(obj1, '')).to.be.undefined;
            expect(get(obj1, '', 'DEF')).to.eql('DEF');
        });

        // Special parsing tests
        it(`eliminates duplicate dots`, function() {
            expect(get(obj3, 'a.....b..c')).to.eql('innerLvl3');
        });
        it(`eliminates trailing dots`, function() {
            expect(get(obj3, 'a.b.c.')).to.eql('innerLvl3');
            expect(get(obj3, 'a.b.c..')).to.eql('innerLvl3');
        });
        it(`eliminates preceding dots`, function() {
            expect(get(obj3, '.a.b.c')).to.eql('innerLvl3');
            expect(get(obj3, '..a.b.c')).to.eql('innerLvl3');
        });

        // Non-standard object handling
        it(`drills into functions`, function() {
            const fn = function meeka() {};
            expect(get(fn, 'name')).to.eql('meeka');
            expect(get(fn, 'name.length')).to.eql(5);
        });
        it(`drills into numbers`, function() {
            const num = 6;
            expect(get(num, 'constructor.name')).to.eql('Number');
        });
        it(`drills into NaN`, function() {
            const num = 6;
            expect(get(NaN, 'toExponential.name')).to.eql('toExponential');
        });
        it(`drills into symbols`, function() {
            const num = Symbol('okokok');
            expect(get(num, 'constructor.name')).to.eql('Symbol');
        });
        it(`drills into strings`, function() {
            const str = 'okokok';
            expect(get(str, 'length.constructor.name')).to.eql('Number');
        });
        it(`drills into booleans`, function() {
            const boola = true;
            expect(get(boola, 'constructor.name')).to.eql('Boolean');
        });
    });

    describe(`defineImmutableProp`, function() {
        expectFunctionExists(m_.object.defineImmutableProp);
        expectFunctionExists(defineImmutableProp);
        it(`should be able to add a new property to an object by mutating it externally`, function() {
            const obj = {};
            defineImmutableProp(obj, 'a', 'eh');
            expect((obj as any).a).to.equal('eh');
        });
        it(`should not be able to overwrite properties it has already defined`, function() {
            const obj = {};
            defineImmutableProp(obj, 'a', 'eh');
            defineImmutableProp(obj, 'a', 'okok'); // Should not change the value.
            expect((obj as any).a).to.equal('eh');
        });
        it(`should return the original object with properties added`, function() {
            const obj = {};
            const newObj = defineImmutableProp<{gr: string} & typeof obj>(obj, 'gr', 'argh');
            expect(newObj.gr).to.eql('argh');
        });
    });

    describe(`defineMutableProp`, function() {
        expectFunctionExists(m_.object.defineMutableProp);
        expectFunctionExists(defineMutableProp);
        it(`should be able to add a new property to an object by mutating it externally`, function() {
            const obj = {};
            defineMutableProp(obj, 'a', 'eh');
            expect((obj as any).a).to.equal('eh');
        });
        it(`should be able to overwrite properties it has already defined`, function() {
            const obj = {};
            defineMutableProp(obj, 'a', 'eh');
            defineMutableProp(obj, 'a', 'okok'); // Should change the value.
            expect((obj as any).a).to.equal('okok');
        });
        it(`should return the original object with properties added`, function() {
            const obj = {};
            const newObj = defineMutableProp<{gr: string} & typeof obj>(obj, 'gr', 'argh');
            expect(newObj.gr).to.eql('argh');
        });
    });

    describe(`defineDeletableProp`, function() {
        expectFunctionExists(m_.object.defineDeletableProp);
        expectFunctionExists(defineDeletableProp);
        it(`should be able to add a new property to an object by mutating it externally`, function() {
            const obj = {};
            defineDeletableProp(obj, 'a', 'eh');
            expect((obj as any).a).to.equal('eh');
        });
        it(`should be able to overwrite properties it has already defined`, function() {
            const obj = {};
            defineDeletableProp(obj, 'a', 'eh');
            defineDeletableProp(obj, 'a', 'okok'); // Should change the value.
            expect((obj as any).a).to.equal('okok');
        });
        it(`should allow properties it's used to define to be deleted`, function() {
            const obj = {};
            defineDeletableProp(obj, 'a', 'eh');
            delete (obj as any).a;
            expect((obj as any).a).to.be.undefined;
        });
        it(`should return the original object with properties added`, function() {
            const obj = {};
            const newObj = defineDeletableProp<{gr: string} & typeof obj>(obj, 'gr', 'argh');
            expect(newObj.gr).to.eql('argh');
        });
    });

    describe(`defineGetterProp`, function() {
        expectFunctionExists(m_.object.defineGetterProp);
        expectFunctionExists(defineGetterProp);
        it(`should be able to add a new property to an object by mutating it externally`, function() {
            const obj = {};
            defineGetterProp<{a: string}>(obj, 'a', () => 'ehhhhhh');
            expect((obj as any).a).to.equal('ehhhhhh');
        });
        it(`should return the original object with properties added`, function() {
            const obj = {};
            const newObj = defineGetterProp<{a: string}>(obj, 'a', () => 'ehhhhhh');
            expect(newObj.a).to.equal('ehhhhhh');
        });
        it(`should be able to overwrite properties it has already defined`, function() {
            const obj = {};
            defineGetterProp(obj, 'a', () => 'eh');
            defineGetterProp(obj, 'a', () => 'okok'); // Should change the value.
            expect((obj as any).a).to.equal('okok');
        });
    });

    describe(`defineMethod`, function() {
        expectFunctionExists(m_.object.defineMethod);
        expectFunctionExists(defineMethod);

        type AddFnType = {fn: () => string};
        const obj = {} as AddFnType;

        before(function() {
            defineMethod<AddFnType>(obj, 'fn', function fn() {
                return 'ok';
            });
        });

        it(`should add a new function to an object`, function() {
            expect(obj.fn).to.be.a('function');
            expect(obj.fn()).to.eql('ok');
        });

        it(`function added to object should be immutable`, function() {
            try {
                (obj as any).fn = 'ok';
            } catch {}
            expect(obj.fn).to.be.a('function');
            expect(obj.fn()).to.eql('ok');

            try {
                delete obj.fn;
            } catch {}
            expect(obj.fn).to.be.a('function');
            expect(obj.fn()).to.eql('ok');
        });

        it(`function added to object should not be unenumerable`, function() {
            Object.keys(obj);
            expect(Object.keys(obj)).to.not.include('fn');
        });
    });

    describe(`defineProp`, function() {
        expectFunctionExists(m_.object.defineProp);
        expectFunctionExists(defineProp);

        it(`can add new property to object by mutating it externally`, function() {
            const obj = {};
            defineProp<{b: string}>(obj, 'b', 'bee');
            expect((obj as any).b).to.equal('bee');
        });

        it(`should return the original object with properties added`, function() {
            const obj = {};
            const newObj = defineProp<{a: string}>(obj, 'a', 'ehh');
            expect(newObj.a).to.equal('ehh');
        });

        it(`can add new getter property to object by mutating it externally`, function() {
            const obj = {};
            defineProp<{a: string}>(obj, 'a', 'ehh');
            expect((obj as any).a).to.equal('ehh');
        });

        it(`should not be able to overwrite properties it has already defined by default`, function() {
            const obj = {};
            defineProp(obj, 'b', 'bee');
            defineProp(obj, 'b', 'BEEEEEEE'); // Should not change the value.
            expect((obj as any).b).to.equal('bee');
        });

        it(`should not be able to overwrite properties it has already defined if mutable arg = false`, function() {
            const obj = {};
            defineProp(obj, 'a', 'eh', false);
            defineProp(obj, 'a', 'okok', false); // Should not change the value.
            expect((obj as any).a).to.equal('eh');
        });

        it(`should be able to overwrite already-defined property if mutable arg was true`, function() {
            const obj = {};
            defineProp(obj, 'a', 'eh', true);
            defineProp(obj, 'a', 'okok', true); // Should change the value.
            expect((obj as any).a).to.equal('okok');
        });

        it(`should allow edits & deletion of prop defined w mutable arg 'deletable'`, function() {
            const obj = {};
            // Should set the prop.
            const newObj = defineProp<{a: string} & typeof obj>(obj, 'a', 'eh', 'deletable');
            expect(newObj.a).to.equal('eh');
            // Should allow modification of the prop.
            newObj.a = 'ay-eeeee!';
            expect(newObj.a).to.equal('ay-eeeee!');
            // Should allow deletion of the prop.
            delete newObj.a;
            expect(newObj.a).to.be.undefined;
        });
    });

    describe(`sortObject`, function() {
        const testObj = {
            z: 1,
            a: 2,
            m: 3,
            d: 4,
            s: 5,
            t: 6,
            b: 7,
        };

        // Duplicate of original test object
        const origTestObj = {...testObj};

        // New, sorted object
        const newObj = sortObject(testObj);

        it(`Doesn't mutate original object`, function() {
           expect(testObj).to.eql(origTestObj);
        });

        it(`Sorts the keys of an object`, function() {
           expect(Object.keys(newObj)).to.eql(['a', 'b', 'd', 'm', 's', 't', 'z']);
        });
    });

    describe(`omit`, function() {
        let testObj = {a: 1, b: 2};
        let testObjBig = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6};

        it(`return object omitting property with key matching the given string`, function() {
            expect(omit(testObj, 'a')).to.eql({b: 2});
            expect(omit(testObj, 'z')).to.eql(testObj);
        });
        it(`given empty object, always returns empty object`, function() {
            expect(omit({}, '')).to.eql({});
            expect(omit({}, 'asdfaerg')).to.eql({});
            expect(omit({}, [])).to.eql({});
            expect(omit({}, ['a'])).to.eql({});
            expect(omit({}, ['a', 'b', 'c', 'd'])).to.eql({});
        });
        it(`return object omitting properties with keys matching the given strings`, function() {
            expect(omit(testObj, ['a'])).to.eql({b: 2});
            expect(omit(testObj, ['a', 'b'])).to.eql({});
            expect(omit(testObjBig, ['a', 'b', 'd', 'f'])).to.eql({c: 3, e: 5});
            expect(omit(testObjBig, ['b', 'c', 'd'])).to.eql({a: 1, e: 5, f: 6});
        });
        it(`returns object omitting properties where given predicate returned falsy`, function() {
            expect(omit(testObj, (val, key) => key === 'a')).to.eql({a: 1});
            expect(omit(testObjBig, val => val > 3)).to.eql({d: 4, e: 5, f: 6});
        });
        it(`returns obj omitting props where predicate->falsy or key matched string`, function() {
            expect(omit(testObjBig, 'e', val => val > 3)).to.eql({d: 4, f: 6});
        });
        it(`returns obj omitting props where predicate->falsy or key matched one of the strings`, function() {
            expect(omit(testObjBig, ['d', 'e'], val => val > 2)).to.eql({c: 3, f: 6});
        });
    });
});
