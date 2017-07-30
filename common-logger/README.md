# Common Logger

Common logger is preconfigured console based logger. Currently based on [winston](https://github.com/winstonjs/winston).

### Installation

```
npm i @paralect/common-logger
```

### Usage

Create `logger.js` file in the root of your project:

```
const createConsoleLogger = require('@paralect/common-logger').createConsoleLogger;

module.exports = createConsoleLogger({ isDev: true });
```

By default isDev is set to `false` in logger. If set to true, two things will happen:

1. All logs output will be in plain text (vs `json` for production like environments)
2. For development environment logger will also output all `logger.debug()` messages, while none dev info and above.

### Expose logger as global object

Since logger is such a common thing, it make sense to expose it as global variable, so it simpler to use it across the project.

```
global.logger = require('./logger');

// In a place, where you need logger:
const logger = global.logger;
```
