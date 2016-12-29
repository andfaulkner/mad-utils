#!/usr/bin/env ruby

class Checker
    def initialize()
        @linecount = 0
        @errors_found = 0
        @packageJsonTitleShown = false
        spacer
    end

    def check_package_json
        File.open(File.join(File.dirname(__FILE__), *%w[../package.json]), 'r').each_line do |line|
            @linecount = @linecount + 1
            check_for_package_json_pair(line, '"name"', '"node-typescript-module-boilerplate"',
                'Title')
            check_for_package_json_pair(line, '"url"', '/node-typescript-module-boilerplate.git"',
                'Git repo URL')
            check_for_package_json_pair(line, '"url"', 'node-typescript-module-boilerplate/issues"',
                'Issues URL')
            check_for_package_json_pair(line, '"homepage"',
                'node-typescript-module-boilerplate#readme"', 'Homepage URL')
            check_for_package_json_pair(line, '/****', "TODO ADD KEYWORDS", "Keywords")
        end.close
        @linecount = 0
    end

    def end_display
        spacer
        if @errors_found == 0
            puts "No errors found - no residual boilerplate remains"
        elsif @errors_found == 1 
            puts "1 error found"
        else
            puts "#{@errors_found} errors found"
        end
        spacer
    end

    private
        def spacer
            puts '-------------------------------------------------------------'
        end

        def check_for_package_json_pair(line, key, val, name = key.capitalize)
            if line.include?(key) && line.include?(val)
                unless @packageJsonTitleShown
                    @packageJsonTitleShown = true
                    puts '** package.json **'
                end
                puts "[line #{@linecount}] : #{name} not defined"
                @errors_found = @errors_found + 1
            end
        end
end

checker = Checker.new

checker.check_package_json
checker.end_display
