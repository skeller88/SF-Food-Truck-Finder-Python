module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'app/css/main.css': 'app/less/main.less'
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
            files: ['app/less/*.less'],
            tasks: ['less']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};