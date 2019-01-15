import React, { Component } from "react";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import gameStore from "../store/GameStore";

class GameBoardComponent extends Component {
  state = {
    viewOnly: false
  }
  componentDidMount() {
    gameStore.getSubject().subscribe((st) => {
      let viewOnly = false;
      if (gameStore.isCheckmate() ) {
        viewOnly = true;
      }

      if (this.state.viewOnly !== viewOnly) {
        this.setState({viewOnly}, () => {
        })

      }
    })

  }
  render() {

    return (
      
      <div>
        GameBoardComponent
        <Chessground
          fen={this.props.fen}
          onMove={(from, to) => gameStore.onMove(from, to, this.props.roomId)}
          turnColor={gameStore.checkTurnColor()}
          check={gameStore.isChecked()}
          viewOnly={this.state.viewOnly}
        />
      </div>
    );
  }
}

export default GameBoardComponent;
