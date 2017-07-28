## Configuration management

In most cases it is insecure to keep production and other environment settings within repository, but as you start a project it could the simplest way. Eventually we will have more advanced solution.


### Config structure:

1. [index.js](./src/index.js) - this file contains common configuration for all environments (production, development, etc).
2. [development.js](./src/development.js) - all development configuration must be placed in here.
3. [test.js](./src/test.js) - all test configuration must be place in here.

Typically you would have one config file per environment. In runtime `index` config automatically merged with environment file, based on value of `NODE_ENV` environment variable, which we set to development if nothing else specified.

### Custom local configuration

If for any reason you need to create your own local configuration for application or for tests - there are two special files `local.js` and `test-local.js`. They are in a `.gitignore` and can be used to change settings specifically in your local environment.
