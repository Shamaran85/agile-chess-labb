import React, { Component } from 'react';

import GameBoardComponent from './GameBoardComponent';
import GameInfoComponent from './GameInfoComponent';
import GameChatComponent from './GameChatComponent';
import PlayerHistoryComponent from './PlayerHistoryComponent';

import gameStore from '../store/GameStore';
const his = {
  player1: {
    results: [0,1,1,0,1],
},
player2: {
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
    gameStore.joinRoom(this.props.match.params.id)
  }
  historyClicked(move) {

  }
  render() {
    return (
      <div>
        <div>
          <GameChatComponent />
          <GameBoardComponent fen={this.state.fen} roomId={this.props.match.params.id} />
          <GameInfoComponent his={his} />
        </div>
        <div>

            <PlayerHistoryComponent 
              onClick={(e) => this.historyClicked(e)} 
              history={['e4','e5']} />
        </div>
        <p>Demo-message:{this.state.message}</p>
      </div>
    );
  }
}

export default GameComponent;
