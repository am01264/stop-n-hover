'use strict';

import gulp from 'gulp';
import merge from 'merge-stream';

import fnLoadGulpPlugins from 'gulp-load-plugins';
const $ = fnLoadGulpPlugins();

gulp.task('build', () => {

  const pSource = gulp.src('./StopNHover.js')
    .pipe($.sourcemaps.init())
    .pipe($.rename({basename: 'snh'}))
    .pipe($.babel({
      presets: ['es2015'],
      plugins: ['transform-flow-strip-types']
    }));

  const pNormal = pSource
    // Clone the source stream so further edits can't be applied elsewhere
    .pipe($.clone())
    .pipe($.sourcemaps.write('.'));

  const pMinify = pSource
    .pipe($.uglify())
    .pipe($.rename({extname: '.min.js'}))
    .pipe($.sourcemaps.write('.'));

  return merge(pNormal, pMinify)
    .pipe(gulp.dest('dist'));
});

gulp.task('documentation', () => gulp.src('./StopNHover.js')
  .pipe($.documentation({
    shallow: true,
    format: 'html'
  }))
  .pipe(gulp.dest('docs')));

gulp.task('default', ['build', 'documentation']);
