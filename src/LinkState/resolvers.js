import { gql } from 'react-apollo';

const resolvers = {
  Mutation: {
    loginUser: (_, { id, username, email, token, refreshToken }, { cache }) => {
      const user = {
        id,
        username,
        email,
        token,
        refreshToken,
        __typename: 'user',
      };

      cache.writeData({ data: { user } });
      return null;
    },
  },
  Query: {
    user: (_, variables, { cache }) => {
      const user = cache.readQuery({
        query: gql`
          query User {
            user @client {
              id
              username
              email
            }
          }
        `,
      });

      return user;
    },
  },
};

export default resolvers;
