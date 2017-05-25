import * as path from 'path';
import * as HandlebarsPlugin from 'handlebars-webpack-plugin';
import * as file from './file';

/**
 * Construct a handlebars plugin object. Builds an html file at given output file. Same baseline
 * index.hbs is used for all constructed html files.
 */
export const handlebarsPluginFactory =
    (data, outputFilePathFromRoot: string, conf, hbsSrcFromRoot = 'app/client/index.hbs') => {
        return new HandlebarsPlugin({
            entry: file.pathFromRoot(hbsSrcFromRoot),
            output: file.pathFromRoot(outputFilePathFromRoot),
            data: Object.assign({}, data, { appTitle: conf.appTitle }),
        });
}
