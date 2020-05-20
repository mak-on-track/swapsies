import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    //console.log(this.props)
    const itemsList = this.props.user.inventory;

    const filteredServices = itemsList.filter((service) => {
      if (service.type === "Service") return true;
    });

    const displayServices = filteredServices.map((service) => {
      return (
        <div className="main">
          <div key={service._id}>
            <ul>
              <li>Name: {service.name}</li>
              <li>
                <img src={service.itemImgPath} alt="item image" />
              </li>
              <li>Description: {service.description}</li>
              <li>Location(s): {service.location}</li>

              {this.props.user._id === this.props.loggedInUser._id ? (
                <>
                  <Link to={`/items/${service._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    id={service._id}
                    name={service}
                    value={service._id}
                    onClick={this.deleteService}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <li>Status: {service.status}</li>
                  <Link to={`/swap/${service._id}`}>
                    <button id={service._id}>Offer Swap</button>
                  </Link>
                </>
              )}
            </ul>
            <hr />
          </div>
        </div>
      );
    });

    return (
      <div className="main">
        {displayServices.length < 1 ? (
          this.props.loggedInUser._id === this.props.user._id ? (
            <p></p>
          ) : (
            /* <Link to="/add">Add an Item</Link> */
            ""
          )
        ) : (
          <>
            {" "}
            <h4>List of Services</h4>
            {displayServices}
          </>
        )}
      </div>
    );
  }
}

export default ServiceInventory;
