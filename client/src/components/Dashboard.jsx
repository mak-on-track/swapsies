import React, { Component } from "react";
import { Link } from "react-router-dom";


class Dashboard extends Component {
  state = {};
  render() {
    console.log(this.props);

   const {username, profileImg, location, bio, messages, inventory} = this.props.user
    return (
      <div>
        <hr />
        <div>
        <h3>Welcome {username}</h3>
        <ul>
          <li><img src={profileImg} alt="profileImg"/></li>
          <li>Location: {location}</li>
          <li>About: {bio}</li>
          <Link to="/edit">Edit Profile</Link>
        </ul>
        </div>
        <div>
          <h3>WishList</h3>
{/*           this will be a foreach function
 */}        </div>
      </div>
    );
  }
}

export default Dashboard;
