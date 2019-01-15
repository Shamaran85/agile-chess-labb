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
    gameStore.joinRoom(this.props.match.params.id)
  }
  render() {
    return (
      <div>
        <div>
          <GameChatComponent />
          <GameBoardComponent fen={this.state.fen} roomId={this.props.match.params.id} />
          <GameInfoComponent />
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
