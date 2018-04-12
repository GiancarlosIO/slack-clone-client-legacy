const { resolve, join } = require('path');

const getPath = name => resolve(__dirname, '..', 'src', name);
const getAbsolutePath = name => resolve(__dirname, name);

const nodeModulesPath = resolve(__dirname, '..', 'node_modules');

const entries = {
  vendor: [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-apollo',
    'apollo-client',
    'apollo-link',
    'apollo-link-error',
    'apollo-link-http',
    'styled-components',
    'react-router-dom',
    'semantic-ui-react',
    'semantic-ui-css',
  ],
  app: getPath('index.js'),
};

const extensions = [
  '.js',
  '.graphql',
];

const alias = {
  react: join(nodeModulesPath, 'react'),
  'react-dom': join(nodeModulesPath, 'react-dom'),
  'styled-components': join(nodeModulesPath, 'styled-components'),
  'react-apollo': join(nodeModulesPath, 'react-apollo'),
  'apollo-client': join(nodeModulesPath, 'apollo-client'),
  'apollo-link': join(nodeModulesPath, 'apollo-link'),
  'apollo-link-error': join(nodeModulesPath, 'apollo-link-error'),
  'apollo-link-http': join(nodeModulesPath, 'apollo-link-http'),
  Components: resolve(__dirname, '..', 'src/Components'),
};

const devServer = {
  publicPath: 'http://localhost:5000/static/js',
  stats: { colors: true },
  port: 5000,
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD, PUT, POST, DELETE, PATCH',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': true,
  },
};

module.exports = {
  alias,
  extensions,
  entries,
  nodeModulesPath,
  devServer,
  getAbsolutePath,
};

