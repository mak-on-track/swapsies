import React, { Component } from "react";
import axios from "axios";
import "./style.css";
//const uploadCloud = require("../config/cloudinary.js");

class EditProfile extends Component {
  state = {
    username: this.props.user.username,
    profileImgPath: this.props.user.profileImgPath,
    selectedImage: null,
    bio: this.props.user.bio,
    email: this.props.user.email,
    location: this.props.user.location,
    locationOptions: [
      "Select Kiez",
      "Charlottenburg",
      "Friedrichshain",
      "Kreuzberg",
      "Mitte",
      "Moabit",
      "Neukölln",
      "Schöneberg",
      "Wedding",
      "Wilmersdorf",
      "Janz weit draußen",
    ],
  };

  handleChange = (event) => {
    //console.log("this is the event", event.target);
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      profileImgPath: this.state.profileImgPath,
    });
  };

  handleImageChange = (event) => {
    console.log("this is the event.target.files[0]", event.target.files[0]);
    this.setState({
      selectedImage: event.target.files[0],
      loaded: 0,
      profileImgPath:
        event.target.files[0] ||
        this.props.profileImgPath ||
        "../../public/icon_swap.png",
    });
    console.log(
      this.state.selectedImage,
      "this state selected image before upload"
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const uploadData = new FormData();
    console.log(
      this.state.selectedImage,
      "this state selected image before upload append"
    );
    uploadData.append(
      "imageUrl",
      this.state.selectedImage,
      this.state.selectedImage.name
    ); //i.e. event.target.files[0] -  needed for cloudinary
    console.log(
      this.state.selectedImage,
      "this state selected image after upload append"
    );
    // console.log(uploadData, "uploadData variable"); not possible to console.log formData in this way see FormData docs
    const user = {
      username: this.state.username,
      email: this.state.email,
      bio: this.state.bio,
      location: this.state.location,
      profileImgPath: uploadData,
      id: this.props.user._id,
      selectedImage: uploadData, //this.state.selectedImage,
    };
    axios
      // .put(`/api/user/${user.id}`, {
      .put("https://api.cloudinary.com/v1_1/dsxr5ymph", {
        username: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        //profileImgPath: user.selectedImage, //uploadData,
        selectedImage: uploadData,
      })
      .then((res) => {
        console.log(res);
        const userData = res.data;
        this.props.setUser(userData); //setUser method to change user in app.js
      })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log("Error updating user info", err);
      });
  };

  render() {
    // console.log("this is the props", this.props);
    // console.log("this is the user", this.state);
    const {
      username,
      email,
      profileImgPath,
      bio,
      wishlist,
      location,
      locationOptions,
    } = this.state;

    return (
      <div className="main">
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
            placeholder="Tell us about yourself"
            value={bio}
            onChange={this.handleChange}
          />

          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Add email address"
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
            name="imageUrl"
            //value={profileImgPath}
            placeholder="Upload a profile picture"
            onChange={this.handleImageChange}
          />
          <button type="submit">Update profile</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
