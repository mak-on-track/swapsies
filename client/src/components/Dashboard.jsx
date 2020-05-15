import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "axios";
import ItemInventory from "./ItemInventory";
import ServiceInventory from "./ServiceInventory";


class Dashboard extends Component {
  state = {
    user: this.props.user,
    email: "",
    profileImg: "",
    bio: "",
    location: "",
    editForm: false,
  };

  render() {
    const user = this.state.user;

    const {
      username,
      profileImg,
      location,
      bio,
      messages,
      inventory,
      _id,
    } = user;
  

    return (
      <div>
        <hr />
        <div>

          <h3>Welcome {username}</h3>

          <ul>
            <li>
              <img
                src={
                  profileImg
                    ?  profileImg 
                    : "https://media.giphy.com/media/gZEBpuOkPuydi/giphy.gif"
                }
                alt="profileImg"
              />
            </li>
            <li>
              Location: {location ?  location  : "Location not yet added"}
            </li>
            <li>Bio: {bio ?  bio  : "Tell us about yourself"}</li>
            <Link to="/edit">Edit profile</Link>
          </ul>
        </div>
        <div>
          <h3>WishList</h3>
          {/* this will be a foreach function need to add this:
            <h3>My Stuff</h3>
        <Link to="/add">Add</Link>
       <ServiceInventory />
       <ItemInventory />
           */}

        </div>
      </div>
    );
  }
}

export default Dashboard;
