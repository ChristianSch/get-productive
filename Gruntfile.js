module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            scss: './sass',
            css: './public/stylesheets/',
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
                tasks: [ 'sass:admin' ]
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    grunt.registerTask( 'default', ['sass:admin'] );
};
