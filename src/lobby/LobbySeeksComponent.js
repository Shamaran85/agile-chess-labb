import React, { Component } from 'react';

let newComp = 'Detta är en komponent';


class LobbySeeksComponent extends Component {

  render() {
    return (
      <div>
        <div>
            <p>Seeks</p>
            {newComp}
        </div>
      </div>
    );
  }
}

export default LobbySeeksComponent;
