import { scrubStackTrace } from './error';
import { isVerbose, isMocha, isWarn } from 'env-var-helpers';

const fn = `mad-utils::enum --`;

/********************************************** ENUM **********************************************/
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is:
 *                        a) present in the given enum; and
 *                        b) An index/numeric value - i.e. '0', 0, '1', 1,...
 */
export const isNumericEnumItem = (val: any, Enum): boolean => !isDataEnumItem(val, Enum);
export const isIndexEnumItem = isNumericEnumItem;

/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is: a) present in the given enum; and b) A non-numeric
 *                   'data' value (i.e. a value that was actually set).
 * @example Below, Suits[1] & Suits['1'] are truthy (they'd return 'CLUBS'). isDataEnumItem still
 *         knows to mark them false: it knows 0, '0', 1, '1', etc. are indexes, not actual values:
 *             enum Suits { HEARTS, CLUBS, SPADES, DIAMONDS }
 *                 Suits['HEARTS'];                   // => 0
 *                 isDataEnumItem('HEARTS', Suits);   // => true
 *                 Suits['WRENCHES']                  // => undefined
 *                 isDataEnumItem('WRENCHES', Suits); // => false
 *                 Suits['1']                         // => 'CLUBS'
 *                 isDataEnumItem('1', Suits);        // => false
 */
export const isDataEnumItem = (val: any, Enum): boolean => typeof Enum[val] === 'number';

/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
export const enumValToString = <E>(Enum, val, caps: 'lower' | 'upper' | null = null): string => {
    const outVal: string = (typeof val === 'string') ? val : Enum[val] as string;
    switch(caps) {
        case 'lower': return outVal.toLowerCase();
        case 'upper': return outVal.toUpperCase();
        default: return outVal;
    }
}

/**
 * Convert given enum value in string form to its numeric index.
 */
export const stringToEnumVal = (val: string, Enum): number => {
    if (isMocha && isVerbose) console.log(`${fn} stringToEnumVal: Enum:`, Enum, `;; val:`, val);
    for (let item in Enum) {
        if (isDataEnumItem(item, Enum) && item.toLowerCase() === val.toLowerCase()) {
            return Enum[item];
        }
    }

    if (isMocha && isWarn) console.warn(`${fn} stringToEnumVal ::
        WARNING: stringToEnumVal: no matches of given value - ${val} - in given enum:
            ${JSON.stringify(Enum)}
        ...returning 99999.`);

    let stack;
    // NOTE: NOT AN ACTUAL ERROR CALL. THIS IS DONE TO ACQUIRE THE STACKTRACE.
    try { throw new Error() } catch (e) { stack = e.stack; }

    // Display clean stack trace up to point of 'Error' creation.
    const cleanStack = scrubStackTrace(stack, 'stringToEnumVal');
    if (isVerbose && isMocha) console.log(cleanStack, '\n');

    return 99999;
}

/**
 * Convert given enum to an array of strings, where each potential option is one item.
 * Excludes the 'number' values in an enum.
 * @param {Enum} enum - Enum to enumerate and extract string values from.
 * @return {string[]} enum represented as an array of strings.
 */
export function enumToStringArray<E>(Enum) {
    let values = [];
    // Stores all the values in the values list.
    for (let i in Enum) {
        if (typeof Enum[i] !== 'number') values.push(Enum[i]);
    }
    return values;
}
