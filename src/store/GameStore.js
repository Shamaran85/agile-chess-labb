import { BehaviorSubject } from "rxjs";
import Chess from "chess.js";
import { socket } from "../api/socket.io";

const START_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const defaultState = {
  fen: START_POSITION, // Currently displayed on board
  current_position: START_POSITION, // Current position(last move)
  history: []
};

const subject = new BehaviorSubject(defaultState);

class GameStore {
  constructor() {
    socket.on("move", move =>
      this.onMove(move.from, move.to, move.roomId, true)
    );

    this.setState({});
  }

  joinRoom(id) {
    socket.emit("room", { id });
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
    const chess = new Chess(this.getState().current_position);
    return chess.turn() === "w" ? "white" : "black";
  };

  onMove(from, to, roomId, noEmit = false) {
    const chess = new Chess(this.getState().current_position);
    let newHistory = [...this.getState().history];
    if (!noEmit) {
      socket.emit("move", { from, to, roomId });
    }
    if (chess.move({ from, to })) {
      let newState = [{ from: from, to: to, fen: chess.fen() }];

      newHistory = newHistory.concat(newState);
    }

    const position = chess.fen();
    this.setState({
      fen: position,
      current_position: position,
      history: newHistory
    });
  }

  /**
   * Takes a fen-string and displays on board.
   *
   * https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
   *
   * @param fen - string that represents position.
  */
  showPosition(fen) {
    this.setState({
      fen,
    });
  }

  isChecked() {
    const chess = new Chess(this.getState().current_position);
    return chess.in_check();
  }

  isCheckmate() {
    const chess = new Chess(this.getState().current_position);
    return chess.in_checkmate();
  }
}

export default new GameStore();
