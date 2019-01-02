import React, { Component } from 'react';
import GameComponent from './GameComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';

//User1 it's you who is playing.
//User2 is your opponent 
//Status are showing that you are still playing or you are away.
//Match result is showing your result if you are win or lose.
class GameInfoComponent extends Component {

  constructor(props) {
    super(props);
  }
matchResult(){
  var winScore = 1;
  var loseScore = 0; 
  if(this.result === 'win') {
    return (winScore);
  } else {
    return (loseScore);
  }
}

  render() {
    return (
      <div className="gameInfo">
        <h1><FontAwesomeIcon icon="chess-knight" /> Chess.JS</h1>
        <h4><FontAwesomeIcon icon="chess-pawn" /> Game Info: </h4>
        <div className="gameInfoBody">
            <p><strong>Player Name:</strong> {this.props.userName}</p>
            <p><strong>Opponent Name:</strong> {this.props.userOpponent}</p>
            <p><strong>Status: </strong> {this.props.status}</p>
            <p><strong>Match result:</strong> {this.props.result}</p>
        </div>
        <div className="result-table">
        <h2>Match result history: </h2>
        <h3 className="bestof5">BEST OF 5 <FontAwesomeIcon icon="trophy" /> </h3>
          <table>
            <tr>
               <th>The Player</th>
               <th>Win/Lose</th>
               <th>Win/Lose</th>
               <th>Win/Lose</th>
               <th>Win/Lose</th>
               <th>Win/Lose</th>
            </tr>
            <tr>
               <td><strong>Player Name:</strong> {this.props.userName}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
            </tr>
            <tr>
               <td><strong>Opponent Name</strong> {this.props.userOpponent}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
               <td>{this.matchResult}</td>
            </tr>
          </table>
        </div>
      </div>
      
      
    );
  }
}

export default GameInfoComponent;
