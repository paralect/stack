const fetch = require('isomorphic-fetch');

module.exports.fetchPdf = (html, wkhtmltopdfOptions, serverUrl) => {
  return fetch(`${serverUrl}/pdf/html`, {
    method: 'POST',
    body: JSON.stringify({
      wkhtmltopdfOptions,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
};
