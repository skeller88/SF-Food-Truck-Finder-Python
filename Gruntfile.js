module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            'app/index.js': ['app/js/index.js']
        },
        less: {
            development: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'dist/css/main.css': 'app/less/main.less'
                }
            },
            production: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'dist/css/main.css': 'app/less/main.less'
                }
            }
        },
        watch: {
            files: ['app/less/*.less', 'app/js/**/*.js'],
            tasks: ['browserify', 'less']
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};