const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const flatten = require('gulp-flatten');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const ghPages  = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();

gulp.task('transpile', () =>
  gulp.src('src/*.js')
  .pipe(babel({
    presets: ['es2015-node5']
  }))
  .pipe(flatten())
  //.pipe(minify())
  //.pipe(uglify())
  .pipe(gulp.dest('./'))
  .pipe(gulp.dest('./bower_components/web-component-test'))
);

gulp.task('copy',() =>
  gulp.src('src/*.html')
  .pipe(gulp.dest('./'))
  .pipe(gulp.dest('./bower_components/web-component-test'))
);

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);

  gulp.watch("src/**").on("change", gulp.series('transpile', 'copy', browserSync.reload));
  gulp.watch("demo/**").on("change", gulp.series(browserSync.reload));

});

gulp.task('pages', function() {
  return gulp.src(["./index.html","./demo/*","./test/*", "./bower_components/**/*"],{base: '.'})
  .pipe(ghPages());
});

gulp.task('build', gulp.series('transpile', 'copy'));
gulp.task('pages-deployment', gulp.series('build', 'pages'));

gulp.task('default', gulp.series('build', 'serve'));
