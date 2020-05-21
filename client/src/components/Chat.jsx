import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import "./style/Chat.css";
import moment from "moment";

class Chat extends Component {
  state = {
    message: "",
  };

  handleChange = (event) => {
    const { value } = event.target;

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

       return axios
      .put("/api/chat", {
        id: this.props.chat._id,
        messages: [{sentByOwner: fromOwner, msg: this.state.message}]
      })
      .then(() => {
        
        this.setState({
          message: "",
        });
        this.props.setChat();
        this.props.setUser(this.props.user); 
        
     })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {

    const { item, messages, userSend, userReceive } = this.props.chat;
    const chatLog = messages.map((ele) => {
      return (
        <ul className="chat-message">
          {/* List of single messages */}
          <li> {ele.sentByOwner
            ? this.props.user._id === userReceive._id
              ? "You"
              : userReceive.username
            : this.props.user._id === userSend._id
            ? "You"
            : userSend.username}: {" "} {ele.msg}</li>
          <li>
            
            Sent:{" "}{moment(ele.time).format("LLL")}
          </li>
        </ul>
      );
    });

    return (
      <>
        {/* Summary of item for chat */}
        <div style={{"display": "flex"}}>
          <div className="media-left">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{item.name}</strong><br/>
                <small>
                  {item.type} {" · "}{item.status}
                <br/>
                  from {" "}{this.props.user._id === userSend._id ? <a href={`/user/${userReceive._id}`}>{userReceive.username}</a>: <a href={`/user/${userSend._id}`}>{userSend.username}</a> }
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="content">
          {item.description}
        </div>
        <h5 className="title is-5">Thread</h5>
        {chatLog}

        {/* Send message box */}
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="field-body">
              <div className="field">
                <div className="control">

                  <textarea
                    className="textarea"
                    type="text"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    id="message"
                    placeholder="Your message here"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="control">
            <button
              type="submit"
              value="submit"
              className="button is-light"
            >
              Send
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default Chat;
