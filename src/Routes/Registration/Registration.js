import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import FormTemplate from 'Components/form/FormTemplate';

// murations
import registerMutation from './graphql/mutations/registerMutation.graphql';

class Registration extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    username: '',
    email: '',
    password: '',
    errors: {},
    loading: false,
  }

  onChange = field => e => this.setState({ [field]: e.target.value })

  onSubmit = () => {
    this.setState({
      loading: true,
      errors: {
        username: '',
        email: '',
        password: '',
      },
    }, async () => {
      const { register, history } = this.props;
      const response = await register({ variables: this.state });
      const { ok, errors } = response.data.register;

      if (ok) {
        this.setState({ loading: false }, () => {
          history.push('/');
        });
      } else {
        this.setState({
          loading: false,
          errors: errors.reduce((store, value) => ({
            ...store,
            [value.path]: value.message,
          }), {}),
        });
      }
    });
  }

  render() {
    const {
      username,
      email,
      password,
      errors,
      loading,
    } = this.state;

    const errorList = Object.keys(errors).map(err => errors[err]);

    return (
      <div>
        <FormTemplate
          header="Registration"
          fields={[
            {
              label: 'Username',
              error: !!errors.username,
              onChange: this.onChange('username'),
              placeholder: 'username',
              value: username,
              disabled: loading,
              fluid: true,
            },
            {
              label: 'Email',
              error: !!errors.email,
              onChange: this.onChange('email'),
              placeholder: 'email',
              value: email,
              disabled: loading,
              fluid: true,
            },
            {
              label: 'Password',
              type: 'password',
              error: !!errors.password,
              onChange: this.onChange('password'),
              placeholder: 'Password',
              value: password,
              disabled: loading,
              fluid: true,
            },
          ]}
          error={errorList.length > 0}
          errorHeader="Check the errors"
          onSubmit={this.onSubmit}
          loading={loading}
          buttonLabel="Registration"
          gridColumnWidth={9}
        />
      </div>
    );
  }
}

export default graphql(registerMutation, { name: 'register' })(Registration);
