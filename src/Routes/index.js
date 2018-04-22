import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';

// hoc
import AuthRoute from '../hoc/AuthRoute';

// Authentication
import Registration from './Registration/';
import Login from './Login/';

// Team
import CreateTeam from './CreateTeam/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/create-team" component={AuthRoute(CreateTeam)} />
      <Route component={() => <h2>Not found</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
