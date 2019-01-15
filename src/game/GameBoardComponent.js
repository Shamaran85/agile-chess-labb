import React, { Component } from "react";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import gameStore from "../store/GameStore";

class GameBoardComponent extends Component {
  onComponentDidMount() { }
  render() {
    return (
      <div>
        <Chessground
          fen={this.props.fen}
          onMove={(from, to) => gameStore.onMove(from, to, this.props.roomId)}
          turnColor={gameStore.checkTurnColor()}
          check={gameStore.isChecked()}
          viewOnly={gameStore.isCheckmate()}
        />
      </div>
    );
  }
}

export default GameBoardComponent;
