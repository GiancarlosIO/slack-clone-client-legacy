import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import usersQuery from '../graphql/queries/usersQuery.graphql';

const Home = ({ data: { loading, users } }) => { // eslint-disable-line
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/create-team">Create Team</Link>
      <div>
        {users.map(u => <p key={u.id}>{u.email}</p>)}
      </div>
    </div>
  );
};

export default graphql(usersQuery)(Home);

