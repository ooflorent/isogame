var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('styles', function() {
  return gulp.src('client/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('client/css'));
});
