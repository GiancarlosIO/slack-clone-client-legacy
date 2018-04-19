import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';

import FormTemplate from 'Components/form/FormTemplate';

import createTeamMutation from './graphql/createTeam.graphql';
import USER_QUERY from './graphql/local/user.graphql';

class CreateTeam extends Component {
  static propTypes = {
    createTeam: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    name: '',
    nameError: null,
    loading: false,
    extraError: null,
  }

  onSubmit = () => {
    const { createTeam, history: { push } } = this.props;
    const { name } = this.state;

    if (name.length < 6) {
      this.setState({ nameError: 'The team name need to be between 6 and 50 characters long' });
    } else {
      this.setState({ loading: true }, () => {
        createTeam({
          variables: { name },
        }).then(({ data: { createTeam: { ok, errors } } }) => {
          console.log('success to create team', ok);
          this.setState({
            loading: false,
            nameError: ok ? null : errors[0].message,
          }, () => {
            push('/');
          });
        }).catch((err) => {
          console.log('error to create team', err);
          this.setState({ loading: false }, () => {
            push('/login/');
          });
        });
      });
    }
  }

  onChange = ({ target: { value: name } }) => this.setState({ name, nameError: null })

  render() {
    const {
      name,
      nameError,
      loading,
      extraError,
    } = this.state;

    return (
      <Query query={USER_QUERY}>
        {({ loading: loadingQuery, error, data }) => {
          if (loadingQuery) return <h2>Loading</h2>;
          if (error) return <h2>Error</h2>;

          if (!data.user) return <Redirect to="/login" />;

          return (
            <div>
              <FormTemplate
                header="What’s your company called?"
                subHeader="We’ll use this to name your Slack workspace, which you can always change later."
                fields={[
                  {
                    label: 'Company name', type: 'text', value: name, onChange: this.onChange, fluid: true, required: true,
                  },
                ]}
                error={nameError || extraError}
                errorHeader="Error to create the team"
                errorContent={nameError || extraError}
                onSubmit={this.onSubmit}
                loading={loading}
                buttonLabel="Create workspace"
                buttonProps={{
                  disabled: loading || nameError || !name,
                }}
                gridColumnWidth={12}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default graphql(createTeamMutation, { name: 'createTeam' })(CreateTeam);
