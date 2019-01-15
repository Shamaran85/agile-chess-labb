import React, { Component } from 'react';

import LobbyFilterComponent from './LobbyFilterComponent';
import LobbySeeksComponent from './LobbySeeksComponent';
import LobbyCreateGameComponent from './LobbyCreateGameComponent';
import LobbyLoginComponent from './LobbyLogInComponent'

class LobbyComponent extends Component {
  render() {
    return (
      <div>
        <LobbySeeksComponent />
        <LobbyFilterComponent />
        <LobbyCreateGameComponent />
        <LobbyLoginComponent />
      </div>
    );
  }
}

export default LobbyComponent;
