import React, { Component } from 'react';
import './GameComponent.css';


import GameBoardComponent from './GameBoardComponent';
import GameInfoComponent from './GameInfoComponent';
import GameChatComponent from './GameChatComponent';
import PlayerHistoryComponent from './PlayerHistoryComponent';

import gameStore from '../store/GameStore';

class GameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    gameStore.getSubject().subscribe((st) => {
      console.log(st.event)
      this.setState(st);
    });
    gameStore.joinRoom(this.props.match.params.id)
  }


  getCurrentEvent() {
    let myGameInfo = [];
    if(this.state.event){
      Object.entries(this.state.event).forEach(entry => {
            let key = entry[0];
            let value = entry[1];
            let sign = '';
            if(entry.playerColor === 'b'){
                sign = <i className="fas fa-circle"></i>
            }else {
               sign = <i className="far fa-circle"></i>
            }

            myGameInfo.push(
                <tr key={key}>
                      <td>{sign}</td>
                      <td>{value.creatorId}</td>
                      <td>{value.secondPlayer}</td>
                      <td>{value.time}</td>
                      <td>{value.gameType}</td>
                      <td></td>
                  </tr>
                  )
  })
    }
    return myGameInfo;
  }


  historyClicked(move) {

  }

 render() {
    return (
      <div>
<div className="top__container">
      <div className="">
          <table className="seeker-table">
            <thead>
                  <tr>
                      <th><i className="fas fa-shield-alt"></i></th>
                      <th>Creating Player</th>
                      <th>Added Player</th>
                      <th>Time</th>
                      <th>Type</th>
                      <th><i className="fas fa-cog"></i></th>
                  </tr>
              </thead>

            <tbody>
            {this.getCurrentEvent()}
            </tbody>
        </table>

         </div>
      </div>

      <div className="game__container">
      
        <div className="left__container">
          <div className="game__chat">
          <GameChatComponent roomId={this.props.match.params.id} />
          </div>
       
          <p>Demo-message:{this.state.message}</p>
        </div>
        <div className="center__container">
          <div className="game__table">
            <GameBoardComponent fen={this.state.fen} roomId={this.props.match.params.id} />
          </div>
        </div>
        <div className="right__container">
          <div className="game__history">
            <div className="chat__title">
              <p>History</p>
            </div>
            <div className="game__history__moves">
              <PlayerHistoryComponent
                onClick={(e) => this.historyClicked(e)}
                history={['e4', 'e5']} />
            </div>
          </div>
          <div className="game__info">
            <GameInfoComponent />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default GameComponent;
