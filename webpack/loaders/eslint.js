module.exports = {
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
};
