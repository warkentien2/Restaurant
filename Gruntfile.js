'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'  // key task is part of value grunt-module
  });

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
    	  jshintrc: '.jshintrc',	// .jshintrc: json file with JSHint config
	      reporter: require('jshint-stylish')
      },
      all: {
	      src: ['Gruntfile.js', 'app/scripts/{,*/}*.js'] // list of files to check
      }
    },
    useminPrepare:{
      html: 'app/menu.html',
      options:{ dest: 'dist' }
    },
    // Concat
    concat: {
      options: {
        separator: ';'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    // Uglify
    uglify: {
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    cssmin: {
      dist: {}
    },
    filerev:{
      options:{
	       encoding: 'utf8', algorithm: 'md5', length: 20	// length of number
      },
      release:{
	       files: [{ src:['dist/scripts/*.js','dist/styles/*.css'] }]
      }
    },
    usemin:{
      html: ['dist/*.html'],
      css: ['dist/styles/*.css'],
      options:{
        assetsDirs: ['dist','dist/styles']
      }
    },
    copy:{
      dist:{
        cwd: 'app',
        src: ['**','!styles/**/*.css','!scripts/**/*.js'],
        dest: 'dist',
        expand: true
      }
    },
    fonts: {
      files: [
        {
          // for bootstrap fonts
          expand: true,
          dot: true,
          cwd: 'bower_components/bootstrap/dist',
          src: ['fonts/*.*'],
          dest: 'dist'
        }, {
          // for font-awesome
          expand: true,
          dot: true,
          cwd: 'bower_components/font-awesome',
          src: ['fonts/*.*'],
          dest: 'dist'
        }
      ]
    },
    watch:{
      copy:{
        files:['app/**','!app/**/*.css','!app/**/*.js'],
        tasks: ['build']
      },
      scripts: {
        files: ['app/scripts/app.js'],
        tasks: ['build']
      },
      styles: {
        files: ['app/styles/mystyles.css'],
        tasks: ['build']
      },
      livereload:{
        options:{ livereload: '<%= connect.options.livereload %>' },
        files: ['app/{,*/}*.html','.tmp/styles/{,*/}*.css','app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
      }
    },
    connect:{
      options:{
        port: 9000, hostname: 'localhost', livereload: 35729
      },
      dist:{
        options:{
          open: true,
          base:{
            path: 'dist',
            options: {index: 'menu.html', maxAge: 300000 }
          }
        }
      }
    },
    clean:{
      build:{
        src: ['dist/']
      }
    }
  });

  grunt.registerTask('build', ['clean','jshint','useminPrepare','concat','cssmin','uglify','copy','filerev','usemin']); // preforms tasks
  grunt.registerTask('serve', ['build','connect:dist','watch']); // $ grunt serve
  grunt.registerTask('default', ['build']);   // $ grunt (specified $ grunt build)
};
