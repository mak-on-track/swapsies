import React, { Component } from "react";
import axios from "axios";
import ServiceInventory from "./ServiceInventory";
import ItemInventory from "./ItemInventory";

class OtherUser extends Component {
  state = {
    loggedInUser: this.props.user,
    otherUser: this.props.user,  //silly fix otherwise componentDidMount never runs causing nested components to fail
  };

  componentDidMount() {
    const findUser = this.props.match.params.userId;
    return axios
      .get(`/api/user/${findUser}`)
      .then((response) => {
       // console.log(`response data: ${response.data}`);
        
      this.setState({ otherUser: response.data });

      })
      .catch((err) => {
        console.log(err);
      });
  }


  

  render() {
    return (
      <div>
{/*       Need logic here that if empty/undefined do not show
 */}        <ItemInventory user={this.state.otherUser} loggedInUser={this.state.loggedInUser}/>
        <ServiceInventory user={this.state.otherUser} loggedInUser={this.state.loggedInUser}/>
      </div>
    );
  }
}

export default OtherUser;
