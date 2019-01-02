import { BehaviorSubject } from 'rxjs';
import Chess from 'chess.js';
const defaultState = {
  message: 'test',
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  history: []
};

const subject = new BehaviorSubject(defaultState);

class GameStore {
  chess = new Chess()
  constructor() {
    this.setState({})
  }
  getState() {
    return subject.value;

  }
  setState(st) {
    const val = subject.value;
    const state = Object.assign({}, val, st);
    subject.next(state)
  }

  getSubject() {
    return subject;
  }

  updateDemoMessage(payload) {
    this.setState(payload)
  }
  checkTurnColor = () => {
    return this.chess.turn() === 'w' ? 'white' : 'black';
  }

  onMove(from, to) {
    const chess = new Chess(this.getState().fen)
    console.log(chess.fen())
    let newHistory = [...this.getState().history]

    if (chess.move({ from, to })) {
      let newState = [{ from: from, to: to, fen: chess.fen() }]
      newHistory = newHistory.concat(newState)
    }

    this.setState({
      fen: chess.fen(),
      history: newHistory
    })
    console.log(this.getState().history);
  }

}

export default new GameStore();
