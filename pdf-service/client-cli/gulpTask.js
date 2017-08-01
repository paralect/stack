const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const inlineCss = require('gulp-inline-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const less = require('gulp-less');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const map = require('map-stream');

module.exports = (folderPath) => {
  gulp.task('concat-css', () => {
    const lessStream = gulp.src(`./${folderPath}/styles/*.less`)
      .pipe(less())
      .pipe(concat('less-files.less'));

    const scssStream = gulp.src(`./${folderPath}/styles/*.scss`)
      .pipe(sass())
      .pipe(concat('scss-files.scss'));

    const cssStream = gulp.src(`./${folderPath}/styles/*.css`)
      .pipe(concat('css-files.css'));

    return merge([lessStream, scssStream, cssStream])
      .pipe(concatCss(`./${folderPath}/styles/bundle.css`))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }))
      .pipe(gulp.dest('./'));
  });

  gulp.task('inline-css', ['concat-css'], () => {
    return gulp.src(`./${folderPath}/*.html`)
      .pipe(inlineCss())
      .pipe(gulp.dest('build/'));
  });

  gulp.task('default', ['concat-css', 'inline-css']);

  return new Promise((resolve, reject) => {
    gulp.start('default', (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

