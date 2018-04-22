const user = localStorage.getItem('user');

const defaults = {
  user: user ? { ...JSON.parse(user), __typename: 'user' } : null,
};

export default defaults;
