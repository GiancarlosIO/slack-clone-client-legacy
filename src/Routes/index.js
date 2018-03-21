import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Registration from './Registration/';
import Login from './Login/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/login" component={Login} />
      <Route component={() => <h2>Not found</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
