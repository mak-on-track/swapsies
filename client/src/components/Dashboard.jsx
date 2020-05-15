import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import axios from "axios";

class Dashboard extends Component {
  state = {
    user: this.props.user,
    email: "",
    profileImg: "",
    bio: "",
    location: "",
    editForm: false,
  };

  //to get another user's profile data
  // getUserData = () => {
  //   const userId = this.props.user._id;
  //   axios
  //     .get(`/api/user/${userId}`)
  //     .then((res) => {
  //       console.log(res);
  //       const userData = res.data;
  //       this.setState({
  //         user: userData,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Error getting user info", err);
  //     });
  // };

  // componentDidMount() {
  //   this.getUserData();
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.getUserData();
  //   }
  // }

  render() {
    console.log("props: ", this.props);
    console.log("userID: ", this.props.user._id);
    const user = this.state.user;
    console.log("user: ", user);

    const {
      username,
      profileImg,
      location,
      bio,
      messages,
      inventory,
      _id,
    } = user;

    console.log(username, profileImg, location, bio, messages, inventory, _id);

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
                    ? { profileImg }
                    : "https://media.giphy.com/media/gZEBpuOkPuydi/giphy.gif"
                }
                alt="profileImg"
              />
            </li>
            <li>
              Location: {location ? { location } : "Location not yet added"}
            </li>
            <li>Bio: {bio ? { bio } : "Tell us about yourself"}</li>
            <Link to="/edit">Edit profile</Link>
          </ul>
        </div>
        <div>
          <h3>WishList</h3>
          {/* this will be a foreach function
           */}{" "}
        </div>
      </div>
    );
  }
}

export default Dashboard;
