/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

import path from 'path';
import {path as rootPath} from 'app-root-path';
import {writeFileSync, readFileSync, unlinkSync} from 'fs-extra-promise';
import {expectFunctionExists, expectNonEmptyObjectExists} from '../../node';

/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
import {expect} from 'chai';

import {m_, file} from '../../node';
import {file as fileFromNode} from '../../node';
import * as fileModule from '../../src/node/file';

/********************************************* CONFIG *********************************************/
const exampleFilePath = `./random-example-file`;

/********************************************* TESTS **********************************************/
describe(`file sub-module`, function() {
    expectNonEmptyObjectExists(file, `file (from shared/base export)`);
    expectNonEmptyObjectExists(m_.file, `file (from m_ top-level namespace)`);
    expectNonEmptyObjectExists(fileModule, `file (import all from file.ts file)`);
    expectNonEmptyObjectExists(fileFromNode, `file (from Node export)`);

    describe(`function isDir`, function() {
        expectFunctionExists(file.isDir);
        it(`should return true if passed a path to a directory`, function() {
            expect(file.isDir(path.join(rootPath, `node_modules`))).to.be.true;
        });
        it(`should return false if passed a path to a file or nonexistent inode`, function() {
            expect(file.isDir(path.join(rootPath, `no_file_or_dir_w_this_name.ext`))).to.be.false;
        });
    });

    describe(`function replaceInFile`, function() {
        expectFunctionExists(file.replaceInFile);
        it(`Replaces lin`, function() {
            // Build a mock file for this test
            writeFileSync(exampleFilePath, `line1\nline2\nline3\nlineZZZ\nline5`);
            file.replaceInFile(exampleFilePath, `lineZZZ`, `line4`);
            const exampleFileContent = readFileSync(exampleFilePath).toString();
            expect(exampleFileContent).to.match(/line4/);
            expect(exampleFileContent).to.not.match(/lineZZZ/);
        });
    });

    describe(`function pathFromRoot`, function() {
        expectFunctionExists(file.pathFromRoot);
        it(
            `should return absolute path of mad-utils top-level dir (since it's not being ` +
                `consumed by a project when in development) if given blank string`,
            function() {
                const madUtilsDirPath = file.pathFromRoot(``);
                expect(file.pathFromRoot(``)).to.match(/^\/[^\/]+\/.*\/mad-utils$/);
            }
        );
        it(
            `should return path relative to mad-utils route with given ` +
                `string arg joined to the end.`,
            function() {
                expect(file.pathFromRoot(`src/node`)).to.match(
                    /^\/[^\/]+\/.*\/mad-utils\/src\/node$/
                );
            }
        );
    });

    describe(`function wasRunAsScript`, function() {
        expectFunctionExists(file.wasRunAsScript);
        it(`should return false if run here, because this file was run by mocha, not as a script`, function() {
            expect(file.wasRunAsScript(__filename, process.argv, `file.spec.ts`)).to.be.false;
        });
    });

    describe(`function getJsFilesInDir`, function() {
        let fullPath: string;
        let dirsAtPath: string[];
        before(function() {
            fullPath = path.join(rootPath, `test/mock/mock-dir-of-files`);
            dirsAtPath = file.getJsFilesInDir(fullPath);
        });
        expectFunctionExists(file.getJsFilesInDir);
        it(`returns array of all js files in the directory at given path`, function() {
            expect(dirsAtPath).to.contain(`file1.js`);
            expect(dirsAtPath).to.contain(`file2.js`);
            expect(dirsAtPath).to.contain(`file5.js`);
        });
        it(`Excludes dirs contained in the folder at the given path, from the return array`, function() {
            expect(dirsAtPath).to.not.contain(`mock-child-dir`);
        });
        it(`Excludes non-js files contained in the folder at the given path`, function() {
            expect(dirsAtPath).to.not.contain(`file3.ts`);
            expect(dirsAtPath).to.not.contain(`file4.md`);
        });
    });

    describe(`function isFileInDir`, function() {
        expectFunctionExists(file.isFileInDir);
        it(`returns true if given filename exists in dir at given path, & false if it doesn't`, function() {
            expect(file.isFileInDir(path.join(rootPath, `test/mock/mock-dir-of-files`), `file2.js`))
                .to.be.true;
            expect(
                file.isFileInDir(path.join(rootPath, `test/mock/mock-dir-of-files`), `file12.ts`)
            ).to.be.false;
        });
    });

    describe(`function isAbsPath`, function() {
        expectFunctionExists(file.isAbsPath);
        it(`returns false if given string is an relative path`, function() {
            expect(file.isAbsPath(`src/some/file.tsx`)).to.be.false;
            expect(file.isAbsPath(`.gitignore`)).to.be.false;
            expect(file.isAbsPath(`node_modules`)).to.be.false;
            expect(file.isAbsPath(`index.ts`)).to.be.false;
        });
        it(`returns true if given string is an absolute path`, function() {
            expect(file.isAbsPath(path.join(rootPath, `test/mock/mock-dir-of-files`))).to.be.true;
            expect(file.isAbsPath(`/`)).to.be.true;
            expect(file.isAbsPath(`/some/made/up/route.html`)).to.be.true;
            expect(file.isAbsPath(`/should_also_work.scss`)).to.be.true;
        });
    });

    // Remove mock file on completion of all file tests
    after(function() {
        unlinkSync(path.join(exampleFilePath));
    });
});
