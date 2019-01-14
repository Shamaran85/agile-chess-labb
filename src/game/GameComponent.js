import React, { Component } from 'react';
import './GameComponent.css';


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
  historyClicked(move) {

  }
  render() {
    return (
      <div className="game__container">
        <div className="left__container">
          <div className="game__chat">
            <GameChatComponent />
          </div>
          <p>Demo-message:{this.state.message}</p>
        </div>
        <div className="center__container">
          <div className="game__table">
            <GameBoardComponent fen={this.state.fen} roomId={this.props.match.params.id} />
          </div>
        </div>
        <div className="right__container">
          <div className="game__history">
            <div className="chat__title">
              <p>History</p>
            </div>
            <div className="game__history__moves">
              <PlayerHistoryComponent
                onClick={(e) => this.historyClicked(e)}
                history={['e4', 'e5']} />
            </div>
          </div>
          <div className="game__info">
            <GameInfoComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default GameComponent;
