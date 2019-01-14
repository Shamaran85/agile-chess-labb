import React, { Component } from 'react';
import GameComponent from './GameComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css';
import LobbyStore from '../store/LobbyStore';

//User1 it's you who is playing.
//User2 is your opponent 
//Status are showing that you are still playing or you are away.
//Match result is showing your result if you are win or lose.
class GameInfoComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
            // Stream data from RxJS service
            LobbyStore.getLocalUserInfo().subscribe(data => {
                console.log(data)
              });
  }
  toTaltPointPlayer1() {
    var results = this.props.his.player1.results;
    var total = 0;
    for (var i=0; i<results.length; i++){
      total += results[i];
    }
    return total;
  }
  toTaltPointPlayer2() {
    var results = this.props.his.player2.results;
    var total = 0;
    for (var i=0; i<results.length; i++){
      total += results[i];
    }
    return total;
  }

  getTdsPlayer1() {
    var matchResult = this.props.his.player1.results;
    var tableBodys = matchResult.map((results)=>{
      return (
            <td>{results}</td>
      );
    });
    return tableBodys;

  }
  getTdsPlayer2() {
    var matchResult = this.props.his.player2.results;
    var tableBodys = matchResult.map((results)=>{
      return (
            <td>{results}</td>
      );
    });
    return tableBodys;

  }
  ShowId () {

  }

  getLocalUserInfo() {
    return this.userInfo;
    
}

  render() {
    return (
      <div className="gameInfo">
        <h1><FontAwesomeIcon icon="chess-knight" /> Chess.JS</h1>
        <h4><FontAwesomeIcon icon="chess-pawn" /> Game Info: </h4>
        <div className="gameInfoBody">
        <div>
          <p><strong>ID: </strong> {this.props.his.player1.id}</p>
          <p><strong>Player 1:</strong> {this.props.his.player1.name}</p>
        </div>
        <div>
          <p><strong>ID: </strong> {this.props.his.player2.id}</p>
          <p><strong>Player 1:</strong> {this.props.his.player2.name}</p>
        </div>
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
               <th>Wins Totalt</th>
            </tr>
            <tr>
               <td><strong></strong> {this.props.his.player1.name}</td>
               {this.getTdsPlayer1()}
               <td>{this.toTaltPointPlayer1()}</td>
            </tr>
            <tr>
               <td><strong></strong> {this.props.his.player2.name}</td>
               {this.getTdsPlayer2()}
               <td>{this.toTaltPointPlayer2()}</td>
            </tr>
          </table>
        </div>
      </div>
      
      
    );
  }
}

export default GameInfoComponent;
