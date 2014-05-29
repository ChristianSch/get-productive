module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            scss: './sass',
            css: './public/stylesheets/',
        },

        jshint: {
            src: ['*.js', 'models/*', 'public/js/*.js', 'public/js/lib/*.js']
        },

        jsbeautifier: {
            beautify: {
                src: ['*.js', 'models/*', 'public/js/*.js', 'public/js/lib/*.js', 'test/*.js']
            },
            check: {
                src: ['*.js', 'models/*', 'public/js/*.js', 'public/js/lib/*.js', 'test/*.js'],
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
                files: ['*.js', 'models/*', 'public/js/*.js', 'public/js/lib/*.js', 'test/*.js'],
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
