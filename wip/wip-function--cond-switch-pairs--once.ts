export function once(fn: Function): Function {
    let ran = false;
    let res = null;

    return function(...args: any[]) {
        if (!ran) {
            ran = true;
            res = fn(...args);
        }
        return res;
    }
}


/****************************************** CONDITIONALS ******************************************/
/**
 * Function-based switch expression. Any odd number of arguments can be given. For each pair of args,
 * the 1st arg is a condition (which passes if truthy), and the 2nd is the value returned if the
 * condition passes. If no conditions pass, the final arg given to the function returned. If no
 * final arg is given, it instead throws an error.
 *
 * Each pair of arguments:
 *     @param {boolean|any} cond - condition to check for truthiness
 *     @param {any} val - value returned if the test condition is truthy.
 * Final argument:
 *     @param {any} defVal - value returned if no test conditions are met.
 *
 * @example If size is 'tiny', returns 12. If size is 'small', returns 14. Otherwise, returns 20:
 *     condSwitch(size === 'tiny',  12,
 *                size === 'small', 14,
 *                                  20);
 */
export function condSwitch(
    cond: boolean | RealAny,
    val: RealAny,
    ...condValPairsAndOrDefVal: RealAny[]
): RealAny | never {
    if (cond) return val;
    if (condValPairsAndOrDefVal.length === 1) return condValPairsAndOrDefVal[0];

    while (condValPairsAndOrDefVal.length > 1) {
        if (condValPairsAndOrDefVal[0]) return condValPairsAndOrDefVal[1];
        loop2(() => condValPairsAndOrDefVal.shift());
    }

    if (condValPairsAndOrDefVal.length === 0) {
        throw new Error(
            'No matching val found. To avoid throwing in this scenario, pass args to consSwitch' +
                'in pairs, where #1 is the test, and #2 is the return val if test is truthy - then ' +
                'follow them with a final "else" value to return if no other tests are truthy',
        );
    }

    return condValPairsAndOrDefVal[0];
}

// TODO

// export type _DefaultVal<T = any> = {default: T};
// export type _CaseValPair = [boolean | RealAny, RealAny];

// export function condSwitch2<T>(
//     caseValPair: _CaseValPair,
//     ...caseValPairsOrFinalDefVal: (_CaseValPair | _DefaultVal<T>)[]
// ): RealAny | never {

//     if (caseValPairsOrFinalDefVal)

//     const allPairs = [].concat([caseValPair]).concat(caseValPairsAndOrDefVal);

//     const finalArg = caseValPairs[caseValPairs.length - 1];
//     if (finalArg)

//     if (isArray(finalArg) && finalArg.length === 2)
//     const matcher = caseValPairs.find(([test, val]) => !!test);
//     if (matcher)
// }

// export type CaseReturnValPair = [boolean | RealAny, RealAny];
// export type CaseRetPair = CaseReturnValPair;
// export type CasePair = CaseReturnValPair;
// export type Case = CaseReturnValPair;
// export type CP = CaseReturnValPair;

// export type AnyNev = RealAny | never;

// export type DefaultCase = RealAny;
// export type DefCase = DefaultCase;
// export type Def = DefaultCase;

// export function condSwitch2(caseReturnValPair: CaseReturnValPair): AnyNev;
// export function condSwitch2(caseReturnValPair: CaseReturnValPair, defaultCase: DefaultCase): AnyNev;

// export function condSwitch2(caseRetPair1: CaseRetPair, caseRetPair2: CaseRetPair): AnyNev;
// export function condSwitch2(caseRetPair1: CaseRetPair, caseRetPair2: CaseRetPair, def: Def): AnyNev;

// export function condSwitch2(casePair1: CasePair, casePair2: CasePair, casePair3: CasePair): AnyNev;
// export function condSwitch2(casePair1: Case, casePair2: Case, casePair3: Case, def: Def): AnyNev;

// export function condSwitch2(casePr1: Case, casePr2: Case, casePr3: Case, casePr4: Case): AnyNev;
// export function condSwitch2(case1: Case, case2: Case, case3: Case, case4: Case, def: Def): AnyNev;

// export function condSwitch2(cp1: Case, cp2: Case, cp3: Case, cp4: Case, cp5: Case): AnyNev;
// export function condSwitch2(cp1: CP, cp2: CP, cp3: CP, cp4: CP, cp5: CP, def: Def): AnyNev;

// export function condSwitch2(cp1: CP, cp2: CP, cp3: CP, cp4: CP, cp5: CP, cp6: CP): AnyNev;
// export function condSwitch2(cp1: CP, cp2: CP, cp3: CP, cp4: CP, cp5: CP, cp6: CP, def: Def): AnyNev;

// export function condSwitch2(cp1: CP, cp2: CP, cp3: CP, cp4: CP, cp5: CP, cp6: CP, cp7: CP): AnyNev;
// export function condSwitch2(c: CP, c2: CP, c3: CP, c4: CP, c5: CP, c6: CP, c7: CP, df: Def): AnyNev;

// export function condSwitch2<R>(...condPairs: (CaseReturnValPair | Def)[]): AnyNev {
//     const finalArg = condPairs[condPairs.length - 1];
//     if (finalArg)

//     if (isArray(finalArg) && finalArg.length === 2)
//     const matcher = condPairs.find(([test, val]) => !!test);
//     if (matcher)
// }
