const { resolve } = require('path');

module.exports = {
  test: /\.(graphql)$/,
  include: [
    resolve(__dirname, '..', '..', 'src'),
  ],
  loader: 'graphql-tag/loader',
};
