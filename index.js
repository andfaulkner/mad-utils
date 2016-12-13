const find = require('lodash.find');

/**
 * Defines the available log levels in the application
 */
const logValues = {
    silly: 1,
    verbose: 2,
    debug: 3,
    info: 4,
    warn: 5,
    error: 6,
    wtf: 7,
};

/**
 * Get the log level value (number) corresponding to the log level string
 */
const getLogVal = (logLevel = 'info')/*: number | boolean*/ => {
    return find(logValues, (logValNum: number, logVal: string) => {
        return ((logVal === logLevel) ? logValNum : (false));
    });
};

/**************************************************************************************************
 * 
 *     Build 'logger' object for reuse throughout any module it's constructed in. Strings passed
 *     to the factory appear on the left of all logs emitted by functions in the returned object,
 *     easing identification (visually and by search) of logs emitted in a specific file/module.
 * 
 *     @param {string} filename - name of the module it is being built in.
 *
 *     @param {Object} opts - config log object being built
 *            #tagPrefix: string to show to the left of the module name in the log output
 *            #tagSuffix: string to show to the right of the module name, but before the message
 *            #style: string comprised of CSS style directives separated by ;s. Used to style the
 *                    tag (i.e. ${tagPrefix}${filename}${tagSuffix}) shown beside each log.
 *                    Recommended: use predefined styles in 'logMarkers'.
 *
 *     @return {Object} contains a set of logging functions corresponding to available log levels.
 *              A log won't display unless the global log level is higher than the log level tied
 *              to the function (e.g. if LOG_LEVEL=info, a message passed to log.debug won't show).
 */
const logFactory = (config) => (fileName, opts = { tagPrefix: '', tagSuffix: '', style: '' }) => {
    const logLevelNum = getLogVal(config.logLevel);
    const fileTag = `${((opts.style) ? '%c' : '')}${opts.tagPrefix}[${fileName}]${opts.tagSuffix} `;

    return {
        silly: (...strs) => {
            if (logLevelNum < 2) {
                console.log(fileTag, opts.style, ...strs);
            }
            return strs[0];
        },
        verbose: (...strs) => {
            if (logLevelNum < 3) {
                console.log(fileTag, opts.style, ...strs);
            }
            return strs[0];
        },
        debug: (...strs) => {
            if (logLevelNum < 4) {
                console.log(fileTag, opts.style, ...strs);
            }
            return strs[0];
        },
        info: (...strs) => {
            if (logLevelNum < 5) {
                console.log(fileTag, opts.style, ...strs);
            }
            return strs[0];
        },
        warn: (...strs) => {
            if (logLevelNum < 6) {
                console.warn(fileTag, ': ', '%c[WARNING]', 'color: yellow', ':: ', ...strs);
            }
            return strs[0];
        },
        error: (...strs) => {
            if (logLevelNum < 7) {
                console.error(fileTag, ': ', '%c[ERROR]', 'color: red;', ':: ', ...strs);
            }
            return strs[0];
        },
        wtf: (...strs) => {
            if (logLevelNum < 8) {
                console.error(
                    fileTag, ': ', '%c[! DANGER: HUGE ERROR !]', 'color: red;', ':: ', ...strs);
            }
            return strs[0];
        },
    };
};


/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
const colours = {
    violet: '#551A8B',
    orange: '#EE7600',
    brown: '#593001',
    maroon: '#5d0000',
    blue: '#0000FF',
    darkMidnightBlue: '#003366',
    deepRed: '#800000',
    yellowishGold: '#E5C100',
    darkGray: '#818181',
    hotPink: '#FF69B4',
    tan: '#C4AEAD',
    white: '#FFFFFF',
    indigo: '#4B0082',
    green: 'green',
    darkGreen: '#004000',
    gray: 'gray',
    cyan: '#00FFFF',
    black: 'black',
    ultraPaleGreen: '#f0fff0',
};

const style = {
    bold: 'font-weight: bold;',
    underline: 'text-decoration: underline;',
};


/************************************************************************************************
 *
 *         Collection of predefined styles for differentiating logs between separate files
 *
 */
const logMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: `color: ${colours.yellowishGold};`,
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: `color: ${colours.brown}; ${style.bold} ${style.underline}`,
    },
    barbells: {
        tagSuffix: '--()-()',
        tagPrefix: '()-()--',
        style: `color: ${colours.darkGray}; ${style.bold}`,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: `color: ${colours.darkMidnightBlue};`,
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: `color: ${colours.indigo}`,
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_',
        tagSuffix: '_♟♟♟♟♟♟♟♟',
        style: `color: ${colours.brown}`,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: `color: ${colours.darkGreen}`,
    },
    dirtRoad: {
        tagSuffix: '= = = =',
        tagPrefix: '= = = =',
        style: `
            color:          ${colours.tan};
            ${style.bold}
            border-top:     1px inset ${colours.tan};
            border-bottom:  1px inset ${colours.tan};
            border-color:   ${colours.tan};
            padding-top:    2px;
            padding-bottom: 2px;
            margin-top:     2px;
            margin-bottom:  2px;`,
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        style: 'background-color: ${colours.hotPink}; color: ${colours.white}',
    },
    farmerBrown: {
        tagPrefix: '[🐑🐂🐑]-',
        tagSuffix: '-[🐑🐂🐑] ',
        style: '',
    },
    grasslands: {
        tagSuffix: '^^^^',
        tagPrefix: '^^^^',
        style: `color: ${colours.green}; ${style.bold}`,
    },
    lispyKatana: {
        tagSuffix: ';;;;;;;;;;;;;;()()',
        tagPrefix: '',
        style: `color: ${colours.gray}; ${style.bold}`,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        style: `color: ${colours.violet}; ${style.bold}`,
    },
    lakeLouise: {
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        style: `color: ${colours.cyan};`,
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        style: `color: ${colours.white}; background-color: ${colours.black};`,
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        style: `color: ${colours.blue}; ${style.bold}`,
    },
    tangerines: {
        tagPrefix: 'o(o)(){o}()@(o)OO@(){O}() _ ',
        tagSuffix: ' _ ()()()*()',
        style: `color: ${colours.orange};`,
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        style: `color: ${colours.blue}; background-color: ${colours.white};`,
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        style:
            `color: ${colours.deepRed}; ${style.bold} background-color: ${colours.ultraPaleGreen}`,
    },
    xmlHell: {
        tagPrefix: '<<<<<>>>>>',
        tagSuffix: ' >> ',
        style: '',
    },
};


/**
 * @EXPORT logMarkers
 * @EXPORT logFactory
 * @type {Object}     logMarkers
 * @type {Function} logFactory :: (fileName: string, opts = {tagPrefix, tagSuffix, style}) => Object
 */
module.exports = { logMarkers, logFactory };

