import { BehaviorSubject } from "rxjs";
//const Chess = require('chess.js').Chess;

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:1337");

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
    socket.on("message", msg => {
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

  message(msg) {
    socket.emit("message", msg);
  }
}

export default new ChatStore();
