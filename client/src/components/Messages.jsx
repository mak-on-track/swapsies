import React, { Component } from "react";
import axios from "axios";
import Chat from "./Chat";

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
   // console.log(this.props)
    const userId = this.props.user._id;
/* console.log(this.state.chatList) */
    const incomingFilter = this.state.chatList.filter((msg) => {
     //console.log(msg)
      return msg.userReceive._id === userId;
    });

    const incomingMsg = incomingFilter.map((msg) => {
   //   console.log(msg)
      return (
        <div> 
        <Chat setUser={this.props.setUser} setChat={this.setChat} chat={msg} user={this.props.user}/>
          </div>
      );
    });

    const outgoingFilter = this.state.chatList.filter((msg) => {
      //console.log(msg)
       return msg.userSend._id === userId;
     });

     const outgoingMsg = outgoingFilter.map((msg) => {
      //   console.log(msg)
         return (
           <div> 
           <Chat setUser={this.props.setUser} chat={msg} setChat={this.setChat}  user={this.props.user} />
             </div>
         );
       });



    return (
      <div>
        <h2>Incoming Offers</h2>
        <hr/>
        {incomingMsg}
        <hr/>
        <hr/>
        <h2>Sent Offers</h2>
        <hr/>
        {outgoingMsg}
      </div>
    );
  }
}

export default Messages;

