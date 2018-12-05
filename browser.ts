// Needed for exports to work correctly
import {Moment} from 'moment';

// Import shared modules, and re-export them for top-level access
import {m_} from './shared';
export * from './shared';

// Import shared modules for usage in typings
import {
    array,
    date,
    decorator,
    Enum,
    error,
    func,
    locale,
    number,
    object,
    url,
    search,
    string,
    types,
    typesIso,
    validation,
    dataTypes,
    stream,
} from './shared';

// Import DOM module
import * as dom from './src/browser/dom';
export * from './src/browser/dom';
export {dom};

/********************************************* EXPORT *********************************************/
/**
 * Top-level mad-utils namespace, containing all child namespaces
 * Includes all contents of shared module plus browser-specific namespaces
 */
export const mUtils = {
    ...m_,
    dom,
};

// Export top-level namespace aliases
export {mUtils as __};
export {mUtils as m_};
export {mUtils as madUtils};
