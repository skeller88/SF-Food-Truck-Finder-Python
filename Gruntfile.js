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
                    'app/css/main.css': 'app/less/main.less'
                }
            }
        },
        mochaTest: {
          test: {
            options: {
              reporter: 'spec',
              timeout: 5000
            },
            src: ['tests/src/**/*.js']
          }
        },
        watch: {
            files: ['app/less/*.less', 'src/**/*.js'],
            tasks: ['less', 'mochaTest']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('heroku', ['less']);
};