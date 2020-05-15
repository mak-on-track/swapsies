import React, { Component } from "react";
import { Link } from "react-router-dom";
import ItemInventory from "./ItemInventory";
import ServiceInventory from "./ServiceInventory";

class Dashboard extends Component {
  state = {};
  render() {
    const {
      username,
      profileImg,
      location,
      bio,
      messages,
      inventory,
    } = this.props.user;

    //Component Did Update - get items

    return (
      <div>
        <hr />
        <div>
          <div>
            <h3>Welcome {username}</h3>
            <ul>
              <li>
                <img src={profileImg} alt="profileImg" />
              </li>
              <li>Location: {location}</li>
              <li>About: {bio}</li>
              <Link to="/edit">Edit Profile</Link>
            </ul>
          </div>
          <div>
            <h3>WishList</h3>
          <p>This will a list of items from the wishList array</p>
          </div>
        </div>
        <div>
        <h3>My Stuff</h3>
        <Link to="/add">Add</Link>
       <ServiceInventory />
       <ItemInventory />
       {/*  For these two lists, make logic so that if there
        are no items either is blank or something like "this user has nothing for you" */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
