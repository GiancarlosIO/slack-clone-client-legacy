/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sharedConfig = require('./shared');

module.exports = merge(sharedConfig, {
  mode: 'production',
  target: 'web',
  devtool: 'none',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFileName: '[id].[hash].css',
    }),
  ],
});

