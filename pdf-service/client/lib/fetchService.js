const request = require('request');

module.exports.fetchPdf = (html, wkhtmltopdfOptions, serverUrl) => {
  return request({
    uri: `${serverUrl}/pdf`,
    method: 'POST',
    body: JSON.stringify({
      wkhtmltopdfOptions,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
