const Renderer = require('koa-handlebars').Renderer;

module.exports = class MailBuilder {
  static render(name, data, options = {}) {
    const {
      layoutsDir = 'templates/build',
      root = 'templates/build',
      viewsDir = __dirname,
      defaultLayout = '_email_layout' } = options;

    const renderer = new Renderer({ layoutsDir, viewsDir, root, defaultLayout });

    return renderer.render(name, data);
  }
};
