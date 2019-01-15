import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LobbyComponent from './lobby/LobbyComponent';
import GameComponent from './game/GameComponent';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChessKnight, faChessPawn, faTrophy } from '@fortawesome/free-solid-svg-icons'
import './App.css';
library.add(faChessKnight, faChessPawn, faTrophy)



class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                <Route path="/" exact component={LobbyComponent} />
                <Route path="/game/:id" component={GameComponent} />
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
