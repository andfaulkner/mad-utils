# mad-logs

*   colourful, obtrusive logs for the browser.
*   provides over 20 styles to ensure logs of different types stay differentiable from one another at a glance.
*   just like with Winston, alter amount of text shown based on current log level:
    *   comes with log levels:  silly, verbose, debug, info, warn, error, wtf

*   Note: works in Node with limited functionality, but mainly intended for browser console use


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
*   When first "constructing" the log factory, define the log marker as the second argument (as seen above 
