import React, { Component } from "react";
import axios from "axios";
import Chat from "./Chat";
import "./style.css";
import "./style/Messages.css"

class Messages extends Component {
  state = {
    chatList: [],
  };

  componentDidMount() {
    const user = this.props.match.params.id;
    return axios
      .get(`/api/chat/${user}`)
      .then((response) => {
        this.setState({ chatList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setChat = (data) => {
    const user = this.props.match.params.id;
    return axios
      .get(`/api/chat/${user}`)
      .then((response) => {
        this.setState({ chatList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const userId = this.props.user._id;
    const incomingFilter = this.state.chatList.filter((msg) => {
      return msg.userReceive._id === userId && msg.item !== null;
    });

    const incomingMsg = incomingFilter.map((msg) => {
      return (
        <Chat
          setUser={this.props.setUser}
          setChat={this.setChat}
          chat={msg}
          user={this.props.user}
        />
      );
    });

    const outgoingFilter = this.state.chatList.filter((msg) => {
      return msg.userSend._id === userId && msg.item !== null;
    });

    const outgoingMsg = outgoingFilter.map((msg) => {
      return (
        <Chat
          setUser={this.props.setUser}
          chat={msg}
          setChat={this.setChat}
          user={this.props.user}
        />
      );
    });

    return (
      <div className="main in-out-msg">

        <div className="field thread">
          <h4 className="title is-4">Incoming Swap Requests</h4>
          {incomingMsg.length < 1 && <p>Nothing yet.</p>}
          {incomingMsg}
        </div>

        <div className="field thread">
          <h4 className="title is-4">Outgoing Swap Offers</h4>
          {outgoingMsg.length < 1 && <p>Nothing yet.</p>}
          {outgoingMsg}
        </div>
      </div>
    );
  }
}

export default Messages;
