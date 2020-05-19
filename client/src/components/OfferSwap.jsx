import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class OfferSwap extends Component {
  state = {
    item: { owner: "" },
    userSend: "",
    userReceive: "",
    message: "",
    owner: "",
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
  };

  handleSubmit = (event) => {
    event.preventDefault();

    return axios
      .post("/api/chat", {
        userSend: this.props.user._id,
        userReceive: this.state.item.owner._id,
        item: this.state.item._id,
        messages: [{ sentByOwner: false, msg: this.state.message }],
      })
      .then((data) => {
        this.setState({
          item: { owner: "" },
          userSend: "",
          userReceive: "",
          message: "",
        });
        this.props.setUser(this.props.user);
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
          <li>
            Posted by: <Link to={`/user/${owner._id}`}>{owner.username}</Link>
          </li>
          <li>Status: {status}</li>

          <li>Name: {name}</li>
          <li>
            <img src="" alt="item image" />
          </li>
          <li>Description: {description}</li>

          <li>Location: {location}</li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <textarea
            id="offerSwap"
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Send a Message"
          />
          <button>Submit</button>
        </form>
      </>
    );
  }
}

export default OfferSwap;
