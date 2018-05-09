// necessary for asycn - generators
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// combine link packages
import { ApolloLink } from 'apollo-link';
// react component
import { ApolloProvider } from 'react-apollo';
// client for apollo
import { ApolloClient } from 'apollo-client';
// http config for apollo (endpoint, cache, etc)
import { createHttpLink } from 'apollo-link-http';
// display errors
import { onError } from 'apollo-link-error';
// set or get the context of apollo
// import { setContext } from 'apollo-link-context';
// cache
import { InMemoryCache } from 'apollo-cache-inmemory';
// local state with apollo!!
import { withClientState } from 'apollo-link-state';
import { defaults, resolvers, typeDefs } from './LinkState/';


// css
// we already are using the cdn
// import 'semantic-ui-css/semantic.min.css';

import App from './App';

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(`[Graphql error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }

  if (networkError) console.log(`[Network Error]: ${networkError}`);
});

// const authLink = setContext((request, previusContenxt) => {
//   // get the auth token from the local storage if it exists
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');

//   // return the headers to the context so httplink can read them
//   return {
//     headers: {
//       ...previusContenxt.headers,
//       'x-token': token || '',
//       'x-refresh-token': refreshToken || '',
//     },
//   };
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql/',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // console.log('middleware authMiddleware', operation);
  const user = localStorage.getItem('user');

  operation.setContext({
    headers: {
      'x-token': user ? JSON.parse(user).token : '',
      'x-refresh-token': user ? JSON.parse(user).refreshToken : '',
    },
  });

  return forward(operation);
});

const authAfterware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    // console.log('operation context', operation.getContext());
    const { headers } = operation.getContext();
    const user = localStorage.getItem('user');

    // console.log('headres', headers);

    if (headers && user) {
      const newUser = { ...JSON.parse(user) };
      const token = headers['x-token'];
      const refreshToken = headers['x-refresh-token'];

      if (token) newUser.token = token;

      if (refreshToken) newUser.refreshToken = refreshToken;

      localStorage.setItem('user', JSON.stringify(newUser));
    }

    return response;
  }));

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
  typeDefs,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    linkError,
    stateLink,
    authMiddleware,
    authAfterware,
    // authMiddleware,
    httpLink,
  ]),
  cache,
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app'),
  );
});
