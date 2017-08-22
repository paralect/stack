require('regenerator-runtime/runtime')
const devMiddleware = require('./devMiddleware')
const hotMiddleware = require('./hotMiddleware')
module.exports = { devMiddleware, hotMiddleware }
