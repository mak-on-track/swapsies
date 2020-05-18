import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class OfferSwap extends Component {
  state = {
    item: "",
    userSend: "",
    userReceive: "",
    time: new Date(),
  };

  componentDidMount() {
    const findItem = this.props.match.params.item;
    return axios
      .get(`/api/items/${findItem}`)
      .then((response) => {
        this.setState({ item: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function to post message

  render() {
    // console.log(this.props.user)
    const {
      name,
      category,
      location,
      status, wishList,
      owner,
      description /* IMAGE */,
    } = this.state.item;

    console.log(owner);
    return (
      <>
        <h2>Offer a Swap</h2>

        <ul>
          <li>Name: {name}</li>
          <li>
            <img src="" alt="item image" />
          </li>
          <li>Description: {description}</li>
          <li>Location: {location}</li>
          <li>Wishlist: {wishList}</li>
          <li>Status: {status}</li>
          <li>Can also put user's image here</li>
         
  {/*         <li>
            Posted by: <Link to={`/user/${owner._id}`}>Something</Link>
          </li> */}
        </ul>
        <form>
        <textarea>Offer Swap</textarea>
        <button>Send</button>
        </form>
      </>
    );
  }
}

export default OfferSwap;
