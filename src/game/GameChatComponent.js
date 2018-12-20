import React, { Component } from "react";
import "./GameChatComponent.css";

const MOCK = [
  {
    user: "Nadim",
    text: "I know how to redux!"
  },
  {
    user: "Kadar",
    text: "Can I take your picture?"
  }
];

class GameChatComponent extends Component {
  state = {
    messages: MOCK,
    input: ""
  };

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const chatMessage = {
      user: "Kadar",
      text: this.state.input
    };
    this.setState({
      messages: [...this.state.messages, chatMessage],
      input: ""
    });
  }

  render() {
    const { messages, input } = this.state;

    const displayMessages = messages.map((message, index) => {
      return (
        <li key={index} className="chat__item">
          <div className="chat__text">
            <span>{message.user}:</span> {message.text}
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

        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            onChange={e => this.handleChange(e)}
            value={input}
            placeholder="Type your message and press enter..."
            type="text"
            className="chat__input"
          />
        </form>
      </div>
    );
  }
}

export default GameChatComponent;
