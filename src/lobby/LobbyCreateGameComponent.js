import React, { Component } from 'react';
import CreateGameForm from './components/CreateGameForm';


class LobbyCreateGameComponent extends Component {
  render() {
    return (
      <div>
        Create Game
        <CreateGameForm />
      </div>
    );
  }
}

export default LobbyCreateGameComponent;
