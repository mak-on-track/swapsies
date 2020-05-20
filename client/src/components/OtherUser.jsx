import React, { Component } from "react";
import axios from "axios";
import ServiceInventory from "./ServiceInventory";
import ItemInventory from "./ItemInventory";
import "./style.css";
import "./style/OtherUser.css";

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
        //  console.log(`response data: ${response.data}`);

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
    // console.log("props", this.props);

    let {
      bio,
      email,
      location,
      profileImgPath,
      username,
      wishList,
    } = this.state.otherUser;

    if (location === "Select Kiez") location = "No Location Selected";

    const displayWishList = wishList.map((wish) => {
      return (
        <>
          <li>{wish}</li>
        </>
      );
    });

    console.log("this state other user", this.state.otherUser);
    if (this.state.error) return <div className="main">{this.state.error}</div>;
    if (this.state.otherUser.inventory === 0) {
      return (
        <div className="main">This user currently has nothing to swap</div>
      );
    } else
      return (
        <div className="main">
          <div className="flex-profile">
            <figure>
              <img className= "is-rounded" src={profileImgPath} alt="profile-imgage" />
            </figure>
            <div>
              <h2 className="title">{username}</h2>
              <p>Email: {email}</p>
              <p>Bio: {bio}</p>
              <p>Kiez: {location}</p>
              <p>{username}'s Wishlist: </p>
              <ul>{displayWishList}</ul>
            </div>
          </div>
          <hr />

          <div>
            <h2>Inventory:</h2>
            <ItemInventory
              user={this.state.otherUser}
              loggedInUser={this.props.user}
            />
            <ServiceInventory
              user={this.state.otherUser}
              loggedInUser={this.props.user}
            />
          </div>
        </div>
      );
  }
}

export default OtherUser;
