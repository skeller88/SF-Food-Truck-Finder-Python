module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ['app/static/less']
                },
                files: {
                    'app/static/css/main.css': 'app/static/less/main.less'
                }
            },
            production: {
                options: {
                    paths: ['app/static/less']
                },
                files: {
                    'app/static/css/main.css': 'app/static/less/main.less'
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
            files: ['app/static/less/*.less', 'src/**/*.js'],
            tasks: ['less', 'mochaTest']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('heroku', ['less']);
};