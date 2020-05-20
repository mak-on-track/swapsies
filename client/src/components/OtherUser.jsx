import React, { Component } from "react";
import axios from "axios";
import ServiceInventory from "./ServiceInventory";
import ItemInventory from "./ItemInventory";

class OtherUser extends Component {
  state = {
    otherUser: this.props.user, //silly fix otherwise componentDidMount never runs causing nested components to fail
    error: null,
  };

  componentDidMount() {
    const findUser = this.props.match.params.userId;
    return axios
      .get(`/api/user/${findUser}`)
      .then((response) => {
        console.log(`response data: ${response.data}`);

        this.setState({ otherUser: response.data });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          this.setState({ error: "User not found" });
        }
      });
  }

  render() {
    console.log("props", this.props);
    console.log("this state other user", this.state.otherUser.inventory);
    if (this.state.error) return <div>{this.state.error}</div>;
    if (this.state.otherUser.inventory === 0)
      return <div>This user currently has nothing to swap</div>;
    else
      return (
        <div>
          <ItemInventory
            user={this.state.otherUser}
            loggedInUser={this.props.user}
          />
          <ServiceInventory
            user={this.state.otherUser}
            loggedInUser={this.props.user}
          />
        </div>
      );
  }
}

export default OtherUser;
