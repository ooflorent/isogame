var gulp = require('gulp');
var component = require('gulp-component-builder');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src('component.json')
    .pipe(component.scripts(scriptsPlugins))
    // .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
  return gulp.src('component.json')
    .pipe(component.styles())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['component.json', 'lib/**/*.js', 'src/**/*.js'], ['scripts']);
  gulp.watch(['component.json', 'lib/**/*.css', 'src/**/*.css'], ['styles']);
});

gulp.task('build', ['scripts', 'styles']);
gulp.task('default', ['build']);

var minifier = require('builder-html-minifier');

function scriptsPlugins(builder, options) {
  builder
    .use('scripts', component.plugins.js(opts))
    .use('json', component.plugins.json(opts));

  builder.use('templates', minifier({
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: true
  }));
}
