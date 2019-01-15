import React, { Component } from 'react';

import LobbyFilterComponent from './LobbyFilterComponent';
import LobbySeeksComponent from './LobbySeeksComponent';
import LobbyCreateGameComponent from './LobbyCreateGameComponent';

class LobbyComponent extends Component {
  filterCallback(log){
  }


  render() {
    return (
      <div>
        <LobbySeeksComponent />
        <LobbyFilterComponent filterCallback={this.filterCallback.bind(this)}/>
        <LobbyCreateGameComponent />
      </div>
    );
  }
}

export default LobbyComponent;
