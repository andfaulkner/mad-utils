#!/usr/bin/env ruby

class Checker
    def initialize()
        @linecount = 0
        @errors_found = 0
        @title_shown = false
        @current_title = ''
        spacer
        puts "Checking to ensure no boilerplate values remain in the module..."
    end

    def check_package_json
        reset_file_specific_vals('./package.json')
        File.open(File.join(File.dirname(__FILE__), *%w[../package.json]), 'r').each_line do |line|
            @linecount = @linecount + 1
            check_line_has_both_matches(line, '"name"', '"node-typescript-module-boilerplate"',
                'Title not defined')
            check_line_has_both_matches(line, '"url"', '/node-typescript-module-boilerplate.git"',
                'Git repo URL not defined')
            check_line_has_both_matches(line, '"url"', 'node-typescript-module-boilerplate/issues"',
                'Issues URL not defined')
            check_line_has_both_matches(line, '"homepage"',
                'node-typescript-module-boilerplate#readme"', 'Homepage URL not defined')
            check_line_has_both_matches(line, '/****', "TODO ADD KEYWORDS", "Keywords not defined")
        end.close
        reset_file_specific_vals
    end

    def check_index_ts
        reset_file_specific_vals('./index.ts')
        File.open(File.join(File.dirname(__FILE__), *%w[../index.ts]), 'r').each_line do |line|
            @linecount = @linecount + 1
            check_line_has_both_matches(line, 'export interface', 'INodeModuleBoilerplate',
                'default interface name still used')
            check_line_has_both_matches(line, 'nodeModuleBoilerplatePlaceholder:', 'string',
                'default property still used in interface')
            check_line_has_both_matches(line, 'const',
                'nodeModuleBoilerplateExport', 'export object still has default settings')
            check_line_has_both_matches(line, 'nodeModuleBoilerplatePlaceholder:',
                '\'placeholder\'', 'default property still set in export object')
            check_line_has_both_matches(line, 'export',
                '{ nodeModuleBoilerplateExport }', 'default object still being exported')
            check_line_has_both_matches(line, 'nodeModuleBoilerplatePlaceholderFn',
                '', 'Default function still defined')
        end.close
        reset_file_specific_vals
    end

    def check_test_file
        if File.exists?(File.join(File.dirname(__FILE__), *%w[../test/module-boilerplate.test.js]))
            puts "--------------------"
            puts "** ./test folder **"
            puts "[./test] : default test file found: module-boilerplate.test.js"
        end
    end

    def check_readme
        reset_file_specific_vals('./README.md')
        File.open(File.join(File.dirname(__FILE__), *%w[../README.md]), 'r').each_line do |line|
            @linecount = @linecount + 1
            if (@linecount == 1 || @linecount == 2 || @linecount == 3)
                check_line_has_both_matches(line.downcase, '', '# module boilerplate',
                'README title not changed')
            end
            check_line_has_both_matches(line, 'console.log', '__module_boilerplate_usage__',
                'Usage example not changed')
            check_line_has_both_matches(line, 'baseline for new standalone npm module projects',
                '', 'Module summary description not changed')
            check_line_has_both_matches(line, '', '### Third-level heading',
                'Heading placeholder not removed')
            check_line_has_both_matches(line, '', 'someFunctionInModuleBoilerplate',
                'API function example not removed or changed')
            check_line_has_both_matches(line, '', '(varName: typeEg_string): returnTypeEg_number',
                'API function definition example not removed or changed')
            check_line_has_both_matches(line, '', 'anotherModuleBoilerplateFunction',
                'API function example not removed or changed')
        end
        reset_file_specific_vals
    end

    def end_display
        spacer
        if @errors_found == 0
            puts "No residual boilerplate values remaining"
        elsif @errors_found == 1 
            puts "1 boilerplate value remaining"
        else
            puts "#{@errors_found} boilerplate values remaining"
        end
        spacer
    end

    private
        def spacer
            puts '------------------------------------------------------------------'
        end

        def check_line_has_both_matches(line, key, val, error = key.capitalize)
            if line.include?(key) && line.include?(val)
                unless @title_shown
                    @title_shown = true
                    puts "--------------------"
                    puts "** #{@current_title} **"
                end
                puts "[line #{@linecount}] : #{error}"
                @errors_found = @errors_found + 1
            end
        end

        def reset_file_specific_vals(current_title = '')
            @linecount = 0
            @current_title = current_title
            @title_shown = false
        end
end

checker = Checker.new

checker.check_package_json
checker.check_index_ts
checker.check_test_file
checker.check_readme
checker.end_display
