/******************************************** HELPERS *********************************************/
/**
 * Output warning if function can't run in Node.
 */
export const browserOnly = (fnName: string) => {
    console.warn(`*** ${fnName} not usable in node - browser only ***`);
};
