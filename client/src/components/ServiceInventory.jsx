import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import "./style/Inventory.css";

class ServiceInventory extends Component {
  // state = {
  //   delete: false,
  // };

  deleteService = (event) => {
    console.log("event target value", event.target.value);
    // this.setState({
    //   delete: true,
    // });
    axios
      .delete(`/api/items/${event.target.value}`)
      .then((res) => {
        console.log(res.data);
        this.props.setUser(res.data);
        // this.setState({ delete: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    const itemsList = this.props.user.inventory;

    const filteredServices = itemsList.filter((service) => {
      if (service.type === "Service") return true;
    });

    const displayServices = filteredServices.map((service) => {
      return (
        <div className="card inventory-card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure class="image is-96x96">
                  <img src={service.itemImgPath} alt="picture of thing" />
                </figure>
              </div>

              <div className="content">
                <p className="title is-5 is-size-6-mobile has-margin-bottom-1">{service.name}</p>
                <p className="has-margin-bottom-1">
                  Location: {service.location}
                </p>
                <p className="has-margin-bottom-1">
                  Description: {service.description}
                </p>

                {this.props.user._id === this.props.loggedInUser._id ? (
                  <>
                    <div className="buttons are-small inventory-button">
                      <Link to={`/items/${service._id}`}>
                        <button className="button">Edit</button>
                      </Link>
                      <button
                        id={service._id}
                        name={service}
                        value={service._id}
                        onClick={this.deleteService}
                        className="button"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="buttons are-small inventory-button">
                      <Link to={`/swap/${service._id}`}>
                        <button className="button" id={service._id}>
                          Offer Swap
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {displayServices.length < 1 &&
        this.props.loggedInUser._id === this.props.user._id ? (
          <></>
        ) : (
          <div >
            <h4 className="title is-4 is-size-5-mobile has-margin-top-1">List of Services</h4>
            <div className="inventory-container"> {displayServices}</div>
          </div>
        )}
      </div>

      // <div className="main">
      //   {displayServices.length < 1 ? (
      //     this.props.loggedInUser._id === this.props.user._id ? (
      //       <p></p>
      //     ) : (
      //       /* <Link to="/add">Add an Item</Link> */
      //       ""
      //     )
      //   ) : (
      //     <>
      //       {" "}
      //       <h4>List of Services</h4>
      //       {displayServices}
      //     </>
      //   )}
      // </div>
    );
  }
}

export default ServiceInventory;
