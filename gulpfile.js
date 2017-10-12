'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
const babel = require('gulp-babel');
const include = require('gulp-include');

gulp.task('sass', function () {
  return gulp.src('./src/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('scripts', () => {
    gulp.src('./src/js/index.js')
        .pipe(include({
          includePaths: [__dirname + "/src/js"]
        }))
          .on('error', console.log)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest("build/js"));
});

gulp.task('scripts:watch', function () {
  gulp.watch('./src/js/**/*.js', ['scripts']);
});

gulp.task('watch', ['scripts:watch', 'sass:watch']);
