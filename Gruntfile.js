'use strict';

var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var gifsicle = require('imagemin-gifsicle');

/* install specific versions:
imagemin-pngquant@4.2.2
imagemin-mozjpeg@5.1.0
imagemin-gifsicle@4.2.0
*/

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'  // key task is part of value grunt-module
  });

  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-pngmin');

  // Define the configuration for all the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Make sure code styles are up to par and there are no obvious mistakes
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
    pngmin: {
      compile: {
        options: {
          concurrency: 8,             // specify how many exucutables get spawned in parallel
          ext: '.png',
          force: true,               // use .png as extension for the optimized files
          quality: '65-80',           // output quality should be between 65 and 80 like jpeg quality
          speed: 1,                  // pngquant should be as fast as possible
          iebug: true                 // optimize image for use in Internet Explorer 6
        },
        files: [
          {
            src: 'app/images/*.png',
            dest: 'dist/images/'
          }
        ]
      }
    },
    imagemin:{
      png: {
        options: {
          optimizationLevel: 7,
          // progressive: true,
          use: [pngquant(), mozjpeg(), gifsicle()]
        }, // options
        files: [{
          expand: true,
          cwd: 'app/images/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'dist/images/'
        }] // files
      } // target
    }, // imagemin
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
      },
      imageopti: {
        files: ['app/images/*.*'],
        tasks: ['imagemin']
      } // imageopti
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

  grunt.registerTask('build', ['clean','useminPrepare','concat','cssmin','uglify','copy','filerev','usemin','imagemin','pngmin']); // preforms tasks
  grunt.registerTask('serve', ['build','connect:dist','watch']); // $ grunt serve
  grunt.registerTask('default', ['build']);   // $ grunt (specified $ grunt build)
};
