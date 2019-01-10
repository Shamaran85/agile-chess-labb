import {BehaviorSubject} from 'rxjs';
import LobbyStore from '../store/LobbyStore';
//const Chess = require('chess.js').Chess;

const defaultState = {
  message: 'test',
  localUserInfo: {}
};

const subject = new BehaviorSubject(defaultState);

class GameStore {
    constructor() {
        this.setState({})
    }

    componentDidMount() {

      LobbyStore.getLocalUserInfo().subscribe((data) => {
          console.log('localUserInfo', data);
          this.setState({ localUserInfo: data });
      });

  }


    setState(st) {
      const val = subject.value;
      this.state = Object.assign({}, val, st);
      subject.next(val)
    }

    getSubject() {
      return subject;
    }

    updateDemoMessage(payload) {
      this.setState(payload)
    }

}

export default new GameStore();
