const path = require('path');
const webpack = require('webpack');

const {
  entries,
} = require('./configuration');

// const loaders = require('./loaders/');

module.exports = {
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
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', 'server/public/dist', '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
};

