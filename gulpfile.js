var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');

// jshint
gulp.task('jshint', function(){	// first parameter is variable name
  return gulp.src('app/scripts/**/*.js')	// switching camelCase with '-'
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Usemin
gulp.task('usemin', ['jshint'], function(){	// jshint runs
  return gulp.src('./app/menu.html')		// before usemin
  .pipe(usemin({
    css:[minifycss(),rev()],			// rev = file revision
    js:[uglify(),rev()]}))
  .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function(){
  return del(['dist/images']), gulp.src('app/images/**/*')
  .pipe(cache(imagemin({
    optimizationLevel:3, progressive:true, interlaced:true
  })))
  .pipe(gulp.dest('dist/images'))
  .pipe(notify({ message: 'Images task complete' }));
});

// Font-icons                         // just copies them using the pipe
gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
});

// Watch and browserSync
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
      // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']); // if param 1 changes, run param 2

});

gulp.task('browser-sync', ['default'], function () { // switch var name camelCase to '-'
  // files to watch
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "menu.html"
      },
      reloadDelay: 2000
   });  // default = index.html
        // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});     // gulp.watch is a built-in task

// Clean
gulp.task('clean',function(){
  return del(['dist']);		// del is a node_module
});

// Default              // default task builds the distribution folder.
gulp.task('default', ['clean'], function(){
  gulp.start('usemin', 'imagemin', 'copyfonts'); 	// gulp.start built-in
});
