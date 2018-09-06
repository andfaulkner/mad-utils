/// <reference path="../node_modules/typescript/lib/lib.es2015.d.ts" />
/// <reference path="../node_modules/typescript/lib/lib.dom.d.ts" />

/*************************************** BROWSER DETECTION ****************************************/
/**
 * Returns true if current browser is Safari 9 or 10
 */
export const isSafari9Or10 = (): boolean =>
    !!window.navigator.userAgent.match(/[sS]afari/) &&
    !!window.navigator.userAgent.match(/[^0-9.]((9)|(10))\.[0-9]+\.[0-9]+[^0-9.]/);
