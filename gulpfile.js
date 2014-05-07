var gulp = require('gulp');
var component = require('gulp-component-builder');

gulp.task('scripts', function() {
  return gulp.src('component.json')
    .pipe(component.scripts(scriptsPlugins))
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
  return gulp.src('component.json')
    .pipe(component.styles(stylesPlugins))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['component.json', 'lib/**/*.js', 'src/**/*.js'], ['scripts']);
  gulp.watch(['component.json', 'lib/**/*.less', 'src/**/*.less'], ['styles']);
});

gulp.task('build', ['scripts', 'styles']);
gulp.task('default', ['build']);

var less = require('builder-less');
var minifier = require('builder-html-minifier');

function scriptsPlugins(builder, options) {
  builder
    .use('scripts', component.plugins.js())
    .use('json', component.plugins.json());

  builder.use('templates', minifier({
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true
  }));
}

function stylesPlugins(builder, options) {
  builder.use('styles', less());
}
