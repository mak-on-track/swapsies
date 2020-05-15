import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
  state = {
    username: this.props.user.username,
    profileImg: this.props.user.profileImg,
    bio: this.props.user.bio,
    location: this.props.user.location,
    email: this.props.user.email,
    locationOptions: ["Prenzlauer Berg", "Mitte", "Kreuzberg"],
  };

  handleChange = (event) => {
    console.log("this is the event", event.target);
    const { name, value } = event.target;
    //event.target.value = value;
    this.setState({
      [name]: value,
    });
  };

  //axios request

  handleSubmit = (event) => {
    event.preventDefault();
    // const uploadData = new FormData();
    // uploadData.append("imageUrl", event.target.files[0]); //cloudinary needed
    const user = {
      username: this.state.username,
      email: this.state.email,
      bio: this.state.bio,
      location: this.state.location,
      profileImg: this.state.profileImg, //uploadData,
      id: this.props.user._id,
    };
    axios
      .put(`/api/user/${user.id}`, {
        username: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        profileImg: user.profileImg,
      })
      .then((res) => {
        console.log(res);
        const userData = res.data;
        this.props.setUser(userData); //setUser method to change user in app.js
      })
      .catch((err) => {
        console.log("Error updating user info", err);
      });
  };

  getUserData = () => {
    const userId = this.props.user._id;
    axios
      .get(`/api/user/${userId}`)
      .then((res) => {
        console.log(res);
        const userData = res.data;
        this.setState({
          user: userData,
        });
      })
      .catch((err) => {
        console.log("Error getting user info", err);
      });
  };

  //to get updated info from database
  // componentDidMount = () => {
  //   this.updateUserData();
  // };

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.getUserData();
  //   }
  // }

  render() {
    console.log("this is the props", this.props);
    console.log("this is the user", this.state);
    const {
      username,
      email,
      profileImg,
      bio,
      wishlist,
      location,
      locationOptions,
    } = this.state;

    return (
      <div>
        <h2>Edit your profile:</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />

          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Location:</label>
          <select name="location" value={location} onChange={this.handleChange}>
            {locationOptions.map((option) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <label>Profile pic:</label>
          <input
            type="file"
            name="profileImg"
            value={profileImg}
            onChange={this.handleChange}
          />
          <button type="submit">Update profile</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
