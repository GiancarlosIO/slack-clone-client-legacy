import React from 'react';
import { hot } from 'react-hot-loader';

import Routes from './Routes/';

import global from './styles/global.css';

const App = () => (
  <div className={global.container}>
    <Routes />
  </div>
);

export default hot(module)(App);
