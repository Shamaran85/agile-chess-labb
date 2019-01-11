import React, { Component } from 'react';
import Chess from 'chess.js';
import GameStore from '../store/GameStore';

class PlayerHistoryComponent extends Component {
  
  state = {
    history: []
  }
  chess = new Chess();  


  componentDidMount() {
    GameStore.getSubject().subscribe((payload) => {
      console.log(payload)
this.setState({
  history: payload.history
    });
  })
  }

  onClick(move) {
    const fen = move.fen;
    GameStore.showPosition(fen);
  }

  render() {
    
    this.chess.move(history)

    const history = this.state.history.map((move) => {
      return (<li key={move} onClick={() => this.onClick(move)}>{move.from} / {move.to}</li>)
    })
    return (
      <div>
        PlayerHistoryComponent
        <ul>
          {history}
        </ul>
      </div>
    );
  }
}

export default PlayerHistoryComponent;
