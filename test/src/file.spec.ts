/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import * as path from 'path';
import { path as rootPath } from 'app-root-path';

/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
import { expect } from 'chai';

import { m_, file } from '../../node';
import { expectFunctionExists } from '../../node';

const docObjModel = m_.file;


/********************************************* TESTS **********************************************/
describe(`file sub-module`, function() {
    it(`exists`, function() {
        expect(file).to.exist;
    });
    describe(`function isDir`, function() {
        expectFunctionExists(file.isDir);
        it(`should return true if passed a path to a directory`, function() {
            expect(file.isDir(path.join(rootPath, 'node_modules'))).to.be.true;
        });
        it(`should return false if passed a path to a file or nonexistent inode`, function() {
            expect(file.isDir(path.join(rootPath, 'no_file_or_dir_w_this_name.ext'))).to.be.false;
        });
    });
    describe(`function replaceInFile`, function() {
        expectFunctionExists(file.replaceInFile);
    });
    describe(`function pathFromRoot`, function() {
        expectFunctionExists(file.pathFromRoot);
    });
    describe('function wasRunAsScript', function() {
        expectFunctionExists(file.wasRunAsScript);
    });
});
