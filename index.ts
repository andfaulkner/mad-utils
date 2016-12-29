/************************************** THIRD-PARTY IMPORTS ***************************************/
import * as isNode from 'detect-node';

/************************************* IMPORT PROJECT MODULES *************************************/
const colors = (isNode)
    ? require('colors/safe')
    : {};

/**************************************** TYPE DEFINITIONS ****************************************/
export interface INodeModuleBoilerplate {
    nodeModuleBoilerplatePlaceholder: string;
}

const nodeModuleBoilerplateExport: INodeModuleBoilerplate = {
    nodeModuleBoilerplatePlaceholder: 'placeholder'
}

export { nodeModuleBoilerplateExport }

