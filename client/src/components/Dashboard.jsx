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
    const user = this.props.user;
    console.log("this is the dash", user);
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
                  alt="profileImg"
                  width="96"
                  height="96"
                />
                {username}
              </div>
            </li>
            <li>Email:{email ? email : <Link to="/edit"></Link>}</li>
            <li>
              Kiez:{" "}
              {location !== "Select Kiez" ? (
                location
              ) : (
                <Link to="/edit">Add a Kiez</Link>
              )}
            </li>
            <li>
              Bio:{" "}
              {bio ? bio : <Link to="/edit">Add some info to your bio</Link>}
            </li>
            {/* <Link to="/edit">Edit Profile</Link> */}
            <li>
              <h3>WishList:</h3>
              <ul>
                {wishList ? (
                  wishList.map((wish) => {
                    return <li key={wish}>{wish}</li>;
                  })
                ) : (
                  <div>
                    <p>There is nothing in your wish list</p>
                  </div>
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
            user={this.props.user}
            loggedInUser={this.props.user}
          />
          <ItemInventory
            user={this.props.user}
            loggedInUser={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
