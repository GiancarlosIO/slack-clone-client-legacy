/* eslint-disable import/no-extraneous-dependencies */
// const ClosureCompiler = require('google-closure-compiler-js').webpack;
const merge = require('webpack-merge');

const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  mode: 'production',
  target: 'web',
  plugins: [
    // new ClosureCompiler({
    //   options: {
    //     languageIn: 'ECMASCRIPT6',
    //     languageOut: 'ECMASCRIPT5',
    //     compilationLevel: 'SIMPLE',
    //     warningLevel: 'VERBOSE',
    //   },
    // }),
  ],
});

