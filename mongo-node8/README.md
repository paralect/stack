# Handy MongoDB layer for Node.JS 8

Currently based on [monk](https://github.com/Automattic/monk).

Install as npm package: `npm i @paralect/mongo-node8`

There are few reasons, why we think this layer could be helpful to many projects:

1. Every update method emits `*.updated`, `*.created`, `*.removed` events, which allow to listen for the database changes and perform business logic based on this updates. That could help keep your entities weakly coupled with each other.
2. Implements more high level api, such as paging.
3. Implements database schema validation based on [jsonschema](https://github.com/tdegrunt/jsonschema). See examples below for more details.

## Usage example

Examples below cover all API methods currently available.

### Full API example Usage


```javascript
const connectionString = `mongodb://localhost:27017/home-db`;
const db = require('./').connect(connectionString);

// Create entity service
const usersService = db.createService('users');
// Support only query operations
const usersQueryService = db.createQueryService('users');
// Query methods:
const result = await usersService.find({ name: 'Bob' }, { page: 1, perPage: 30 });
// returns object like this:
// {
//   results: [], // array of user entities
//   pagesCount, // total number of pages
//   count, // total count of documents found by query
// }

// If page is not specified does not return count and pagesCount as it require an extra database call.
const result2 = await usersService.find({ name: 'Bob'}, { });

// returns one document or throws an error if more that one document found
const user = await usersService.findOne({ name: 'Bob' });

const usersCount = await usersService.count({ name: 'Bob'});
const isUserExists = await usersService.exists({ name: 'Bob' });
const distinctNames = await distinct('name');
const aggregate = await aggregate([{ $match: { name: 'Bob'} }]);
const mongoId = usersService.generateId();

// wait for document to appear in database, typically used in the integrational tests
await expectDocument({ name: 'Bob'}, {
  timeout: 10000,
  tick: 50,
  expectNoDocs: false,
});


// Updates

// All methods bellow:
// 1. emit updated, created and removed events
// 2. Load and save entire object

await userService.create([{ name: 'Bob' }, { name: 'Alice' }]);
await usersService.update({ _id: '1'}, (doc) => {
  doc.name = 'Alex';
});

await usersService.remove({ _id: 1 });
// if any errors happen, ensureIndex will log it as warning
usersService.ensureIndex({ _id: 1, name: 1});

// update callback is executed only if document exists
await usersService.createOrUpdate({ _id: 1 }, (doc) => {
  doc.name = 'Helen';
})

// Atomic operations. Do not emit change events.
await userService.atomic.update({ name: 'Bob' }, {
  $set: {
    name: 'Alice',
  },
}, { multi: true });

await usersService.findOneAndUpdate({ name: 'Bob'}, {
  $set: {
    name: 'Alice',
  },
});

// Subscribe to service change events:
userService.on('updated', ({ doc, prevDoc }) => {
});
userService.on('created', ({ doc, prevDoc }) => {
});
userService.on('removed', ({ doc, prevDoc }) => {
});

// Listen to the value changes between original and updated document
// Callback executed only if user lastName or firstName are different in current or updated document
const propertiesObject = { 'user.firstName': 'Bob' };
userService.onPropertiesUpdated(['user.firstName', 'user.lastName'], ({ doc, prevDoc }) => {
});

// Listen to the value changes between original and updated document
// Callback executed only if user first name changes from `Bob` to something else
userService.onPropertiesUpdated(propertiesObject, ({ doc, prevDoc }) => {
});

```

### Documents schema validation

Schema validation is based on jsonschema and can be optionally provided to service. On every update service will validate schema before save data to the database. While schema is optional, we highly recommend use it for every service.

```javascript
// Define schema in a separate file and export method, that accepts JSON object and execute validate function of
// validator. Example of user.schema.js
//
const Validator = require('jsonschema').Validator;
const validator = new Validator();

const subscriptionSchema = {
  id: '/Subscription',
  type: 'object',
  properties: {
    appId: { type: 'String' },
    plan: { type: 'String', enum: ['free', 'standard'] },
    subscribedOn: { type: ['Date', 'null'] },
    cancelledOn: { type: ['Date', 'null'] },
  },
};

const companySchema = {
  id: '/Company',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    createdOn: { type: 'Date' },
    updatedOn: { type: 'Date' },
    name: { type: 'String' },
    isOnDemand: { type: 'Boolean' },
    status: { type: 'string', enum: ['active', 'inactive'] },
    subscriptions: {
      type: 'array',
      items: { $ref: '/Subscription' },
    },
  },
  required: ['_id', 'createdOn', 'name', 'status'],
};

validator.addSchema(subscriptionSchema, '/Subscription');

module.exports = (obj) => validator.validate(obj, companySchema);


// Use schema when creating service. user.service.js file:
const schema = require('./user.schema')
const usersService = db.createService('users', { validateSchema: schema });
```
