var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var lr = require('gulp-livereload');

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
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
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
  return gulp.src('client/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', 'server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('server', function(next) {
  require('./server').listen(3000, next);
});

gulp.task('watch', ['server'], function() {
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

gulp.task('build', ['index', 'scripts', 'styles', 'lint']);
gulp.task('default', ['clean', 'build']);
