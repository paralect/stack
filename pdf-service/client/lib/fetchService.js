const fetch = require('isomorphic-fetch');

module.exports.fetchPdf = (html) => {
  return fetch('http://localhost:3000/pdf/html', {
    method: 'POST',
    body: JSON.stringify({
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  });
};
