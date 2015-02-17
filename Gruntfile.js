module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            'app/index.js': ['app/js/index.js']
        },
        watch: {
            files: ['app/js/**/*.js'],
            tasks: ['browserify']
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
};