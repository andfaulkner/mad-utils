# mad-logs

*   colourful, obtrusive logs (mainly) for the browser console.
*   provides over 20 styles to ensure logs of different types stay differentiable from one another at a glance.
*   just like with Winston, alter amount of text shown based on current log level:
    *   comes with levels:  silly, verbose, debug, info, warn, error, wtf

*   Note: set up to work in Node with limited functionality; improved NodeJS terminal logging coming in a future release.

----
## Usage

    // my-fun-file.js
    const madLogs = require('mad-logs');
    const logMarkers = madLogs.logMarkers;

    // invoke the log factory for this file
    const log = madLogs.logFactory({ logLevel: "debug" })('my-fun-file.js', logMarkers.maceWindu);

    log('display me on the browser console!');
        // => displays "display me on the browser console!" preceded by a purple lightsaber
    log.verbose('display me on the browser console, but only if we're in verbose mode or higher');
    log.error('display me on the browser console, but only if we're in verbose mode or higher');

*   { logLevel: someLevel } defines the logLevel for the current context. Logs only display if they are "higher" than this level
*   'my-fun-file.js' is a placeholder for the name of the current file. This appears in each log line, as part of the "tag"
*   logMarkers.maceWindu << replace with any item in the log marker styles list (see below)
    *   or make your own log markers (Details on this coming soon)


###Invoking the log factory with default or environment config:
If process.env.LOG_LEVEL is set (which you should - passing config objects in all the time is annoying and poorly encapsulated),
or if you like the default level of 'info', you can construct the log object for a file like this:

    const log = madLogs.logFactory()('my-fun-file.js', logMarkers.maceWindu);

This is what you should be doing - it's a good idea to set process.env.LOG_LEVEL in a configuration file that gets activated on app launch.
//  TODO provide more details on this pattern


### Available log "marker" styles
*   angryBird
*   arrow
*   backAndForth
*   barbells
*   brainwave
*   cartoonSwearing
*   checkmate
*   default
*   dirtRoad
*   escherBarbieLego
*   farmerBrown
*   grasslands
*   lispyKatana
*   maceWindu
*   lakeLouise
*   nightmare
*   swimmers
*   tangerines
*   springy
*   vendetta
*   xmlHell

### Log marker usage
*   When first "constructing" the log factory, define the log marker as the second argument (as seen above)

### buildFileTagString
*   Construct a styled tag for inclusion at the beginning of console logs. Intended for use in all manual logs in a specific file. Also
*   Reason: in some environments the stack trace gets messed up by calling a wrapper function    around console methods (console.log etc.). This provides a nice marker for such environments
*   Note: currently optimized for terminal use - outputs terminal colour string wrappers rather than browser CSS. However, it is still usage in the browser if you do not use the 
    colourization options

####buildFileTagString Usage

    (filename: string, colourizer?: Function | number, rpadSize?: string = 20): string

    *   filename: tag to stylize 
    *   colourizer: either:
            1)   a colors.js function or a chain of composed colors.js functions, set up to apply all styles in the chain to any string passed to the filename argument
            2)   a number, in which case this number is used as the right padding length. In this case, any value passed to rpadSize is ignored.
    *   rpadSize: (optional) align all logs up to this length. Works like lodash's padLeft, or ES7's String.prototype.padEnd.

Examples:

    import { buildFileTagString } from 'mad-logs';
    const colors = require('colors'); // required if you want to apply styles

    const TAG = buildFileTagString('[current-file]', colors.black.bgGreen.bold, 25);

    //...
    if (process.env.LOG_LEVEL === 'verbose') {
        console.log(`${TAG} Connecting to postgres...`);
    }
    // Output: [current-file]           Connecting to postgres...
    //        |
    //        |<--terminal edge here {not included in actual output}
