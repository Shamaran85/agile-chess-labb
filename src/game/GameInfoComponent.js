import React, { Component } from 'react';

const his = {
  player1: {
    name: 'Niklas',
    results: [0,1,1,0,1,0]
  },
  player2: {
    name: 'Viktor',
    results: [1,0,0,1,0,1]
  }
};
class GameInfoComponent extends Component {
  render() {
    return (
      <div>
        GameInfoComponent
      </div>
    );
  }
}

export default GameInfoComponent;
