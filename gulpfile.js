var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var lr = require('gulp-livereload');
var requirer = require('./lib/gulp-requirer');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var minify = true;

gulp.task('clean', function() {
  return gulp.src(['build', 'dist'], {read: false})
    .pipe(clean());
});

gulp.task('index', function() {
  return gulp.src('client/index.html')
    .pipe(htmlmin({collapseWhitespace: true, removeAttributeQuotes: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  return gulp.src('client/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(requirer.compile({base: './client/js'}))
    .pipe(concat('main.js'))
    .pipe(requirer.boot({module: 'boot'}))
    .pipe(gulpif(minify, requirer.compress()))
    .pipe(gulpif(minify, uglify()))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  return gulp.src('client/less/main.less')
    .pipe(less({compress: true}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'lib/**/*.js', 'server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('server', function(next) {
  require('./server').listen(3000, next);
});

gulp.task('watch', ['build', 'server'], function() {
  var server = lr();
  var reload = function(watcher) {
    watcher.on('change', function(file) {
      server.changed(file.path);
    });
  };

  reload(gulp.watch('client/index.html', ['index']));
  reload(gulp.watch('client/js/**/*.js', ['scripts']));
  reload(gulp.watch('client/less/**/*.less', ['styles']));
  reload(gulp.watch('server/**/*.js', ['lint']));
});

gulp.task('package', ['build'], function() {
  return gulp.src('dist/**/*')
    .pipe(size({title: 'Raw'}))
    .pipe(zip('client.zip'))
    .pipe(size({title: 'ZIP'}))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['index', 'scripts', 'styles', 'lint']);
gulp.task('default', ['clean', 'build']);
