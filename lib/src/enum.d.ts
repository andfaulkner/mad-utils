/********************************************** ENUM **********************************************/
/**
 * @param {any} val - Value to match against enum
 * @param {Enum} Enum - Enum to match val against.
 * @return {boolean} true if given val is:
 *                        a) present in the given enum; and
 *                        b) An index/numeric value - i.e. '0', 0, '1', 1,...
 */
export declare const isNumericEnumItem: (val: any, Enum: any) => boolean;
export declare const isIndexEnumItem: (val: any, Enum: any) => boolean;
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
export declare const isDataEnumItem: (val: any, Enum: any) => boolean;
/**
 * Return the string form of an enum value.
 * Useful for cases where you're uncertain whether the value is in its numeric or string form.
 */
export declare const enumValToString: <E>(Enum: any, val: any, caps?: "lower" | "upper") => string;
/**
 * Convert given enum value in string form to its numeric index.
 */
export declare const stringToEnumVal: (val: string, Enum: any) => number;
/**
 * Convert given enum to an array of strings, where each potential option is one item.
 * Excludes the 'number' values in an enum.
 * @param {Enum} enum - Enum to enumerate and extract string values from.
 * @return {string[]} enum represented as an array of strings.
 */
export declare function enumToStringArray<E>(Enum: any): any[];
