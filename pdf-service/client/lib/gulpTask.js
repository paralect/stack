const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const less = require('gulp-less');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const change = require('gulp-change');
const inline = require('gulp-inline');
const cheerio = require('cheerio');
const path = require('path');

function addBundleStylesheet(file, path) {
  const $ = cheerio.load(file);
  $('head').append(`<link rel="stylesheet" href="${path}" />`);
  return $.html();
}

module.exports = ({ htmlFolder, stylesFolder }) => {
  const outPath = `html_to_pdf_out_${Date.now()}`;
  gulp.task('concat-css', () => {
    if (!stylesFolder) {
      return null;
    }

    const lessStream = gulp.src(path.join(stylesFolder, '*.less'))
      .pipe(less())
      .pipe(concat('less-files.less'));

    const scssStream = gulp.src(path.join(stylesFolder, '*.scss'))
      .pipe(sass())
      .pipe(concat('scss-files.scss'));

    const cssStream = gulp.src(path.join(stylesFolder, '*.css'))
      .pipe(concat('css-files.css'));

    return merge([lessStream, scssStream, cssStream])
      .pipe(concatCss('./styles/bundle.css'))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }))
      .pipe(gulp.dest(outPath));
  });

  gulp.task('inline-css', ['concat-css'], () => {
    return gulp.src(path.join(htmlFolder, '*.html'))
      .pipe(change((file) => {
        if (stylesFolder) {
          return addBundleStylesheet(file, path.resolve(`${outPath}/styles/bundle.css`));
        }
        return file;
      }))
      .pipe(inline({
        disabledTypes: ['svg', 'img', 'js'],
      }))
      .pipe(gulp.dest(`${outPath}/pages`));
  });

  gulp.task('default', ['concat-css', 'inline-css']);

  return new Promise((resolve, reject) => {
    gulp.start('default', (err) => {
      if (err) return reject(err);
      return resolve({
        outHtml: `${outPath}/pages`,
        outPdf: `${outPath}/pdf`,
      });
    });
  });
};

