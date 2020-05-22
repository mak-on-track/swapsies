import React, { Component } from "react";
import axios from "axios";
import "./style.css"
import "./style/OfferSwap.css"

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
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state)
    const {
      name,
      category,
      location,
      status,
      owner,
      description,
      itemImgPath,
    } = this.state.item;

    return (
      <div className="main">
        <div className="field">
          <label className="label title is-3">Offer a Swap</label>
        </div>
        <div className="card">

          <div className="card-image item-image">
            <figure className="image">
              <img src={itemImgPath} alt="Item image"/>
            </figure>
          </div>

          <div className="card-content">

            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={owner.profileImgPath} alt="User image"/>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">
                  {name}
                </p>
                <p className="subtitle is-6">
                  Posted by <a href={`/user/${owner._id}`}>{owner.username}</a>
                  {owner.email ? " · " + owner.email : null }
                </p>
              </div>
            </div>

            <div className="content">
              <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                {description}
              </p>
              <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                {status} 
                { location ? " · " + location : null}
              </p>
       
                  <form onSubmit={this.handleSubmit}>
                    <textarea
                      className="textarea" 
                      id="offerSwap"
                      name="offerswap"
                      onChange={this.handleChange}
                      placeholder="Hey! Care to swap?"
                      type="text"
                      value={this.state.message}
                      rows="3"
                    />
                    <div className="control" style={{"marginTop":"0.5rem"}}>
                      <button 
                        type="submit"
                        value="submit"
                        className="button positive"
                      >
                        Send message
                      </button>
                    </div>
                  </form>
      
              
            
            </div>
          
          </div>
        
        </div>
      </div>
    )
  }
}

export default OfferSwap;
