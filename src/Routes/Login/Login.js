import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import FormTemplate from 'Components/form/FormTemplate';

import loginMutation from './graphq/login.graphql';
import loginUserLocal from './graphq/local/loginUser.graphql';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    loginUserLocal: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
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
    const { login, loginUserLocal: loginLocal, history: { push } } = this.props;
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
              const currentUser = JSON.stringify({
                ...user,
                token,
                refreshToken,
              });

              window.localStorage.setItem('user', currentUser);
              // set the user to the local apollo-state
              loginLocal({
                variables: { ...user, token, refreshToken },
              });
              console.log(user, token, refreshToken);
              push('/');
            } else {
              localStorage.removeItem('user');
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
          localStorage.removeItem('user');
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
      <div>
        <FormTemplate
          header="LoginPage"
          fields={[
            {
              label: 'email',
              type: 'email',
              value: email,
              placeholder: 'email',
              onChange: this.onChange('email'),
              error: !!emailError,
              disabled: loading,
              fluid: true,
              required: true,
            },
            {
              label: 'Password',
              type: 'password',
              value: password,
              placeholder: 'password',
              onChange: this.onChange('password'),
              error: !!passwordError,
              disabled: loading,
              fluid: true,
              required: true,
            },
          ]}
          error={!!(passwordError || emailError || extraError)}
          errorHeader="Error to Login"
          errorContent={emailError || passwordError || extraError}
          onSubmit={this.onSubmit}
          loading={loading}
          buttonLabel="Login"
          gridColumnWidth={9}
        />
      </div>
    );
  }
}

export default compose(
  graphql(loginMutation, { name: 'login' }),
  graphql(loginUserLocal, { name: 'loginUserLocal' }),
)(Login);
