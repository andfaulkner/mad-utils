# mad-logs

*   colourful, obtrusive logs for the browser.
*   provides over 20 styles to ensure logs of different types stay differentiable from one another at a glance.
*   just like with Winston, alter amount of text shown based on current log level:
    *   comes with log levels:  silly, verbose, debug, info, warn, error, wtf

*   Note: works in Node with limited functionality, but mainly intended for browser console use


## Usage

    const log = require('mad-logs')({logLevel: "info" })('my-fun-file.js', logMarkers.maceWindu);

    log('display me on the console!')
