import React, { Component } from "react";
import axios from "axios";
import ItemInventory from "./ItemInventory";
import ServiceInventory from "./ServiceInventory";
import "./style.css";
import "./style/Dashboard.css";

class Dashboard extends Component {
  state = {
    editForm: false,
  };

  componentDidMount() {
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
    const user = this.props.user;

    let {
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
    //if ((wishList = [])) wishList = null;

    return (
      <div className="main">
        <div className="card">
          <div className="card-container">
            <div className="card-image" style={{ padding: "1.5rem" }}>
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  src={
                    profileImgPath
                      ? profileImgPath
                      : "https://images.unsplash.com/photo-1515160813423-b851dc54a427"
                  }
                  alt="profileImg"
                />
              </figure>
            </div>

            <div className="media">
              <div className="media-content dashboard">
                <p className="title is-2">{username}</p>
                <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                  {email ? email : null}
                  {email && location ? " · " : null}
                  {location ? location : null}
                </p>
                <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                  {bio ? bio : <a href="/edit">Add your bio</a>}
                </p>
              </div>
            </div>

          </div>
          <div className="content wishlist">
            <b>Wishlist</b>
            <ul className="wish-items">
              {wishList.length > 0 ? (
                wishList.map((wish) => {
                  return <li key={wish}>{wish}</li>
                })
              ) : (
                <p className="empty-item">Nothing yet.</p>
              )}
            </ul>
          </div>
          <footer className="card-footer" style={{ padding: "0.5rem" }}>
            <a href="/edit" className="card-footer-item">
              Edit Profile
            </a>
            <a href="/add" className="card-footer-item">
              Add an item
            </a>
          </footer>
        </div>

        <div>
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
