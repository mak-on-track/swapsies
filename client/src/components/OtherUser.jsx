import React, { Component } from "react";
import axios from "axios";
import ServiceInventory from "./ServiceInventory";
import ItemInventory from "./ItemInventory";
import "./style.css";

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
    let {
      bio,
      email,
      location,
      profileImgPath,
      username,
      wishList,
    } = this.state.otherUser;

    if (location === "Select Kiez") location = "No Location Selected";

    if (this.state.error) return <div className="main">{this.state.error}</div>;

    if (this.state.otherUser.inventory === 0) {
      return (
        <div className="main">This user currently has nothing to swap</div>
      );
    } else
      return (
        <div className="main">
          
          <div className="card">
            
            <div className="card-image" style={{"padding": "1.5rem"}}>
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  src={
                    profileImgPath
                      ? profileImgPath
                      : "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                  }
                  alt="profileImg"
                />
              </figure>
            </div>

            <div className="card-content">
              <div className="media" style={{ marginBottom: "0.5rem" }}>
                <div className="media-content">
                  <p className="title is-4 is-size-5-mobile">{username}</p>
                  <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                    {email ? email : null}
                    {email && location ? " · " : null}
                    {location ? location : null}
                  </p>
                  <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                    {bio ? bio : null}
                  </p>
                </div>
              </div>
              
              <div className="content wishlist">
                <b>Wishlist</b>
                <ul>                {wishList.length > 0 ? (
                  wishList.map((wish) => {
                    return <li key={wish}>{wish}</li>;
                  })
                ) : (
                  <li>{username} has no wishes yet.</li>
                )}</ul>

              </div>
            </div>
          
          </div>
          <hr />

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
        </div>
      );
  }
}

export default OtherUser;
