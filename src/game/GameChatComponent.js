import React, { Component } from "react";
import "./GameChatComponent.css";

import firebaseDB from "../firebase.config";

class GameChatComponent extends Component {
  state = {
    name: "",
    msg: "",
    messages: []
  };

  componentDidMount() {
    let messagesRef = firebaseDB
      .database()
      .ref("messages")
      .orderByKey()
      .limitToLast(10);
    messagesRef.on("child_added", snapshot => {
      let message = {
        name: snapshot.val().name,
        text: snapshot.val().text,
        id: snapshot.key
      };
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  handleMsgInput(e) {
    this.setState({ msg: e.target.value });
  }

  handleNameInput(e) {
    this.setState({ name: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();

    const msg = this.state.msg;
    const name = this.state.name;

    if (msg.length > 0 && name.length > 0) {
      const data = { name: name, text: msg };
      firebaseDB
        .database()
        .ref("messages")
        .push(data);
      this.setState({ msg: "" });
    } else {
      alert("Enter your name and a message.");
    }
  }

  render() {
    const { messages, msg, name } = this.state;

    const displayMessages = messages.map(message => {
      return (
        <li key={message.id} className="chat__item">
          <div className="chat__text">
            <span>{message.name}:</span> {message.text}
          </div>
        </li>
      );
    });

    return (
      <div className="chat__container">
        <div className="chat__title">
          <p>Chat</p>
        </div>

        <div className="chat__messages__container">
          <ul className="chat__messages">{displayMessages}</ul>
        </div>

        <form>
          <input
            onChange={e => this.handleMsgInput(e)}
            value={msg}
            placeholder="Type your message here..."
            type="text"
            className="msg__input"
          />

          <input
            onChange={e => this.handleNameInput(e)}
            value={name}
            placeholder="Your name..."
            type="text"
            className="name__input"
          />

          <button className="submit__btn" onClick={e => this.handleClick(e)}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default GameChatComponent;
