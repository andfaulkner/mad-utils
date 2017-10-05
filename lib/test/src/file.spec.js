"use strict";
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var app_root_path_1 = require("app-root-path");
var fs_extra_promise_1 = require("fs-extra-promise");
var node_1 = require("../../node");
/********************************* IMPORT FILE MODULE FOR TESTING *********************************/
var chai_1 = require("chai");
var node_2 = require("../../node");
var node_3 = require("../../node");
var fileModule = require("../../src/node/file");
var docObjModel = node_2.m_.file;
/********************************************* CONFIG *********************************************/
var exampleFilePath = './random-example-file';
/********************************************* TESTS **********************************************/
describe("file sub-module", function () {
    node_1.expectNonEmptyObjectExists(node_2.file, 'file (from shared/base export)');
    node_1.expectNonEmptyObjectExists(node_2.m_.file, 'file (from m_ top-level namespace)');
    node_1.expectNonEmptyObjectExists(fileModule, 'file (import all from file.ts file)');
    node_1.expectNonEmptyObjectExists(node_3.file, 'file (from Node export)');
    describe("function isDir", function () {
        node_1.expectFunctionExists(node_2.file.isDir);
        it("should return true if passed a path to a directory", function () {
            chai_1.expect(node_2.file.isDir(path.join(app_root_path_1.path, 'node_modules'))).to.be.true;
        });
        it("should return false if passed a path to a file or nonexistent inode", function () {
            chai_1.expect(node_2.file.isDir(path.join(app_root_path_1.path, 'no_file_or_dir_w_this_name.ext'))).to.be.false;
        });
    });
    describe("function replaceInFile", function () {
        node_1.expectFunctionExists(node_2.file.replaceInFile);
        it("Replaces lin", function () {
            // Build a mock file for this test
            fs_extra_promise_1.writeFileSync(exampleFilePath, "line1\nline2\nline3\nlineZZZ\nline5");
            node_2.file.replaceInFile(exampleFilePath, 'lineZZZ', 'line4');
            var exampleFileContent = fs_extra_promise_1.readFileSync(exampleFilePath).toString();
            chai_1.expect(exampleFileContent).to.match(/line4/);
            chai_1.expect(exampleFileContent).to.not.match(/lineZZZ/);
        });
    });
    describe("function pathFromRoot", function () {
        node_1.expectFunctionExists(node_2.file.pathFromRoot);
        it("should return absolute path of mad-utils top-level dir (since it's not being " +
            "consumed by a project when in development) if given blank string", function () {
            var madUtilsDirPath = node_2.file.pathFromRoot('');
            chai_1.expect(node_2.file.pathFromRoot('')).to.match(/^\/[^\/]+\/.*\/mad-utils$/);
        });
        it("should return path relative to mad-utils route with given " +
            "string arg joined to the end.", function () {
            chai_1.expect(node_2.file.pathFromRoot('src/node')).to.match(/^\/[^\/]+\/.*\/mad-utils\/src\/node$/);
        });
    });
    describe('function wasRunAsScript', function () {
        node_1.expectFunctionExists(node_2.file.wasRunAsScript);
        it("should return false if run here, because this file was run by mocha, not as a script", function () {
            chai_1.expect(node_2.file.wasRunAsScript(__filename, process.argv, 'file.spec.ts')).to.be.false;
        });
    });
    describe("function getJsFilesInDir", function () {
        var fullPath;
        var dirsAtPath;
        before(function () {
            fullPath = path.join(app_root_path_1.path, 'test/mock/mock-dir-of-files');
            dirsAtPath = node_2.file.getJsFilesInDir(fullPath);
        });
        node_1.expectFunctionExists(node_2.file.getJsFilesInDir);
        it("returns array of all js files in the directory at given path", function () {
            chai_1.expect(dirsAtPath).to.contain('file1.js');
            chai_1.expect(dirsAtPath).to.contain('file2.js');
            chai_1.expect(dirsAtPath).to.contain('file5.js');
        });
        it("Excludes dirs contained in the folder at the given path, from the return array", function () {
            chai_1.expect(dirsAtPath).to.not.contain('mock-child-dir');
        });
        it("Excludes non-js files contained in the folder at the given path", function () {
            chai_1.expect(dirsAtPath).to.not.contain('file3.ts');
            chai_1.expect(dirsAtPath).to.not.contain('file4.md');
        });
    });
    describe('function isFileInDir', function () {
        node_1.expectFunctionExists(node_2.file.isFileInDir);
        it("returns true if given filename exists in dir at given path, & false if it doesn't", function () {
            chai_1.expect(node_2.file.isFileInDir(path.join(app_root_path_1.path, 'test/mock/mock-dir-of-files'), 'file2.js')).to.be.true;
            chai_1.expect(node_2.file.isFileInDir(path.join(app_root_path_1.path, 'test/mock/mock-dir-of-files'), 'file12.ts')).to.be.false;
        });
    });
    describe('function isAbsPath', function () {
        node_1.expectFunctionExists(node_2.file.isAbsPath);
        it("returns false if given string is an relative path", function () {
            chai_1.expect(node_2.file.isAbsPath('src/some/file.tsx')).to.be.false;
            chai_1.expect(node_2.file.isAbsPath('.gitignore')).to.be.false;
            chai_1.expect(node_2.file.isAbsPath('node_modules')).to.be.false;
            chai_1.expect(node_2.file.isAbsPath('index.ts')).to.be.false;
        });
        it("returns true if given string is an absolute path", function () {
            chai_1.expect(node_2.file.isAbsPath(path.join(app_root_path_1.path, 'test/mock/mock-dir-of-files'))).to.be.true;
            chai_1.expect(node_2.file.isAbsPath('/')).to.be.true;
            chai_1.expect(node_2.file.isAbsPath('/some/made/up/route.html')).to.be.true;
            chai_1.expect(node_2.file.isAbsPath('/should_also_work.scss')).to.be.true;
        });
    });
    // Remove mock file on completion of all file tests.
    after(function () {
        fs_extra_promise_1.unlinkSync(path.join(exampleFilePath));
    });
});
//# sourceMappingURL=file.spec.js.map