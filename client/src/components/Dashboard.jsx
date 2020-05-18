import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "axios";
import ItemInventory from "./ItemInventory";
import ServiceInventory from "./ServiceInventory";

class Dashboard extends Component {
  state = {
    user: this.props.user,
/*     email: "", 
    profileImg: "",
    bio: "",
    location: "", */ //Commented out probably not needed (all runs off user)
    editForm: false,
  };

  componentDidMount() {
    console.log('dashmount')

    const userId = this.state.user._id;
    return axios
      .get(`/api/user/${userId}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {


    
    const user = this.state.user;

    console.log(this.state.user)

    const {
      username,
      profileImg,
      location,
      bio,
      wishlist,
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
                    ? profileImg
                    : "https://media.giphy.com/media/gZEBpuOkPuydi/giphy.gif"
                }
                alt="profileImg"
              />
            </li>
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
              {bio ? bio : <Link to="/edit">Say a bit about yourself!</Link>}
            </li>
            <Link to="/edit">Edit Profile</Link>
          </ul>
        </div>
        <div>
          <h3>WishList</h3>
          <ul>{/*  {wishList} */}</ul>
          <h3>My Stuff</h3>
          <Link to="/add">Add</Link>
          <ServiceInventory user={this.state.user} loggedInUser ={this.state.user} />
          <ItemInventory user={this.state.user} loggedInUser ={this.state.user}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
