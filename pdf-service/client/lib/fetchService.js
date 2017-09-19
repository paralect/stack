const request = require('request');

module.exports.fetchPdf = (html, pdfOptions, headers, serverUrl) => {
  return request({
    uri: `${serverUrl}/pdf`,
    method: 'POST',
    body: JSON.stringify({
      pdfOptions,
      headers,
      html,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
