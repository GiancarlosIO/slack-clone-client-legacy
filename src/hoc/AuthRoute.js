import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import USER_QUERY from '../graphql/local/user.graphql';

const AuthRoute = WrapperComponent => props => (
  <Query query={USER_QUERY} >
    {({ loading, error, data }) => {
      if (loading) return <h2>loading...</h2>;
      if (error) return <h2>Error to get the session, reload the page.</h2>;
      if (!data.user) return <Redirect to="/login" />;

      return (
        <WrapperComponent {...props} user={data.user} />
      );
    }}
  </Query>
);

export default AuthRoute;
