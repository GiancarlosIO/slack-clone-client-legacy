module.exports = {
  test: /\.(png|jpg|gif|svg|ttf|woff2|woff|eot)$/,
  use: [
    {
      loader: 'url-loader',
    },
  ],
};
