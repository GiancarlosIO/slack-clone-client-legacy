const autoprefixer = require('autoprefixer');

module.exports = {
  test: /.(css|scss)$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: 'css-loader',
      options: { importLoarders: 1 },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'), // eslint-disable-line
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9',
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ],
};
