const css = require('css');
const gutil = require('gulp-util');
const through = require('through2');
const parseDeclaration = require('./lib/parseDeclaration');

function iterate(file, ast, options, cb) {
  let iterable;
  let iterator;
  let count = 0;

  switch (ast.type) {
    case 'font-face':
      iterable = ast.declarations;
      iterator = parseDeclaration;
      break;

    case 'stylesheet':
      iterable = ast.stylesheet.rules;
      iterator = iterate;
      break;
    case 'document':
    case 'host':
    case 'media':
    case 'supports':
      iterable = ast.rules;
      iterator = iterate;
      break;
    default:
  }

  // If there's nothing to iterate, invoke the callback soon
  if (!iterable || !iterable.length) {
    return cb();
  }

  return iterable.forEach((item) => {
    let finished = false;
    iterator(file, item, options, (err) => {
      count += 1;

      // If we aren't finished yet but there's an error or the last iteration happened,
      // then this means we're good to invoke the callback
      if (!finished && (err || count === iterable.length)) {
        cb(err);
        finished = true;
      }
    });
  });
}

module.exports = function (options) {
  return through.obj((file, enc, cb) => {
    let ast;

    if (file.isNull()) {
      return cb(null, file);
    }

    const str = file.contents.toString('utf8');

    try {
      ast = css.parse(str);
    } catch (e) {
      // If some error occurs while parsing the file, we'll not do anything with it
      return cb(null, file);
    }

    return iterate(file, ast, options || {}, (err) => {
      if (err) {
        return cb(new gutil.PluginError('gulp-inline-assets', err.message));
      }

      return cb(null, Object.assign(file, { contents: new Buffer(css.stringify(ast)) }));
    });
  });
};
