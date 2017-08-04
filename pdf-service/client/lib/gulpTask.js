const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const less = require('gulp-less');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const change = require('gulp-change');
const inline = require('gulp-inline');
const inlineAssets = require('./gulp-inline-assets');
const cheerio = require('cheerio');
const path = require('path');

function addBundleStylesheet(file, stylesheetPath) {
  const $ = cheerio.load(file);
  $('head').append(`<link rel="stylesheet" href="${stylesheetPath}" />`);
  return $.html();
}

module.exports = ({ htmlFolder, stylesFolder, outFolder }) => {
  const outPath = path.join(outFolder, `html_to_pdf_out_${Date.now()}`);

  gulp.task('concat-css', () => {
    const lessStream = gulp.src(path.join(stylesFolder, '/**/*.less'))
      .pipe(less())
      .pipe(inlineAssets({
        extensions: ['woff', 'woff2'],
      }))
      .pipe(concat('less-files.less'));

    const scssStream = gulp.src(path.join(stylesFolder, '/**/*.scss'))
      .pipe(sass())
      .pipe(inlineAssets({
        extensions: ['woff', 'woff2'],
      }))
      .pipe(concat('scss-files.scss'));

    const cssStream = gulp.src(path.join(stylesFolder, '/**/*.css'))
      .pipe(inlineAssets({
        extensions: ['woff', 'woff2'],
      }))
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
        disabledTypes: ['svg', 'js'],
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

