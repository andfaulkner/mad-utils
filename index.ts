/************************************** THIRD-PARTY IMPORTS ***************************************/
import * as isNode from 'detect-node';

/************************************* IMPORT PROJECT MODULES *************************************/
const colors = (isNode)
    ? require('colors/safe')
    : {};

/**************************************** TYPE DEFINITIONS ****************************************/
export interface INodeModuleBoilerplate {
    nodeModuleBoilerplatePlaceholder: string;
    nodeModuleBoilerplatePlaceholderFn: (test: string) => never;
}

const nodeModuleBoilerplateExport: INodeModuleBoilerplate = {
    nodeModuleBoilerplatePlaceholder: 'placeholder',
    nodeModuleBoilerplatePlaceholderFn: (test: string) => { throw new Error('Boilerplate fn called') },
}

export { nodeModuleBoilerplateExport }

