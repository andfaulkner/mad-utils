"use strict";
/************************************** THIRD-PARTY IMPORTS ***************************************/
const isNode = require("detect-node");
/************************************* IMPORT PROJECT MODULES *************************************/
const colors = (isNode)
    ? require('colors/safe')
    : {};
const myExport = {
    placeholder: 'placeholder'
};
exports.myExport = myExport;
//# sourceMappingURL=index.js.map