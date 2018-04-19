const typeDefs = `
  type User {
    id: Int!
    email: String!
    username: String!
    token: String!
    refreshToken: String!
  }

  type Query {
    user: User
  }
`;

export default typeDefs;
