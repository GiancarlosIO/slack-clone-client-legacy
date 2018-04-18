import React from 'react';
import { graphql } from 'react-apollo';

import usersQuery from '../graphql/queries/usersQuery.graphql';

const Home = ({ data: { loading, users } }) => {
  if (loading) return <p>Loading...</p>;

  return users.map(u => <p key={u.id}>{u.email}</p>);
};

export default graphql(usersQuery)(Home);

