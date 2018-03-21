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

class Login extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
  }

  onChange = field => e => this.setState({ [field]: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();

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

export default Login;
