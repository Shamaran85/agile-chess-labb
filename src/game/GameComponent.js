import React, { Component } from 'react';

import GameBoardComponent from './GameBoardComponent';
import GameInfoComponent from './GameInfoComponent';
import GameChatComponent from './GameChatComponent';
import PlayerHistoryComponent from './PlayerHistoryComponent';

import gameStore from '../store/GameStore';

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
  historyClicked(move) {

  }
  render() {
    return (
      <div>
        <div>
          <GameChatComponent />
          <GameBoardComponent fen={this.state.fen} />
          <GameInfoComponent />
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
