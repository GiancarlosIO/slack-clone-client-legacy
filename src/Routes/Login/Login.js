import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {
  Container,
  Header,
  Button,
  Form,
  Grid,
} from 'semantic-ui-react';

import loginMutation from './graphq/login.graphql';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    loading: false,
  }

  onChange = field => e => this.setState({ [field]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();

    const { login } = this.props;
    const { email, password } = this.state;

    this.setState({ loading: true }, () => {
      login({ variables: { email, password } })
        .then(({
          data: {
            login: {
              ok, user, token, refreshToken, errors,
            },
          },
        }) => {
          this.setState({ loading: false }, () => {
            if (ok) {
              window.localStorage.setItem('token', token);
              window.localStorage.setItem('refreshToken', refreshToken);
              console.log(user, token, refreshToken);
            } else {
              console.log('error to log user', errors);
            }
          });
        })
        .catch((err) => {
          console.log('Error in login mutation', err);
          this.setState({ loading: false });
        });
    });
    console.log(this.state);
  }

  render() {
    const { loading, email, password } = this.state;

    return (
      <Container>
        <Grid padded centered>
          <Grid.Column width={9}>
            <Header as="h2">Login</Header>
            <Form
              onSubmit={this.onSubmit}
              loading={loading}
            >
              <Form.Input
                label="Email"
                type="email"
                value={email}
                onChange={this.onChange('email')}
                fluid
                required
              />
              <Form.Input
                label="Password"
                type="password"
                value={password}
                onChange={this.onChange('password')}
                fluid
                required
              />
              <Button type="submit">Login</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default graphql(loginMutation, { name: 'login' })(Login);
