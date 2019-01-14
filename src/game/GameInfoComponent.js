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
    this.state = {
      resultOfplayer1: [1,0,1,1,1,1,1],
      resultOfplayer2: [0,1,0,0,0,0,0],
    };
  }

  componentDidMount() {
            // Stream data from RxJS service
            LobbyStore.getLocalUserInfo().subscribe(data => {
                console.log(data)
                this.setState(data)
              });
  }
  toTaltPointPlayer1() {
    var results = this.state.resultOfplayer1;
    var total = 0;
    for (var i=0; i<results.length; i++){
      total += results[i];
    }
    return total;
  }
  toTaltPointPlayer2() {
    var results = this.state.resultOfplayer2;
    var total = 0;
    for (var i=0; i<results.length; i++){
      total += results[i];
    }
    return total;
  }

  render() {
    return (
      <div className="gameInfo">
        <h1><FontAwesomeIcon icon="chess-knight" /> Chess.JS</h1>
        <h4><FontAwesomeIcon icon="chess-pawn" /> Game Info: </h4>
        <div className="gameInfoBody">
        <div>
          <p><strong>ID: {this.state._id}</strong> </p>
          <p><strong>Player 1: Anonymous</strong> </p>
        </div>
        <div>
          <p><strong>ID: {this.state._id}</strong> </p>
          <p><strong>Player 2:Anonymous</strong> </p>
        </div>
        </div>
        <div className="result-table">
        <h2>Match result history: </h2>
        <h3 className="bestof5">Winner of Match Record <FontAwesomeIcon icon="trophy" /> </h3>
          
        <table>
            <tr>
               <th>The Player</th>
            </tr>
            <tr>
              <td>Player 1</td>
              {this.state.resultOfplayer1.map(point => (
                <td key={point}>{point}</td>
              ))}
              <td><strong>Totalt point</strong></td>
              <td>{this.toTaltPointPlayer1()}</td>
            </tr>
            <tr>
            <td>Player 2</td>
            {this.state.resultOfplayer2.map(point => (
                <td key={point}>{point}</td>
              ))}
              <td><strong>Totalt point</strong></td>
              <td>{this.toTaltPointPlayer2()}</td>
            </tr>

          </table>
        </div>
      </div>
      
      
    );
  }
}

export default GameInfoComponent;
