const { resolve } = require('path');

module.exports = {
  test: /\.js?$/,
  include: [
    resolve(__dirname, '..', '..', 'src'),
  ],
  loader: 'babel-loader',
  query: {
    cacheDirectory: true,
  },
};
