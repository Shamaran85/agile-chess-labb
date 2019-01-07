import React, { Component } from "react";
import "./GameChatComponent.css";

import ChatStore from "../store/ChatStore";

class GameChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatMessage: "",
      messages: []
    };
  }

  componentDidMount() {
    ChatStore.getSubject().subscribe(payload => {
      this.setState({
        messages: [...this.state.messages, payload.message]
      });
    });
  }

  handleMessageInput(e) {
    this.setState({ chatMessage: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();

    // Mock Data
    const data = {
      userId: 123,
      userName: "Kadar",
      userMessage: this.state.chatMessage
    };

    if (this.state.chatMessage.length) {
      ChatStore.chat(data);
    }

    this.setState({ chatMessage: "" });
  }

  render() {
    const { messages, chatMessage } = this.state;

    const displayMessages = messages.map((data, index) => {
      return (
        <li key={index} className="chat__item">
          <div className="chat__text">
            <span>{data.userName}</span> {data.userMessage}
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
            onChange={e => this.handleMessageInput(e)}
            value={chatMessage}
            placeholder="Type your message here..."
            type="text"
            className="msg__input"
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
