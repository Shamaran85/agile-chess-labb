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
  renderResults() {
    if (this.state.history_results) {
      return this.state.history_results.map((his) => {
        return <p>{his}</p>
      })
    }
    return null;
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
          <div>
            Historic results
            {this.renderResults()}

          </div>
        </div>
        <p>Demo-message:{this.state.message}</p>
      </div>
    );
  }
}

export default GameComponent;
