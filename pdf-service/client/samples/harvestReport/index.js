const PdfService = require('./../../index');

const pdfService = new PdfService({
  serverUrl: 'http://localhost:4444',
  mode: 'development',
});

pdfService.generatePdf(`${__dirname}/src/index.html`, {
  pdfOptions: {
    format: 'Letter',
  },
  templateParams: {
    reportName: 'Where is my money?',
    from: 'Wed Aug 23 2017',
    to: 'Wed Aug 23 2017',
    client: {
      name: 'Artem',
    },
    totalHours: 42,
    totalBillableHours: 24,
    totalUnbillableHours: 18,
    totalAmount: 12000,
    totalUninvoicedAmount: 9000,
    moreThanOneProject: true,
    projects: [{
      projectName: 'Dream',
      totalHours: 12,
      billableHours: 0,
      totalAmount: 0,
    }],
    tasks: [
      {
        taskName: 'Eating',
        totalHours: 12,
        billableHours: 10,
        totalAmount: 1000,
        items: [
          {
            avatar: 'https://pp.userapi.com/c636816/v636816542/3e8f/0lnsqZyYjjo.jpg',
            fullName: 'Artem Kuh',
            totalHours: 43,
            billableHours: 0,
            totalAmount: 10,
          },
        ],
      },
      {
        taskName: 'Sleeping',
        totalHours: 12,
        billableHours: 10,
        totalAmount: 1000,
        items: [
          {
            avatar: 'https://pp.userapi.com/c636816/v636816542/3e8f/0lnsqZyYjjo.jpg',
            fullName: 'Artem Kuh',
            totalHours: 43,
            billableHours: 0,
            totalAmount: 10,
          },
        ],
      },
    ],
    detailsEntries: [
      {
        fullName: 'Full Name',
        totalHours: 12,
        notes: [
          {
            spentOn: 1,
            projectName: 'Paralect',
            taskName: 'task',
            hoursWorked: 1312,
            notes: 'Horrable',
          },
        ],
      },
      {
        fullName: 'Frodo',
        totalHours: 12,
        notes: [
          {
            spentOn: 1,
            projectName: 'MiddleEarth',
            taskName: 'task',
            hoursWorked: 1312,
            notes: 'Hobbitale',
          },
        ],
      },
    ],
  },
  templateHelpers: {
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
  },
});
