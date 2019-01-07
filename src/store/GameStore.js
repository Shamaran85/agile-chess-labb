import { BehaviorSubject } from 'rxjs';
import Chess from 'chess.js';
import io from 'socket.io-client';

const socket = io("http://localhost:1337")
const defaultState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  history: []
};

const subject = new BehaviorSubject(defaultState);

class GameStore {
  chess = new Chess()
  constructor() {
    socket.on('move', (move) => this.onMove(move.from, move.to, move.roomId, true))

    this.setState({})
  }

  joinRoom(id) {
    socket.emit('room', { id })

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

  checkTurnColor = () => {
    return this.chess.turn() === 'w' ? 'white' : 'black';
  }

  onMove(from, to, roomId, noEmit = false) {
    const chess = new Chess(this.getState().fen)
    let newHistory = [...this.getState().history]
    if (!noEmit) {
      socket.emit('move', { from, to, roomId })
    }

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
