import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class OfferSwap extends Component {
  state = {
    item: "",
    userSend: "",
    userReceive: "",
    message: "",
 /*    time: new Date(), */
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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      message: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.message); //message
    console.log(this.props.user._id) //sending user ID
    console.log(this.state.item._id) //itemID
    console.log(this.state.item.owner._id) //owner Id


    return axios
      .post("/api/chat", {
        userSend: this.props.user._id,
        userReceive: this.state.item.owner._id,
        item: this.state.item._id,
        messages: [{sentByOwner: false, msg: this.state.message}]
      })
      .then((data) => {
        this.setState({
          item: "",
          userSend: "",
          userReceive: "",
          message: "",
        });
        this.props.setUser(this.props.user); //check if data.data is right
        //this.props.getData();
      })
      .then(() => {
        this.props.history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };




  render() {
    const {
      name,
      category,
      location,
      status,
      owner,
      description /* IMAGE */,
    } = this.state.item;

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
          <li>Status: {status}</li>
          <li>Can also put user's image here</li>

          {/*         <li>
            Posted by: <Link to={`/user/${owner._id}`}>Something</Link>
          </li> */}
        </ul>
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="offerSwap">Description</label>
          <textarea id="offerSwap"  onChange={this.handleChange} value={this.state.message}>Offer Swap</textarea>
          <button>Send</button>
        </form>
      </>
    );
  }
}

export default OfferSwap;
