"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es2015.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("../../src/node/test");
/******************************** IMPORT NUMBER MODULE FOR TESTING ********************************/
var hocs_1 = require("../../src/react/hocs");
/********************************************* TESTS **********************************************/
describe("React module", function () {
    test_1.expectFunctionExists(hocs_1.logOnRender, 'logOnRender', '(React utility component)');
});
//# sourceMappingURL=react--hocs.spec.js.map