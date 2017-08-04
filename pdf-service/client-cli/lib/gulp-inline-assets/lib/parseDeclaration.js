const fs = require('fs');
const path = require('path');
const url = require('url');
const needle = require('needle');
const mime = require('mime');

const URL_REGEX = /url\(\s*(?:"|')?(.+?)(?:"|')?\s*\)/;
const FORMAT_REGEX = /format\(\s*(?:"|')?(.+?)(?:"|')?\s*\)/;

function formatExternalUrl(str) {
  return str.replace(/^\/\//, 'https://');
}

function formatLocalUrl(file, str) {
  // Fonts generally contain a hash/query string, so we'll remove them before we read that file
  const urlObj = url.parse(str);
  delete urlObj.hash;
  delete urlObj.search;
  delete urlObj.query;

  return path.resolve(path.dirname(file.path), url.format(urlObj));
}

function read(file, assetUrl, format, cb) {
  let stream;
  let type;
  const contents = [];

  if (assetUrl) {
    if (/^(?:http|\/\/)/.test(assetUrl)) {
      stream = needle.get(formatExternalUrl(assetUrl), {
        compressed: true,
        rejectUnauthorized: false,
      }, (err, response) => {
        if (err) {
          return cb(new Error(`Could not fetch ${assetUrl}`));
        }

        // Validate the status code we received
        const status = response.statusCode;
        if (status < 200 || status > 299) {
          return cb(new Error(`Could not fetch ${assetUrl} - status ${status}`));
        }

        type = response.headers['content-type'];

        return type;
      });
    } else {
      stream = fs.createReadStream(formatLocalUrl(file, assetUrl));
      stream.on('error', () => {
        cb(new Error(`Could not read file: ${assetUrl}`));
      });

      // Use the mime type based in the format first, and then the file extension, if we're
      // not dealing with a @font-face rule
      type = mime.lookup(format || assetUrl);
    }
  }

  stream.on('data', (chunk) => {
    contents.push(chunk);
  });

  stream.on('end', () => {
    // Use a timeout to ensure that needle's callback will run before this function
    setTimeout(() => {
      cb(null, {
        type,
        contents: Buffer.concat(contents),
      });
    }, 0);
  });
}

function parseDeclaration(file, decl, options, cb) {
  let count = 0;
  let valueParts = decl.value;
  const finish = function () {
    count += 1;
    if (count === valueParts.length) {
      Object.assign(decl, { value: valueParts.join(',') });
      cb();
    }
  };

  if (decl.property !== 'src') {
    return cb();
  }

  valueParts = valueParts.split(',');
  return valueParts.forEach((part, i) => {
    let assetUrl;
    let format;

    assetUrl = part.trim().match(URL_REGEX);
    format = part.match(FORMAT_REGEX);

    // If no URL is specified, let's ignore it
    if (!assetUrl) {
      return finish();
    }

    assetUrl = assetUrl[1].trim();
    format = format ? format[1].trim() : null;

    if (options.extensions.indexOf(format) === -1) {
      return finish();
    }

    return read(file, assetUrl, format, (err, result) => {
      if (err) {
        return options.ignoreErrors !== true ? cb(err) : finish();
      }

      const data = `data:${result.type};base64,${result.contents.toString('base64')}`;
      valueParts[i] = part.replace(assetUrl, data);
      return finish();
    });
  });
}

module.exports = parseDeclaration;
