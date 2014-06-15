module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            scss: './sass',
            css: './public/stylesheets/',
            js: ['*.js', 'models/*', 'public/js/*.js', 'public/js/lib/*.js', 'test/*.js', 'lib/**/*.js']
        },

        jshint: {
            src: '<%= paths.js %>'
        },

        jsbeautifier: {
            beautify: {
                src: '<%= paths.js %>'
            },
            check: {
                src: '<%= paths.js %>',
                options: {
                    mode: 'VERIFY_ONLY'
                }
            }
        },

        sass: {
            admin: {
                files: {
                    '<%= paths.css %>/main.css': '<%= paths.scss %>/main.scss',
                }
            }
        },

        watch: {
            sass: {
                files: './sass/**/*.scss',
                tasks: ['sass:admin']
            },
            js: {
                files: '<%= paths.js %>',
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['jshint', 'jsbeautifier:check', 'sass:admin']);
    grunt.registerTask('beautify', ['jsbeautifier:beautify']);
};
