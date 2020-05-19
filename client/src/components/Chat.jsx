import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Chat extends Component {
  state = {
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      message: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let fromOwner = false;

    if (this.props.user._id === this.props.chat.userReceive._id) {
      fromOwner = true;
    }

    console.log(this.props)
 /*    console.log(fromOwner);
    console.log(this.props.chat._id);
    console.log(this.state.message) */


/*        return axios
      .put("/api/chat", {
        id: this.props.chat._id,
        messages: [{sentByOwner: fromOwner, msg: this.state.message}]
      })
      .then((data) => {
        this.setState({
          message: "",
        });
        this.props.setUser(this.props.user);
     })
      .catch((err) => {
        console.log(err);
      }); */
  };

  render() {
    const { item, messages, userSend, userReceive, _id } = this.props.chat;

    const chatLog = messages.map((ele) => {
      return (
        <div>
          <ul>
            <li>
              From{" "}
              {ele.sentByOwner
                ? this.props.user._id === userReceive._id
                  ? "You"
                  : userReceive.username
                : this.props.user._id === userSend._id
                ? "You"
                : userSend.username}
              : Sent: {ele.time}
            </li>
            <li>{ele.msg}</li>
          </ul>
        </div>
      );
    });

    return (
      <>
        <h3>Item: {item.name}</h3>
        <ul>
          <li>Type: {item.type}</li>
          <li>Description: {item.description}</li>
          <li>Status: {item.status}</li>
          {/*    <li>{this.props.user._id === userSent._id ? Sent to: : Sent by} <Link to={`/user/${userReceive._id}`>{userReceive.username}</Link>}</li> */}
        </ul>
        <h2>Messages:</h2>
        {chatLog}
        <form onSubmit={this.handleSubmit}>
          <textarea
            id="message"
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Your message here"
          />
          <button>Send</button>
        </form>
      </>
    );
  }
}

export default Chat;

/* render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
} */

/*     {location !== "Select Kiez" ? (
      location
    ) : (
      <Link to="/edit">Add a Kiez</Link>
    )} */
