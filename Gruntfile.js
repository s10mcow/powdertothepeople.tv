'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        concat: {
            options: {
                banner:
                    'angular.module(\'Kinetix.Widgets.Product\', [\'Kinetix.Controllers.Product\',' +
                                                                 '\'Kinetix.Directives.Product\',' +
                                                                 '\'Kinetix.Services.Product\',' +
                                                                 '\'Kinetix.Templates.Product\']);\n'
            },
            dist: {
                src: ['./scripts/*.js'],
                dest: './dist/productWidget.js'
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'nested',
                    'cache-location': '/tmp/sass-cache'
                },
                files: {
                    './public/css/styles.css': './public/sass/styles.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    'cache-location': '/tmp/sass-cache'
                },
                files: {
                    './public/css/styles.min.css': './public/sass/styles.scss'
                }
            }

        }

    });

    grunt.registerTask('default', [
        'html2js',
        'concat'
    ]);

};