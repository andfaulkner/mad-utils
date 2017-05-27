
/**
 * Return a function's source code in nicely spaced array format.
 * @param {Function} func - The function to examine
 * @return {string[]} function source code in an array, where each 'line' is an item.
 */
export function getFnAsArr(func: Function): string[] {
    return func.toString().split('\n');
}

