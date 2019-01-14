import { BehaviorSubject } from "rxjs";
//const Chess = require('chess.js').Chess;

import { socket } from '../api/socket.io';

const defaultState = {
  message: {
    userId: "Host",
    userName: "Host",
    userMessage: "Welcome to room 123"
  }
};

const subject = new BehaviorSubject(defaultState);

class ChatStore {
  constructor() {
    socket.on("chat", msg => {
      this.setState({ message: msg });
    });
  }

  setState(st) {
    const val = subject.value;
    const state = Object.assign({}, val, st);
    subject.next(state);
  }

  getSubject() {
    return subject;
  }

  chat(msg) {
    socket.emit("chat", msg);
  }
}

export default new ChatStore();
