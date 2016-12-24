/**
 * Build and return tag string for prepending to log outputs. Intended to ID the file from
 * which a log originated, and make it easy to see in the CLI output without close inspection.
 * Ensures consistency between generated tags (especially in terms of padding)
 *
 * @param  {string} fileName - name of originating file
 * @param  {function} colourizer - chain of composed colors.js functions, set up to apply all
 *                                 styles in the chain to any string it's passed to
 * @param {number} rpadLen - amount to pad tag with, on the right side
 * @return {string} styled output string
 */
declare const bldTag: (filename: string, colourizer?: number | Function, rpadLen?: number) => string;
export { bldTag as buildFileTagString };
