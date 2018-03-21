/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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

const { vendor, ...rest } = entries;

module.exports = {
  entry: rest,
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

    // activate if you need
    // new BundleAnalyzerPlugin(),
  ],
};

