const fetch = require('isomorphic-fetch');

module.exports.fetchPdf = (html, wkhtmltopdfOptions) => {
  return fetch('http://localhost:3000/pdf/html', {
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
