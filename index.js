const find = require('lodash.find');
const isString = require('lodash.isstring');
const isNode = require('detect-node');

/************************************* IMPORT PROJECT MODULES *************************************/
const { colours, style, logMarkers } = require('./src/theming');

const colors = (isNode) 
    ? require('colors/safe')
    : {};


/*************************************** LOG LEVEL HANDLING ***************************************/
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
    return find(logValues, (logValNum/*: number*/, logVal/*: string*/) => {
        return ((logVal === logLevel) ? logValNum : (false));
    });
};

/**
 * Ensure valid config object is passed in
 * @param  {Function} next - next function in the sequence. Passed in to allow this function to
 *                           wrap other functions
 * @param  {Object<String>}> string must be 1 of the logValues object's keys to be valid
 * @return {Function} next
 */
const verifyConfig = (config, next) => {
    if (!(config.logLevel)) {
        throw new TypeError('config object passed to mad-logs logFactory must have key logLevel')
    }
    if (!isString(config.logLevel)) {
        throw new TypeError('config.logLevel must be a string');
    }
    if (!(Object.keys(logValues).some((logValue) => (logValue === config.logLevel)))) {
        throw new TypeError(
            `config.logLevel must be one of the following: ${Object.keys(logValues).join(', ')}`
        );
    }
    return next;
};

const defaultLogFactoryOpts = { tagPrefix: '', tagSuffix: '', style: '' };

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
const logFactory = (config) => verifyConfig(config, (fileName, opts = defaultLogFactoryOpts) => {
    const logLevelNum = getLogVal(config.logLevel);
    const fileTag = (isNode)
        ? `${opts.tagPrefix}[${fileName}]${opts.tagSuffix}`
        : `${((opts.style) ? '%c' : '')}${opts.tagPrefix}[${fileName}]${opts.tagSuffix} `;

    //
    // LOG METHOD FACTORY
    //

    const basicLog = (...strs) => {
        console.log(fileTag, opts.style, ...strs);
    };

    const logMethodFactory = (levelNum, output = basicLog) => {
        return (...strs) => {
            if (logLevelNum < levelNum) {
                output(...strs);
            }
            return strs[0];
        }
    };

    // 
    // CONSTRUCT LOG OBJECT METHODS FROM FACTORY (ABOVE)
    // 

    const log = logMethodFactory(4);
    log.silly = logMethodFactory(2);
    log.verbose = logMethodFactory(3);
    log.debug = logMethodFactory(4);
    log.info = logMethodFactory(5);
    log.warn = logMethodFactory(6, (...strs) => {
        (isNode)
            ? console.warn(colors.yellow(`[WARNING] ${fileTag}`), ' :: ', ...strs)
            : console.warn(fileTag, ': ', '%c[WARNING]', 'color: yellow', ':: ', ...strs);
    });

    log.error = logMethodFactory(7, (...strs) => {
        (isNode)
            ? console.error(colors.bgRed.white(`[ERROR] ${fileTag}`), ' :: ', ...strs)
            : console.error(fileTag, ': ', '%c[ERROR]', 'color: red;', ':: ', ...strs);
    });

    log.wtf = logMethodFactory(8, (...strs) => {
        (isNode)
            ? console.error('\n', colors.red.bgWhite(`[! DANGER: HUGE ERROR !] ${fileTag}`),
                            ' :: ', ...strs, '\n')
            : console.error(fileTag, ': ', '%c[! DANGER: HUGE ERROR !]', 'color: red;', ':: ', ...strs);
        
    });

    /**
     * @EXPORT - FINAL CONSTRUCTED LOG OBJECT
     */
    return log;
});


/**
 * @EXPORT logMarkers
 * @EXPORT logFactory
 * @type {Object}     logMarkers
 * @type {Function} logFactory :: (fileName: string, opts = {tagPrefix, tagSuffix, style}) => Object
 */
module.exports = { logMarkers, logFactory };
