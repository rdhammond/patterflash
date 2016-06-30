'use strict';

const gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  sassLint = require('gulp-sass-lint'),
  cssnano = require('gulp-cssnano'),
  sass = require('gulp-sass'),
  run = require('run-sequence');

const paths = {
  angular: 'app/angular',
  js: 'app/js',
  sass: 'app/scss',
  css: 'app/css'
};

gulp.task('clean:js', () => {
  return del([paths.js + '**/*'])
});

gulp.task('clean:sass', () => {
  return del([paths.css + '/**/*.scss']);
})

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('lint:js', () => {
  return gulp.src(paths.angular + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('lint:sass', () => {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('build:js', ['lint:js', 'clean:js'], () => {
  return gulp.src([
    paths.angular + '/main.js',
    paths.angular + '/**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('patterflash.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js));
});

gulp.task('build:sass', ['lint:sass', 'clean:sass'], () => {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(concat('patterflash.min.css'))
    .pipe(gulp.dest(paths.css));
});

gulp.task('build', () => {
    return run(['build:js', 'build:sass']);
});

gulp.task('build:js:watch', ['build:js'], () => {
  gulp.watch(paths.angular + '/**/*.js', ['build:js']);
});

gulp.task('build:sass:watch', ['build:sass'], () => {
  gulp.watch(paths.sass + '/**/*.scss', ['build:sass']);
});

gulp.task('build:watch', ['build:js:watch', 'build:sass:watch']);
