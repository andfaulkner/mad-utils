/******************************************** HELPERS *********************************************/
/**
 * Output warning if function can't run in Node.
 */
export const browserOnly = (fnName: string) => (...args): void => {
    console.log(`*** {$fnName} not usable in node - browser only ***`);
};
