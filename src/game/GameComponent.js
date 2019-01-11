 import React, { Component } from 'react';

import GameBoardComponent from './GameBoardComponent';
import GameInfoComponent from './GameInfoComponent';
import GameChatComponent from './GameChatComponent';
import PlayerHistoryComponent from './PlayerHistoryComponent';
import gameStore from '../store/GameStore';
const his = {
  player1: {
    name: 'Unknow Player',
    id: 1324872387,
    results: [0,1,1,0,1],
},
player2: {
  name: 'Unknow Player',
  id:2329042381,
  results: [1,0,0,1,0]
}
};
class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
}

  componentDidMount() {
    gameStore.getSubject().subscribe((st) => {
      this.setState(st);
    });
  }
  render() {
    return (
      <div>
        <div>
            <GameChatComponent />
            <GameBoardComponent />
            <GameInfoComponent his={his} />
        </div>
        <div>
            <PlayerHistoryComponent />
        </div>
        <p>Demo-message:{this.state.message}</p>
      </div>
    );
  }
}

export default GameComponent;
