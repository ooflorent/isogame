var gulp = require('gulp');
var component = require('gulp-component-builder');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

var htmlminOptions = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeOptionalTags: true
};

gulp.task('index', function() {
  return gulp.src('index.html')
    .pipe(htmlmin(htmlminOptions))
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
  return gulp.src('component.json')
    .pipe(component.scripts(scriptsPlugins))
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
  return gulp.src('component.json')
    .pipe(component.styles(stylesPlugins))
    .pipe(cssmin())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['index.html'], ['index']);
  gulp.watch(['component.json', 'lib/**/*.js', 'src/**/*.js'], ['scripts']);
  gulp.watch(['component.json', 'lib/**/*.less', 'src/**/*.less'], ['styles']);
});

gulp.task('build', ['index', 'scripts', 'styles']);
gulp.task('default', ['build']);

var less = require('builder-less');
var minifier = require('builder-html-minifier');

function scriptsPlugins(builder, options) {
  builder
    .use('scripts', component.plugins.js())
    .use('json', component.plugins.json())
    .use('templates', minifier(htmlminOptions));
}

function stylesPlugins(builder, options) {
  builder
    .use('styles', less());
}
