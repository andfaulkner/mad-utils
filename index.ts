/************************************** THIRD-PARTY IMPORTS ***************************************/
import * as isNode from 'detect-node';

/************************************* IMPORT PROJECT MODULES *************************************/
const colors = (isNode)
    ? require('colors/safe')
    : {};

/**************************************** TYPE DEFINITIONS ****************************************/
export interface IMyExport {
    placeholder: string;
}

const myExport: IMyExport = {
    placeholder: 'placeholder'
}

export { myExport }

