const webpackMerge = require('webpack-merge');
const commonPartial = require('./webpack/webpack.common');
const serverPartial = require('./webpack/webpack.server');
const prodPartial = require('./webpack/webpack.prod');
const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpackOptions) {
  options = options || {};

  const serverConfig = webpackMerge({}, commonPartial, serverPartial, {
    entry: serverPartial.entry, // Temporary
    plugins: [
    ],
    externals: [nodeExternals({
      modulesFromFile: true
    })]
  });

  const configs = [];

  configs.push(serverConfig);

  return configs;
}