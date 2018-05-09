/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  test: /\.(css|scss)$/,
  use: [
    devMode ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        minimize: {
          preset: 'default',
        },
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]',
      },
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
    'sass-loader',
  ],
};
