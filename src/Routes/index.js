import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';

// hoc
import requireAuth from '../hoc/requireAuth';
import hideAuth from '../hoc/hideAuth';

// Authentication
import Registration from './Registration/';
import Login from './Login/';

// Team
import CreateTeam from './CreateTeam/';

// Workspace
import Workspace from './Workspace';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/registration" component={hideAuth(Registration)} />
      <Route exact path="/login" component={hideAuth(Login)} />
      <Route exact path="/create-team" component={requireAuth(CreateTeam)} />
      <Route exact path="/messages" component={Workspace} />
      <Route component={() => <h2>Not found</h2>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
