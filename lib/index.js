"use strict";
/************************************** THIRD-PARTY IMPORTS ***************************************/
const isNode = require("detect-node");
/************************************* IMPORT PROJECT MODULES *************************************/
const colors = (isNode)
    ? require('colors/safe')
    : {};
const nodeModuleBoilerplateExport = {
    nodeModuleBoilerplatePlaceholder: 'placeholder',
    nodeModuleBoilerplatePlaceholderFn: (test) => { throw new Error('Boilerplate fn called'); },
};
exports.nodeModuleBoilerplateExport = nodeModuleBoilerplateExport;
//# sourceMappingURL=index.js.map