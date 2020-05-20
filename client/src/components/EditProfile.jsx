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

    this.setState({
      wishList: [...this.state.wishList, wish],
      addWish: "",
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
    //console.log("this is the wishlist on editprofile line107", wishList);
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
            <div className="control">
              <input
                type="file"
                name="imageUrl"
                onChange={this.handleImageChange}
                className="button"
              />
            </div>
          </div>
    
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="email"
                value={email}
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
            <label class="label">Bio</label>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea
                    className="textarea" 
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={this.handleChange}
                    id="bio"
                    placeholder="Add your bio"
                  >
                  </textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label class="label">Wishlist</label>
            <div class="content">
              <ul>
                {wishList.length === 0 ? (
                  <p>There are no items or services in your wish list</p>
                ) : (
                  wishList.map((wish) => {
                    return <li key={wish}>{wish}</li>;
                  })
                )}
              </ul>
            </div>
            <div class="field has-addons">
              <div class="control">
                <input 
                  class="input" 
                  type="text" 
                  placeholder="Add item"
                  name="addWish"
                  value={addWish}
                  onChange={this.handleChange}
                />
              </div>
              <div class="control">
                <a className="button is-light" onClick={this.handleWishlistChange}>
                  Add item to wish list
                </a>
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
