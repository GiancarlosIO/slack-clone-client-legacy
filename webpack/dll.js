/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const ClosureCompiler = require('google-closure-compiler-js').webpack;
const webpack = require('webpack');

const {
  entries,
} = require('./configuration');

// const loaders = require('./loaders/');

module.exports = {
  optimization: {
    minimize: true,
  },
  mode: 'production',
  entry: {
    vendor: entries.vendor,
  },
  output: {
    path: path.join(__dirname, '..', 'server/public/dist'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    // new ClosureCompiler({
    //   options: {
    //     languageIn: 'ECMASCRIPT6',
    //     languageOut: 'ECMASCRIPT5',
    //     compilationLevel: 'SIMPLE',
    //     warningLevel: 'VERBOSE',
    //   },
    // }),,
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', 'server/public/dist', '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
};

