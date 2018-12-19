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
      <div className="gameInfoBody">
        <h1>GameInfo</h1>
        <p><strong>Player Name:</strong> {this.props.userName}</p>
        <p><strong>Opponent Name:</strong> {this.props.userOpponent}</p>
        <p><strong>Status:</strong> {this.props.status}</p>

        <p><strong>Match result:</strong> {this.props.result}</p>
      </div>
    );
  }
}

export default GameInfoComponent;
