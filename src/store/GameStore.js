import { BehaviorSubject } from "rxjs";
import Chess from "chess.js";
import { socket } from "../api/socket.io";

const defaultState = {
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  history: [],
  history_results: [],
};

const players = [{
  id: 1,
  name: 'Player1'
}, {
  id: 2,
  name: 'Player2'
}];

const playerIds = [1, 2]

const subject = new BehaviorSubject(defaultState);

class GameStore {
  constructor() {
    socket.on("move", move =>
      this.onMove(move.from, move.to, move.roomId, true)
    );
    socket.on("history", history =>
      this.setState({
        history_results: history
      })
    );

    this.setState({});
  }

  joinRoom(id) {
    socket.emit("room", { id, playerIds });
  }

  getState() {
    return subject.value;
  }
  setState(st) {
    const val = subject.value;
    const state = Object.assign({}, val, st);
    subject.next(state);
  }

  getSubject() {
    return subject;
  }

  checkTurnColor = () => {
    const chess = new Chess(this.getState().fen);
    return chess.turn() === "w" ? "white" : "black";
  };

  onMove(from, to, roomId, noEmit = false) {
    const chess = new Chess(this.getState().fen);
    let newHistory = [...this.getState().history];

    if (chess.move({ from, to })) {
      let newState = [{ from: from, to: to, fen: chess.fen() }];
      newHistory = newHistory.concat(newState);
      if (!noEmit) {
        let newFen = chess.fen();
        let checkmate = chess.in_checkmate();
        socket.emit("move", { from, to, roomId, newFen, checkmate, players });
      }
    }
    this.setState({
      fen: chess.fen(),
      history: newHistory
    });
  }

  isChecked() {
    const chess = new Chess(this.getState().fen);
    return chess.in_check();
  }

  isCheckmate() {
    const chess = new Chess(this.getState().fen);
    return chess.in_checkmate();
  }
}

export default new GameStore();
