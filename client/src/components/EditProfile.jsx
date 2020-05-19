import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class EditProfile extends Component {
  state = {
    username: this.props.user.username,
    profileImgPath: this.props.user.profileImgPath || "",
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
    addWish: "",
    wishList: this.props.user.wishList || [],
  };

  handleChange = (event) => {
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
    });
    console.log(
      "this.state.selectedImage before upload: ",
      this.state.selectedImage
    );
  };

  handleWishlistChange = (event) => {
    const wish = this.state.addWish;

    this.setState({
      wishList: [...this.state.wishList, wish],
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let image;
    if (this.state.selectedImage) {
      const uploadData = new FormData();
      console.log(
        this.state.selectedImage,
        "this state selected image before upload append"
      );
      uploadData.append("imageUrl", this.state.selectedImage);
      const uploadedImage = await axios.post(`/api/user/upload`, uploadData);
      image = uploadedImage.data.secure_url;
    } else {
      image = this.props.user.profileImgPath;
    }

    const user = {
      username: this.state.username,
      email: this.state.email,
      bio: this.state.bio,
      location: this.state.location,
      id: this.props.user._id,
      wishList: this.state.wishList,
    };

    axios
      .put(`/api/user/${user.id}`, {
        username: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        profileImgPath: image,
        wishList: user.wishList,
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
      //profileImgPath,
      bio,
      wishList,
      location,
      locationOptions,
      addWish,
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
            onChange={this.handleImageChange}
          />
          <h3>Wish list</h3>
          <ul>
            <li>
              {" "}
              {wishList.length === 0 ? (
                <p>There are no items or services in your wish list</p>
              ) : (
                wishList.map((wish) => {
                  return <p key={wish}>{wish}</p>;
                })
              )}
            </li>
          </ul>

          <input
            type="text"
            name="addWish"
            value={addWish}
            onChange={this.handleChange}
          />

          <button type="button" onClick={this.handleWishlistChange}>
            Add item to wish list
          </button>
          <button type="submit">Update profile</button>
        </form>
      </div>
    );
  }
}

export default EditProfile;
