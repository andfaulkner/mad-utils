/**************************************************************************************************/
/// string.spec.ts ////
/****************************************** TEST STRINGS ******************************************/
// TODO Use test strings to test removeFromStr functions
const lineStr_1row = `|q|w||e|||r||||t|||||y||||||u|||||||i||||||||o||||||||||p||||||||||||||`;
const quoteStr_1row = 'q\'w\'\'e"r""t`y``u```i\'"\'``o````\'\'\'""\'`p""""""`';

const braceStr_3row = `(){}[]<>q(w)e[r]t{y}u<i>o((p))a[[s]]d{{f}}g<<h>>j()k[]l{}z<>x)(c][v><` +
                      `b<{))n((<)(]]]m]]][]>><>>[)()()(`;

const slashStr_2row =
    `q/w//e///r////t\y\\u\\\i\\\\o\/p/\a\\/s\\\/d\\//f\/\/g\//\h//\\j\\\\\k\\\///\\\l`;

const lineSlashStr_3row =
    `q/w//e///r////t\y\\u\\\i\\\\o\/p/\a\\/s\\\/d\\//f\/\/g\//\h//\\j|k||l|||` +
    `z||||x\|c\\|v\\\|b\|\|n\\||m`;

const strRes_1row = `qwertyuiop`;
const strRes_2row = `qwertyuiopasdfghjkl`;
const strRes_3row = `qwertyuiopasdfghjklzxcvbnm`;

/**************************************************************************************************/
/// string.ts ////
/*************************************** REMOVE SUBSTRINGS ****************************************/
/**
 * TODO document removeFromStr
 * TODO test removeFromStr
 *
 * Remove characters of given type from string
 */
export const removeFromStr = {
    slashes: (str: string): string => str.replace(/[\\/]/g, ''),
    vlines: (str: string): string => str.replace(/\|/g, ''),
    braces: (str: string): string => str.replace(/[[\](){}<>]/g, ''),
    quotes: (str: string): string => str.replace(/['"`]/g, ''),
    dashes: (str: string): string => str.replace(/\-/g, ''),
};
