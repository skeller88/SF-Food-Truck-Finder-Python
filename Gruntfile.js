module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'app', src: 'index.html', dest: 'dist'},
                    {expand: true, cwd: 'app', src: 'css/*', dest: 'dist'}
                ]
            }
        },
        less: {
            development: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'app/css/main.css': 'app/less/main.less'
                }
            }
        },
        watch: {
            files: ['app/less/*.less'],
            tasks: ['less']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};