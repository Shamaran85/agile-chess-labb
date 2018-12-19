import React, { Component } from 'react';
import Chessground from 'react-chessground';
import 'react-chessground/dist/styles/chessground.css';
import Chess from 'chess.js';


class GameBoardComponent extends Component {
  chess = new Chess()

  state = {
    fen: ''
  }

  onComponentDidMount() {

  }

  checkTurnColor = () => {
    return this.chess.turn() === 'w' ? 'white' : 'black';
  }

  onMove(from, to) {
    if (this.chess.move({ from, to })) {


      console.log(this.chess.moves())
      console.log(this.chess.history())
    } else {
      console.log("invalid")
    }
    this.setState({
      fen: this.chess.fen()
    })

  }

  render() {
    console.log(this.chess.moves())
    console.log(this.chess.history())

    return (
      <div>
        GameBoardComponent
        <Chessground
          onMove={(from, to) => this.onMove(from, to)}
          fen={this.state.fen}
          turnColor={this.checkTurnColor()} />
      </div>
    );
  }
}

export default GameBoardComponent;
