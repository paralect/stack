Mail service by Paralect
========================
This client service by Paralect. It is using [mailgun node client](https://www.npmjs.com/package/mailgun-js) to send emails.
Also it can help you create new emails templates. It is using handlebars for this.
Let's dive into the docs.

Index
-----
  1. [MailService class](#mailservice-class)
  2. [Commands](#commands)

MailService class
-----------------
To create a MailService class you should provide several params to its constructor
```javascript
const MailService = require('@paralect/mail-service-client');

const mailService = new MailService({
  mode: 'development', // the development mode (can be production or development)
  isSendEmail: false, // you can prevent email sending by this param
  savedEmailHtmlPath: __dirname, // if you want to save your email as html in development mode
  mailgun: {  // configs for https://www.npmjs.com/package/mailgun-js
    apiKey: 'test',
    domain: 'test.info',
  },
  renderConfigs: { // configs for Renderer from https://www.npmjs.com/package/koa-handlebars
    layoutsDir: 'templates/build',
    root: './',
    viewsDir: 'templates/build',
    defaultLayout: '_email_layout',
  },
});
```

After that you are able to run **send** method with several params


**send(templateName, templateData, data = {})**

**templateName** - the template name which can be built by **mail-service-build** command <br />
**templateData** - template data which will be injected to the template <br />
**data** - additional email data (subject, email logo and etc.)


Commands
--------
Mail service provide several commands for developer.

### mail-service-watch

This command is provide two update all changes that you made with your assets.
This will be helpful for developer.
You can start to create you template without any additional
infrastructure and changes in assets automatically regenerate new email template.

```
// Definition
mail-service-watch -e "emailTemplate"  -l "layoutsDir" -r "root" -v "viewsDir" -d "defaultLayout" -t "templateParams"

// Example
mail-service-watch -e ./samples/report-templates/monthly_report/monthly_report.hbs  -l ./samples/report-templates/build/ -r ./ -v ./samples/report-templates/build/ -d _email_layout -t ./samples/templateParams.json
```

Let' describe all params:
 1. **-p or --emailTemplate** - path to your email template.
 2. **-t or --templateParams** - json file that contains template params which will be injected to email.
 3. **-l or --layoutsDir**,**-r or --root**,**-v or --viewsDir**,**-d or --defaultLayout** - this params related to [koa-handlebars renderer]( https://www.npmjs.com/package/koa-handlebars)
### mail-service-build

This command is useful for building your assets to email templates.

```
// Definition
mail-service-build -e "emailTemplates" "emailTemplate" "emailTemplate" "emailTemplate"

// Example
mail-service-build -e ./samples/report-templates/_email_layout/_email_layout.hbs ./samples/report-templates/custom_range_report/custom_range_report.hbs
```

It has got one param **-e or --emailTemplates** which can take multiple params.
These params are source pages for building template result.

That's all folks!

