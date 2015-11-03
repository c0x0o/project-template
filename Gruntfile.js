module.exports = function(grunt) {
    var get = function(name, dist, files) {
        var libs = {
            requirejs: {
                dist: '',
                files: 'require.js'
            },
            jquery: {
                dist: 'dist',
                files: 'jquery.min.js'
            },
            avalon: {
                dist: 'dist',
                files: 'avalon.shim.min.js'
            },
            webuploader: {
                // name used to map webuploader to fex-webuploader
                name: 'fex-webuploader',
                dist: 'dist',
                files: ['webuploader.min.js', 'Uploader.swf', 'webuploader.css']
            },
            dialog: {
                name: 'art-dialog',
                dist: 'dist',
                files: ['dialog-min.js', '../css/ui-dialog.css']
            }
        };
        var bowerfy = function(name, dist, files) {
            return {
                expand: true,
                cwd: 'bower_components/'+name+'/'+dist,
                filter: 'isFile',
                src: files,
                dest: 'src/static/packages/'+name,
                flatten: true
            }
        };
        var module = {};

        if (name in libs) {
            if (!libs[name].name) {
                libs[name].name = name;
            }
            module = libs[name];

            return bowerfy(module.name, module.dist, module.files);
        } else {
            return bowerfy(name, dist, files);
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            bower: {
                files: [
                    // get('requirejs'),
                    // get('jquery'),
                    // get('avalon'),
                ]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: [
                        '**/*',
                        '!static/css/**/*',
                        '!static/sass/**/*',
                        '!static/js/**/*',
                    ],
                    dest: 'release'
                }]
            }
        },
        sass: {
            complie: {
                files: [{
                    expand: true,
                    cwd: 'src/static/sass',
                    src: ['**/*.scss'],
                    dest: 'src/static/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'src/static/css',
                    src: ['**/*.css'],
                    dest: 'release/static/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'src/static/js',
                    src: ['**/*.js'],
                    dest: 'release/static/js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', 'do nothing', function() {
        grunt.log.ok('default task won\'t do anything, "grunt --help" for more available tasks.');
    });
    grunt.registerTask('init', 'init the project', ['copy:bower']);
    grunt.registerTask('dev', 'complie task and other similar tasks', ['sass:complie']);
    grunt.registerTask('release', 'release a version from src/', ['copy:release', 'cssmin:release', 'uglify:release']);
}
