/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import * as path from 'path';
import { path as rootPath } from 'app-root-path';
import { writeFileSync, readFileSync } from 'fs-extra-promise';

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
        it(`Replaces lin`, function() {
            // Build a mock file for this test
            writeFileSync('./random-example-file', `line1\nline2\nline3\nlineZZZ\nline5`);
            file.replaceInFile('./random-example-file', 'lineZZZ', 'line4');
            const exampleFileContent = readFileSync('./random-example-file').toString();
            expect(exampleFileContent).to.match(/line4/);
            expect(exampleFileContent).to.not.match(/lineZZZ/);

        });
    });

    describe(`function pathFromRoot`, function() {
        expectFunctionExists(file.pathFromRoot);
        it(`should return absolute path of mad-utils top-level dir (since it's not being ` +
            `consumed by a project when in development) if given blank string`, function()
        {
            const madUtilsDirPath = file.pathFromRoot('');
            expect(file.pathFromRoot('')).to.match(/^\/[^\/]+\/.*\/mad-utils$/);
        });
        it(`should return path relative to mad-utils route with given ` +
           `string arg joined to the end.`, function()
        {
            expect(file.pathFromRoot('src/node')).to.match(/^\/[^\/]+\/.*\/mad-utils\/src\/node$/);
        });
    });

    describe('function wasRunAsScript', function() {
        expectFunctionExists(file.wasRunAsScript);
        it(`should return false if run here, because this file was run by mocha, not as a script`,
            function()
        {
            expect(file.wasRunAsScript(__filename, process.argv, 'file.spec.ts')).to.be.false;
        });
    });
});
