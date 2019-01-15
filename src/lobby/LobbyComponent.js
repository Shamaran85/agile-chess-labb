import React, { Component } from 'react';

import LobbyFilterComponent from './LobbyFilterComponent';
import LobbySeeksComponent from './LobbySeeksComponent';
import LobbyCreateGameComponent from './LobbyCreateGameComponent';
import LobbyLoginComponent from './LobbyLogInComponent'
import './LobbyComponent.css'

class LobbyComponent extends Component {
  render() {
    return (
      <div className='LCmain'>
        <div className='LCtopbar'>
          <div className='LCcreategame'>
            <LobbyCreateGameComponent />
          </div>
          <div className='LClogin'>
            <LobbyLoginComponent />
          </div>
        </div>
        <LobbySeeksComponent />
        <LobbyFilterComponent />
      </div>
    );
  }
}

export default LobbyComponent;
