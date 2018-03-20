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
import { HttpLink } from 'apollo-link-http';
// display errors
import { onError } from 'apollo-link-error';
// cache
import { InMemoryCache } from 'apollo-cache-inmemory';

// css
import 'semantic-ui-css/semantic.min.css';

import App from './App';

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(`[Graphql error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }

  if (networkError) console.log(`[Network Error]: ${networkError}`);
});

const linkHttp = new HttpLink({
  uri: 'http://localhost:4000/graphql/',
});

const client = new ApolloClient({
  link: ApolloLink.from([
    linkError,
    linkHttp,
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
