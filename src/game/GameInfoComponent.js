import React, { Component } from 'react';
import GameComponent from './GameComponent';
import '../App.css';

//User1 it's you who is playing.
//User2 is your opponent 
//Status are showing that you are still playing or you are away.
//Match result is showing your result if you are win or lose.
class GameInfoComponent extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div className="gameInfo">
        <h1><span class="glyphicon glyphicon-knight" aria-hidden="true"></span> Chess.JS</h1>
        <div className="gameInfoBody">
            <h5><span class="glyphicon glyphicon-pawn" aria-hidden="true"></span> Game Info: </h5>
            <p><strong>Player Name:</strong> {this.props.userName}</p>
            <p><strong>Opponent Name:</strong> {this.props.userOpponent}</p>
            <p><strong>Status:</strong> {this.props.status}</p>
            <p><strong>Match result:</strong> {this.props.result}</p>
        </div>
      </div>
    );
  }
}

export default GameInfoComponent;
