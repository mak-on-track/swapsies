import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import "./style/EditProfile.css";

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
      "Prenzlauer Berg",
      "Schöneberg",
      "Wedding",
      "Wilmersdorf",
      "Janz weit draußen",
    ],
    addWish: "",
    deleteWish: "",
    wishList: this.props.user.wishList,
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
    if (wish === "") return
    this.setState({
      wishList: [...this.state.wishList, wish],
      addWish: "",
    });
    console.log("wishlist at end of add wish function", this.state.wishList);
  };

  handleDeleteWish = (event) => {
    const wish = event.target.value;
    const wishList = [...this.state.wishList];
    let index = wishList.indexOf(wish);
    // console.log(wishList, wish, index);
    wishList.splice(index, 1);
    console.log(wishList);
    this.setState({
      wishList: wishList,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let image;
    if (this.state.selectedImage) {
      const uploadData = new FormData();
      // console.log(
      //   this.state.selectedImage,
      //   "this state selected image before upload append"
      // );
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

    const {
      username,
      email,
      //profileImgPath,
      bio,
      wishList,
      location,
      locationOptions,
      addWish,
      deleteWish,
    } = this.state;

    //let wishList = this.props.user.wishList;

    return (
      <div className="main">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Edit your profile</label>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
                value={username}
                id="username"
                placeholder={username}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Profile picture</label>
            <div className="file has-name">
              <label className="file-label">
                <input 
                  className="file-input" 
                  type="file" 
                  // id="file" 
                  name="imageUrl" 
                  onChange={this.handleImageChange}
                />
                
                <span className="file-cta">
                  <span className="file-label">
                    Choose a file
                  </span>
                </span>
                <span className="file-name">
                  {this.state.selectedImage ? this.state.selectedImage.name : "No file chosen"}
                </span>
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="email"
                value={email ? email : undefined}
                id="email"
                placeholder="Add email address"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <div className="select">
                <select
                  id="location"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                >
                  {locationOptions.map((option) => {
                    return (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Bio</label>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    name="bio"
                    value={bio ? bio : undefined}
                    onChange={this.handleChange}
                    id="bio"
                    placeholder="Add your bio"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Wishlist</label>
            <div className="content">
              <div className="edit-wishlist-container">
                {wishList.length === 0 ? (
                  <p>There are no items or services in your wish list</p>
                ) : (
                  wishList.map((wish) => {
                    return (
                      <li key={wish}>
                        {wish}
                        <button
                          className="button is-light"
                          type="button"
                          name="deleteWish"
                          value={wish}
                          onClick={this.handleDeleteWish}
                        >
                          Delete wish
                        </button>
                      </li>
                    );
                  })
                )}
              </div>
            </div>
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="My wish"
                  name="addWish"
                  value={addWish}
                  onChange={this.handleChange}              
                />
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-light"
                  onClick={this.handleWishlistChange}
                >
                  Add item to wish list
                </button>
              </div>
            </div>
          </div>

          <div className="control">
            <button
              type="submit"
              value="submit"
              className="button is-link is-light"
            >
              Update profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfile;
