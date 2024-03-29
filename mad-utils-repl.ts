/// <reference path="./node_modules/@types/node/index.d.ts" />
declare function require(name: string);

/*------------------------------------- THIRD-PARTY MODULES --------------------------------------*/
import lodash from 'lodash';
import util from 'util';
import repl from 'repl';
import path from 'path';
import {path as rootPath} from 'app-root-path';
import isNode from 'detect-node';

/*--------------------------------- REPL NODE ENVIRONMENT SETUP ----------------------------------*/
util.inspect.defaultOptions.colors = true;
util.inspect.defaultOptions.depth = 10;
util.inspect.defaultOptions.breakLength = 100;
util.inspect.defaultOptions.showHidden = true;

/*------------------------------------------- LOGGING --------------------------------------------*/
import {logFactory, Styles} from 'mad-logs/lib/shared';
const log = logFactory('mad-utils-repl.ts', Styles.angryBird);

import m_ from './node';

/*----------------------------------------- CONFIG REPL ------------------------------------------*/
const packageJson = require('./package.json');
const {defineProperty} = Object;

export const defPropConfig = {
    // Configuration for a global value that cannot be reassigned in the repl
    immutable: (lib: any) => ({
        configurable: false,
        enumerable: true,
        writable: false,
        value: lib,
    }),
    // Configuration for a global value that can be reassigned in the repl
    mutable: (lib: any) => ({
        configurable: true,
        enumerable: true,
        writable: true,
        value: lib,
    }),
};

/**
 * Run when inspect is called in the repl
 */
export const inspect = (...args) => {
    (console.log as any)(
        ...args.map(arg => {
            if (typeof arg === 'function') return arg.toString();
            return util.inspect(arg);
        })
    );
    return util.inspect(args[0]);
};

/*----------------------------------------- CREATE REPL ------------------------------------------*/
export const r = repl.start({useColors: true});

// Add REPL history file
const historyFile = path.join(rootPath, '.node_history');
require('repl.history')(r, historyFile);

// Add IN_REPL property to repl environment. Acts as identifier that REPL is currently running
defineProperty(r.context.process.env, 'IN_REPL', defPropConfig.immutable(true));

/*----------------------------------------- REPL HELPERS -----------------------------------------*/
/**
 * Bind given properties to the repl context, with the given values
 * Display as list on repl load, with descriptions for each specified in descriptions prop
 * @param {Object} activeRepl Started repl (through repl.start())
 * @param {Object} ctxProps Bind each given value to its corresponding key
 *                 e.g. {_: lodash, _m: madUtils, Promise: bluebird}
 * @param {Object} descriptions Optional matching descriptions to display beside prop w/ given key
 *                 e.g.: {_: 'lodash alias', bluebird: 'promises library'}
 * @example bindPropsToRepl(repl.start(), { _: lodash, projData }, { _: 'Util lib' });
 */
export const bindPropsToRepl = (ctxProps: Object, descriptions: {[key: string]: string}) => {
    console.log(`\n\nWelcome to the Javelinscript REPL!`);
    console.log(`Custom properties bound to the top-level context:`);

    // Iterate through the given context properties
    for (let [key, val] of lodash.toPairs(ctxProps)) {
        // Add current prop's value to repl context. Mutable if requested, immutable otherwise
        if (typeof val === 'object' && val.val && val.mutable) {
            defineProperty(r.context, key, defPropConfig.mutable(val.val));
        } else {
            defineProperty(r.context, key, defPropConfig.immutable(val));
        }

        // Display prop and (if defined) prop description on repl boot
        if (descriptions[key]) {
            console.log(` * ${key}: ${descriptions[key]}`);
            // If prop description provided, bind it to the object in the context
            defineProperty(val, `__repl_description__`, defPropConfig.immutable(descriptions[key]));
        } else {
            console.log(` * ${key}`);
        }
    }
    console.log(`> `);
};

/*---------------------------------------- PROPS TO BIND -----------------------------------------*/
/**
 * Properties to bind to repl context (available at top level in repl)
 */
const ctxProps = {
    // Helper libraries
    // bluebird,
    lodash,

    // Are we in Node?
    isNode,

    // Logging & object info-related
    inspect,

    // package.json content
    packageJson,

    // Import mad-utils
    m_,
    madUtils: m_,

    // Import mad-utils submodules
    array: m_.array,
    date: m_.date,
    file: m_.file,
    func: m_.func,
    locale: m_.locale,
    number: m_.number,
    object: m_.object,
    search: m_.search,
    string: m_.string,
    types: m_.types,
    url: m_.url,
    validation: m_.validation,
};

/**
 * Extra descriptions for bound properties
 */
const descriptions = {
    _: 'lodash alias',
    madUtils: `Contains mad-utils shared modules/exported functions`,
};

// Attach props to REPL (repl is in repl setup)
bindPropsToRepl(ctxProps, descriptions);
