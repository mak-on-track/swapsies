import React, { Component } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import ItemInventory from "./ItemInventory";
import ServiceInventory from "./ServiceInventory";
import "./style.css";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    /*     user: this.props.user,
     */ editForm: false,
  };

  componentDidMount() {
    console.log("mounting");
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
    // console.log(this.props)
    const user = this.props.user;
    console.log("this is the user from props", user);

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

    if (location === "Select Kiez") location = null;

    return (
      <div className="main">
        <div className="card">
          <div class="card-image">
            <figure class="image is-1by1">
              <img
                class="is-rounded"
                src={
                  profileImgPath
                    ? profileImgPath
                    : "https://images.unsplash.com/photo-1515160813423-b851dc54a427"
                }
                alt="profileImg"
              />
            </figure>
          </div>

          <div className="card-content">
            <div className="media" style={{ marginBottom: "0.5rem" }}>
              <div className="media-content">
                <p className="title is-4">{username}</p>
                <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                  {email ? email : <a href="/edit">Add an email</a>}
                  {" · "}
                  {location ? location : <a href="/edit">Add your Kiez</a>}
                </p>
                <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                  {bio ? bio : <a href="/edit">Add some info to your bio</a>}
                </p>
              </div>
            </div>

            <div className="content">
              <b>WishList:</b>
              {wishList ? (
                wishList.map((wish) => {
                  return <li key={wish}>{wish}</li>;
                })
              ) : (
                <p>There is nothing in your wish list</p>
              )}
            </div>
          </div>

          <footer class="card-footer">
            <a href="/edit" class="card-footer-item">
              Edit Profile
            </a>
            <div class="card-footer-item">
              Do something, maybe add some stuff?
            </div>
          </footer>
        </div>

        <div>
          <h3>My Stuff</h3>
          <a href="/add">Add</a>
          <ServiceInventory
            setUser={this.props.setUser}
            user={this.props.user}
            loggedInUser={this.props.user}
          />
          <ItemInventory
            setUser={this.props.setUser}
            user={this.props.user}
            loggedInUser={this.props.user}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
