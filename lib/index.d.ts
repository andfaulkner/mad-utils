/**************************************** TYPE DEFINITIONS ****************************************/
export interface AppConf {
    logLevel: string;
}
export interface LogFactoryOpts {
    tagPrefix: string;
    tagSuffix: string;
    style: string;
}
export interface MadLog {
    (...strs: any[]): any;
    silly: any;
    verbose: any;
    debug: any;
    info: any;
    warn: any;
    error: any;
    wtf: any;
}
/************************************ MAIN LOG OBJECT FACTORY *************************************/
/**
 *  Build 'logger' object for reuse throughout any module it's constructed in. Strings passed
 *  to the factory appear on the left of all logs emitted by functions in the returned object,
 *  easing identification (visually and by search) of logs emitted in a specific file/module.
 *
 *  @param {string} filename - name of the module it is being built in.
 *  @param {Object} opts - config log object being built. Values in logMarkers object are intended
 *                         for assignment to this arg.
 *  @return {Object} contains a set of logging functions corresponding to available log levels.
 *           A log won't display unless the global log level is higher than the log level tied
 *           to the function (e.g. if LOG_LEVEL=info, a message passed to log.debug won't show).
 */
declare const logFactory: (config?: AppConf) => any;
export { logMarkers, logFactory, buildFileTagString };
export { buildFileTagString as buildFileTag };
export { buildFileTagString as buildTagString };
export { buildFileTagString as buildTag };
export { buildFileTagString as makeFileTagString };
export { buildFileTagString as makeFileTag };
export { buildFileTagString as makeTagString };
export { buildFileTagString as makeTag };
