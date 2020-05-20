import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "axios";
import ItemInventory from "./ItemInventory";
import ServiceInventory from "./ServiceInventory";
import "./style.css";

class Dashboard extends Component {
  state = {
    /*     user: this.props.user,
     */ editForm: false,
  };

  componentDidMount() {
    console.log("mounting");
    const userId = this.props.user._id;
    return axios
      .get(`/api/user/${userId}`)
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
   // console.log(this.props)
    const user = this.props.user;
   // console.log("this is the dash", user);
    const {
      username,
      profileImgPath,
      location,
      bio,
      email,
      wishList,
      messages,
      inventory,
      _id,
    } = user;

    console.log("wishlist", user.wishList);

    return (
      <div className="main">
        <hr />
        <div>
          <h3>Welcome</h3>

          <ul>
            <li>
              <div className="chip">
                <img
                  src={
                    profileImgPath
                      ? profileImgPath
                      : "https://media.giphy.com/media/gZEBpuOkPuydi/giphy.gif"
                  }
                  alt="profile picture"
                  width="96"
                  height="96"
                />
                {username}
              </div>
            </li>
            <li>{email ? <p>Email: {email}</p> : <p></p>}</li>
            <li>
              {location !== "Select Kiez" || "" ? (
                <p>Kiez: {location}</p>
              ) : (
                <p></p>
              )}
            </li>
            <li>{bio ? <p>Bio: {bio}</p> : <p></p>}</li>
            <li>
              <h3>WishList:</h3>
              <ul>
                {wishList.length !== 0 ? (
                  wishList.map((wish) => {
                    return <li key={wish}>{wish}</li>;
                  })
                ) : (
                  <li>There is nothing in your wish list</li>
                )}
              </ul>
            </li>
          </ul>
          <Link to="/edit">Edit Profile</Link>
        </div>
        <div>
          <h3>My Stuff</h3>
          <Link to="/add">Add</Link>
          <ServiceInventory
            setUser={this.props.setUser}
            user={this.props.user}
            loggedInUser={this.props.user}
          />
          <ItemInventory
            setUser={this.props.setUser}
            user={this.props.user}
            loggedInUser={this.props.user}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
