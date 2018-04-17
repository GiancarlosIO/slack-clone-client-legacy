// necessary for asycn - generators
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
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
import { setContext } from 'apollo-link-context';
// cache
import { InMemoryCache } from 'apollo-cache-inmemory';

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

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql/',
});

const authLink = setContext((request, previusContenxt) => {
  // get the auth token from the local storage if it exists
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...previusContenxt.headers,
      'x-token': token || '',
      'x-refresh-token': refreshToken || '',
    },
  };
});

// const authMiddleware = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');

//   operation.setContext({
//     headers: {
//       'x-token': token || '',
//       'x-refresh-token': refreshToken || '',
//     },
//   });

//   return forward(operation);
// });

const client = new ApolloClient({
  link: ApolloLink.from([
    linkError,
    authLink,
    // authMiddleware,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('app'),
  );
});
