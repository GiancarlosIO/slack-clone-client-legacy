/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBuildNotifier = require('webpack-build-notifier');
const WebpackAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // eslint-disable-line

const sharedConfig = require('./shared');

const {
  devServer,
} = require('./configuration');

const config = merge(sharedConfig, {
  mode: 'development',
  target: 'web',
  output: {
    publicPath: 'http://localhost:5000/static/js',
    chunkFilename: '[name].chunk.js',
  },
  devServer,
  plugins: [
    new WebpackBuildNotifier({
      title: 'SlackClone Webpack build',
      logo: resolve('./img/favicon.png'),
      suppressSuccess: false,
    }),
    // This plugin will cause the relative path of the module to be displayed when
    // HMR is enabled. Suggested for use in development.
    // new webpack.NamedModulesPlugin(), // by default in v4

    // dll
    new webpack.DllReferencePlugin({
      manifest: require('../server/public/dist/vendor-manifest.json'), // eslint-disable-line
    }),

    // activate hmr
    // new webpack.NoEmitOnErrorsPlugin(), // by default in v4
    new webpack.HotModuleReplacementPlugin(),

    // activate if u need
    // new WebpackAnalyzer(),

  ],
  devtool: 'source-map',
});

module.exports = config;
