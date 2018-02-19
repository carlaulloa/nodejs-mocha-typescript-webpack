const { root } = require('./helpers');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  entry: root('./src/app.ts'),
  output: {
    filename: 'server.js'
  },
  target: 'node',
  node: {
    __dirname: true
  }
};
