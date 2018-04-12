import React, { Component } from 'react';

class CreateTeam extends Component {
  state = {
    name: '',
    nameError: '',
  }

  render() {
    const { name, nameError } = this.state;
    return (
      <div>
        <h1>Create Team {name} {nameError}</h1>
      </div>
    );
  }
}

export default CreateTeam;
