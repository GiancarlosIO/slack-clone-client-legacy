/* eslint-disable import/no-extraneous-dependencies */
// const ClosureCompiler = require('google-closure-compiler-js').webpack;
const merge = require('webpack-merge');

const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  mode: 'production',
  target: 'web',
  devtool: 'none',
});

