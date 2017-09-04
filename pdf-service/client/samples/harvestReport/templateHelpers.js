module.exports = {
  currency: Handlebars => (amount) => {
    const htmlData = parseFloat(Handlebars.escapeExpression(amount))
      .toFixed(2)
      .replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}` : c))
      .concat(' USD');

    return new Handlebars.SafeString(htmlData);
  },
  hours: Handlebars => (hours) => {
    const htmlData = parseFloat(Handlebars.escapeExpression(hours)).toFixed(2);

    return new Handlebars.SafeString(htmlData);
  },
};
