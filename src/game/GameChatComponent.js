import React, { Component } from "react";
import "./GameChatComponent.css";

import ChatStore from "../store/ChatStore";
import LobbyStore from "../store/LobbyStore";
import { socketAPI } from "../config/";


class GameChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatMessage: "",
      messages: [],
      userId: null
    };
  }

  componentDidMount() {
    ChatStore.getSubject().subscribe(payload => {
      this.setState({
        messages: [...this.state.messages, payload.message]
      });
    });

    LobbyStore.getLocalUserInfo().subscribe(payload => {
      const userId = payload._id;
      this.setState({ userId }, () => {
        this.fetchUser();
      });
    });
  }

  fetchUser() {
    const userId = this.state.userId;
    const url = "http://aws.vlexikon.com:1600/users/" + userId;

    if (userId === undefined) {
      return null;
    }
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + socketAPI.accessToken
      }
    })
      .then(result => result.json())
      .then(res => {
        console.log(url);
        console.log("Resultat", res.name);
        this.setState({ userName: res.name });
      })
      .catch(error => console.log(error));
  }

  handleMessageInput(e) {
    this.setState({ chatMessage: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();

    // User Data
    const data = {
      userId: this.state.userId,
      userName: this.state.userName,
      userMessage: this.state.chatMessage
    };
    const roomId = this.props.roomId;

    if (this.state.chatMessage.length) {
      ChatStore.chat(roomId, data);
    }

    this.setState({ chatMessage: "" });
  }

  render() {
    const { messages, chatMessage, userName, userId } = this.state;

    if (userName !== undefined) {
      console.log("USER:", userName);
    }

    // const test = userId ? <span>{data.userName}:</span> : <span>Kalle:</span>;

    if (userId) {
    }

    const displayMessages = messages.map((data, index) => {
      return (
        <li key={index} className="chat__item">
          <div className="chat__text">
            <span>{data.userName}:</span> {data.userMessage}
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
