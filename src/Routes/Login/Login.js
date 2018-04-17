import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import FormTemplate from 'Components/form/FormTemplate';

import loginMutation from './graphq/login.graphql';

import LoginStyles from './Login.scss';

console.log(LoginStyles);

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
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
    const { login, history: { push } } = this.props;
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
              push('/');
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
      <div>
        <FormTemplate
          header="Login"
          fields={[
            {
              label: 'email', type: 'email', value: email, onChange: this.onChange('email'), fluid: true, required: true,
            },
            {
              label: 'Password', type: 'password', value: password, onChange: this.onChange('password'), fluid: true, required: true,
            },
          ]}
          error={passwordError || emailError || extraError}
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

export default graphql(loginMutation, { name: 'login' })(Login);
