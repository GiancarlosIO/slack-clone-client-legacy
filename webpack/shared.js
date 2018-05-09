/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // eslint-disable-line
const { ReactLoadablePlugin } = require('react-loadable/webpack');

// always use absolute paths for urls directories
const path = require('path');

// loaders
const loaders = require('./loaders/');

// configuration
const {
  entries,
  extensions,
  alias,
} = require('./configuration');

const newEntries = Object.assign({}, entries);

delete newEntries.vendor;

module.exports = {
  entry: newEntries,
  optimization: {
    runtimeChunk: true,
  },
  output: {
    path: path.resolve(__dirname, '..', 'server/public/dist'),
    publicPath: '/static/js/',
    filename: '[name].min.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: loaders,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    alias,
    extensions,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: false,
    }),

    new ReactLoadablePlugin({
      filename: './server/public/dist/react-loadable.json',
    }),

    // activate if you need
    // new BundleAnalyzerPlugin(),
  ],
};

