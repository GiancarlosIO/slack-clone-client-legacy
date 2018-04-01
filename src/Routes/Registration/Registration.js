import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {
  Container,
  Header,
  Button,
  Message,
  Grid,
  Form,
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
    const {
      username,
      email,
      password,
      errors,
      loading,
    } = this.state;

    const errorList = Object.keys(errors).map(err => errors[err]);

    return (
      <Container>
        <Grid padded centered>
          <Grid.Column width={9}>
            <Form
              onSubmit={this.onSubmit}
              error={errorList.length > 0}
              loading={loading}
            >
              <Header as="h2">Register</Header>
              <Form.Input
                label="Username"
                error={!!errors.username}
                onChange={this.onChange('username')}
                placeholder="username"
                value={username}
                disabled={loading}
                fluid
              />
              <Form.Input
                label="Email"
                error={!!errors.email}
                onChange={this.onChange('email')}
                placeholder="email"
                value={email}
                disabled={loading}
                fluid
              />
              <Form.Input
                label="Password"
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
                type="submit"
              >
                Submit
              </Button>
              <Message
                error
                header="Check the errors:"
                list={errorList}
              />
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default graphql(registerMutation, { name: 'register' })(Registration);
