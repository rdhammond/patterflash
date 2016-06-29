'use strict';

const gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps');

const paths = {
  angular: 'app/angular',
  scriptsDest: 'app/js'
};

gulp.task('clean:js', () => {
  return del([paths.scriptsDest + '**/*'])
});

gulp.task('lint:js', () => {
  return gulp.src(paths.angular + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build:js', ['lint:js', 'clean:js'], () => {
  return gulp.src([
    paths.angular + '/main.js',
    paths.angular + '/**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('patterflash.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scriptsDest));
});

gulp.task('build:js:watch', ['build:js'], () => {
  gulp.watch(paths.angular + '/**/*.js', ['build:js']);
});
