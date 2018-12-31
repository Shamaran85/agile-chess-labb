import React, { Component } from 'react';
import * as firebase from 'firebase';
import { config } from '../config';

firebase.initializeApp(config);

class LobbySeeksComponent extends Component {
  componentDidMount() {
    /* firebase.database().ref('players').push({
      clientId: '3343dasdas',
      name: 'anonymsaas'
    }) */
  }
  render() {
    return (
      <div>
        <div>
            Seeks
        </div>
      </div>
    );
  }
}

export default LobbySeeksComponent;
