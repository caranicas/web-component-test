const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const flatten = require('gulp-flatten');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
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
  .pipe(gulp.dest('./bower_components/pull-req'))
);

gulp.task('copy',() =>
  gulp.src('src/*.html')
  .pipe(gulp.dest('./'))
  .pipe(gulp.dest('./bower_components/pull-req'))
);


var ghPages  = require('gulp-gh-pages');

gulp.task('pages-move', (done) => {
   gulp.src("./index.html")
  .pipe(gulp.dest('./pages-build'))

  gulp.src("./demo/*")
 .pipe(gulp.dest('./pages-build/demo'))

   gulp.src("./test/*")
  .pipe(gulp.dest('./pages-build/test/'))

  gulp.src("./bower_components/*")
 .pipe(gulp.dest('./pages-build/bower_components'))

  done();
});

gulp.task('serve',(done) => {

  browserSync.init({
    server: {
        baseDir: "./"
    }
  },done);


  gulp.watch("src/**").on("change", gulp.series('transpile', 'copy', browserSync.reload));
});


gulp.task('deploy', function() {
  return gulp.src("./pages-build/**/*")
    .pipe(ghPages({force:true}));
});

gulp.task('deploy-all', gulp.series('pages-move','deploy'));
gulp.task('build', gulp.series('transpile', 'copy'));
gulp.task('default', gulp.series('build', 'serve'));



//var deploy  = require('gulp-gh-pages');


// gulp.task('publish', () => {
//   // ghpages.publish(__dirname)
//   ghpages.publish(path.join(__dirname, 'src'), () =>{ console.log('DONE?') });
// });

// gulp.task('publish', gulp.series('pages'));
//
//  gulp.src("./demo")
//  .pipe(gulp.dest('./publish'));




// LOOK MORE SPACE WHO IS RIGHT? ME I SAY 7 SHAI SAYS 6



// // If you remove this you can remove these deps from the package.json
// var wct = require('web-component-tester');
// var gutil = require('gulp-util');
// gulp.task('test-without-safari', function(done) {
//   wct.test({
//     plugins: {local: ['chrome', 'firefox'], sauce: false}
//   }, function(err) {
//     if (err) {
//       err = new gutil.PluginError('wct', err, {showStack: true});
//     }
//     done(err);
//   });
// });
