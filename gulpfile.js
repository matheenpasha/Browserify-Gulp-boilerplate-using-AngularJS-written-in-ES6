/**
 * Project gulp file
 * for all the UI task automation
 */

// include gulp and all the plug-ins


// var imagemin = require('gulp-imagemin');

//var karma = require('karma').server;

var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var server = require('gulp-server-livereload');
var del = require('del');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

//get the config file
var config = require('./config');

// register all the tasks


// jshint task to check the JS
gulp.task('jshint', function (){
  return gulp.src('./app/src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


var bundler;
function getBundler() {
  if (!bundler) {
    bundler = browserify(config.entryFile, { debug: config.browserify.debug });
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir));
}

//strip all console logs and minify
gulp.task('minify-scripts', ['clean-min'], function (){
  return gulp.src(config.outputDir + config.outputFile)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(config.minifiedDir))
    .on('minification-error', function(err) { console.log('Error: ' + err.message); });
});

// Task to build transpile, clean all the js files

gulp.task('bundle-scripts', [], function() {
  return bundle();
});



// CSS concat, auto-prefix and minify
gulp.task('less', ['clean-styles'], function (){
  return gulp.src('./app/src/styles/*.less')
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssnano())
    .pipe(gulp.dest('./app/build/styles/'));
});

// minify new images
gulp.task('compressImages', ['clean-images'], function (){
  var imgSrc = './app/src/images/**/*',
    imgDst = './app/build/images';

  return gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('build-scripts', function(cb) {
  runSequence('jshint',
              'bundle-scripts',
              'minify-scripts',
              cb);
});

gulp.task('build', function(cb) {
  runSequence('less',
              'jshint',
              'clean-scripts',
              'clean-min',
              'bundle-scripts',
              'minify-scripts',
              'minify-tmpl',
              cb);
});

gulp.task('minify-tmpl', function() {
  return gulp.src('./app/src/scripts/templates/*.html')
    .pipe(gulp.dest('./app/build/templates'));
});

// a simple server for testing the front end code
gulp.task('serve', ['build', 'watch'], function (){
  gulp.src('./')
    .pipe(server({
      port: 4001,
      directoryListing: false,
      open: config.server.openBrowser,
      log: 'debug',
      defaultFile: './index.html'
    }));
});

//Cleaning tasks...
gulp.task('clean-scripts', function (){
  return del(['app/build/scripts/*']).then(function(paths){
  	console.log('Deleted JS files in build folder');
  });
});

gulp.task('clean-min', function (){
  return del(['app/build/minified/*']).then(function(paths){
  	console.log('Deleted minified JS files in build folder');
  });
});

gulp.task('clean-styles', function (cb){
  return del(['app/build/style/*.css']).then(function(paths){
  	console.log('Deleted css files in build folder');
  });
});


gulp.task('clean-images', function (cb){
  del([
    'build//images/*'
  ], cb);
  return del(['app/build/images/**/*']).then(function(paths){
  	console.log('Deleted images in build folder');
  });
});




gulp.task('watch', function (){
  gulp.watch('./app/src/scripts/**/*.js', ['build-scripts']);
  //gulp.watch('./src/images/**/*', ['compressImages']);
  gulp.watch('./app/src/scripts/templates/*.html', ['minify-tmpl']);
  gulp.watch('./app/src/styles/*.less', ['less']);
});


//make all task default
gulp.task('default', ['build']);


/**
 * Run test once and exit
 */
// gulp.task('test', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done);
// });
