import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {
  Container,
  Header,
  Button,
  Form,
  Grid,
  Message,
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
    passwordError: null,
    emailError: null,
    extraError: null,
  }

  onChange = field => e => this.setState({ [field]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();

    const clearErrors = {
      emailError: null,
      passwordError: null,
      extraError: null,
    };
    const { login } = this.props;
    const { email, password } = this.state;

    this.setState({ loading: true, ...clearErrors }, () => {
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
              const errorsArray = errors.reduce((a, b) => {
                a[`${b.path}Error`] = b.message;
                return a;
              }, {});

              console.log(errorsArray);


              this.setState(errorsArray);
            }
          });
        })
        .catch((err) => {
          console.log('Error in login mutation', err);
          this.setState({
            loading: false,
            extraError: 'An error has ocurred, try again',
          });
        });
    });
    console.log(this.state);
  }

  render() {
    const {
      loading,
      email,
      password,
      passwordError,
      emailError,
      extraError,
    } = this.state;

    return (
      <Container>
        <Grid padded centered>
          <Grid.Column width={9}>
            <Header as="h2">Login</Header>
            <Form
              onSubmit={this.onSubmit}
              loading={loading}
              error={passwordError || emailError || extraError}
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
              {(emailError || passwordError || extraError) && (
                <Message
                  error
                  header="Error to loggin"
                  content={emailError || passwordError || extraError}
                />
              )}
              <Button type="submit">Login</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default graphql(loginMutation, { name: 'login' })(Login);
