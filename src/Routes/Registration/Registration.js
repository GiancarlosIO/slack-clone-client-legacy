import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {
  Input,
  Container,
  Header,
  Button,
  Message,
} from 'semantic-ui-react';

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
    console.log('error', this.state);
    const {
      username,
      email,
      password,
      errors,
      loading,
    } = this.state;

    const errorList = Object.keys(errors).map(err => errors[err]);

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          error={!!errors.username}
          onChange={this.onChange('username')}
          placeholder="username"
          value={username}
          disabled={loading}
          fluid
        />
        <Input
          error={!!errors.email}
          onChange={this.onChange('email')}
          placeholder="email"
          value={email}
          disabled={loading}
          fluid
        />
        <Input
          error={!!errors.password}
          onChange={this.onChange('password')}
          type="password"
          placeholder="password"
          value={password}
          disabled={loading}
          fluid
        />
        <Button
          primary
          onClick={this.onSubmit}
          type="submit"
          loading={loading}
        >
          Submit
        </Button>
        {errorList.length > 0 ? (
          <Message
            error
            header="Check the errors:"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

export default graphql(registerMutation, { name: 'register' })(Registration);
