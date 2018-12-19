import React, { Component } from 'react';
import Chess from 'chess.js';

/**
 * Takes two arguments
 * @param history - array of historic moves
 *  - ['e4', 'e5', 'd4', 'd5'] etc
 * @param onClick - callback that is executed when historic move is clicked.
 *  - calls callback with move as argument.
 */
class PlayerHistoryComponent extends Component {
  
  chess = new Chess();  

  render() {
    
    this.chess.move("e4")
console.log(this.chess.history());

//chess.history({ verbose: true });
/* 
    chess.move('e4');
    chess.history();
    chess.history({ verbose: true }); */

    const history = this.props.history.map((move) => {
      return (<li key={move} onClick={() => this.props.onClick(move)}>{move}</li>)
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
