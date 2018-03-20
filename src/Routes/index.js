import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Registration from './Registration/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/registration" component={Registration} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
