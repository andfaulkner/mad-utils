import * as path from 'path';
import * as HandlebarsPlugin from 'handlebars-webpack-plugin';
console.log(HandlebarsPlugin);

const pathFromRoot = (filePathFromRoot) => path.join(__dirname, '../../', (filePathFromRoot || ''));

/**
 * Construct a handlebars plugin object. Builds an html file at given output file. Same baseline
 * index.hbs is used for all constructed html files.
 */
export const handlebarsPluginFactory =
    (data, outputFilePathFromRoot: string, conf, hbsSrcFromRoot = 'app/client/index.hbs') => {
        return new HandlebarsPlugin({
            entry: pathFromRoot(hbsSrcFromRoot),
            output: pathFromRoot(outputFilePathFromRoot),
            data: Object.assign({}, data, { appTitle: conf.appTitle }),
        });
}
