/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
export declare const colours: {
    violet: string;
    orange: string;
    brown: string;
    maroon: string;
    blue: string;
    darkMidnightBlue: string;
    deepRed: string;
    yellowishGold: string;
    darkGray: string;
    hotPink: string;
    tan: string;
    white: string;
    indigo: string;
    green: string;
    darkGreen: string;
    gray: string;
    cyan: string;
    black: string;
    ultraPaleGreen: string;
};
export declare const style: {
    bold: string;
    underline: string;
};
/************************************************************************************************
 *
 *   Collection of predefined styles for differentiating logs between separate files. Values are
 *   intended for by the logFactory, to apply a theme to a specific logger object.
 *
 *   -   tagPrefix:     string to show to left of module name in log output
 *   -   tagSuffix:     string to show to right of module name, but before the message
 *   -   style:         string of CSS style directives separated by ;s. Used to style the
 *                      tag (i.e. ${tagPrefix}${filename}${tagSuffix}) beside each log.
 *
 * @example logFactory()('my-cool-file', logMarkers.cartoonSwearing)
 * @example logFactory()('my-cool-file', logMarkers.vendetta)
 *
 */
export declare const logMarkers: {
    angryBird: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    arrow: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    backAndForth: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    barbells: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    brainwave: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    cartoonSwearing: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    checkmate: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    default: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    dirtRoad: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    escherBarbieLego: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    farmerBrown: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    grasslands: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    lispyKatana: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    maceWindu: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    lakeLouise: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    nightmare: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    swimmers: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    tangerines: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    springy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    vendetta: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    xmlHell: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
};
