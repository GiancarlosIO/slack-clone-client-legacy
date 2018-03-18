import React from 'react';
import { graphql } from 'react-apollo';

import usersQuery from '../graphql/queries/usersQuery.graphql';

const Home = (props) => {
  console.log(props);

  return (
    <h2>Home</h2>
  );
};

export default graphql(usersQuery)(Home);

