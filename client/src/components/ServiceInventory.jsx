import React, { Component } from "react";
import { Link } from "react-router-dom";

class ServiceInventory extends Component {
  state = {
    user: this.props.user,
    loggedInUser: this.props.loggedInUser,
  };

  componentDidUpdate(prevProps) {
    if (this.state.user !== prevProps.user) {
      this.setState({ user: this.props.user });
      this.setState({ loggedInUser: this.props.loggedInUser });
    }
  }

  render() {
    const itemsList = this.state.user.inventory;

    const filteredServices = itemsList.filter((service) => {
      if (service.type === "Service") return true;
    });

    const displayServices = filteredServices.map((service) => {
      return (
        <>
          <div key={service._id}>
            <ul>
              <li>Name: {service.name}</li>
              <li>Description: {service.description}</li>
            </ul>

            {this.state.user._id === this.state.loggedInUser._id ? (
              <>
                {/* <button>Edit</button> */}
                <button id={service._id} onClick="function(this.id)">
                  Delete
                </button>
              </>
            ) : (
              <>
                <button id={service._id} onClick="function(this.id)">
                  Offer Swap
                </button>
              </>
            )}

            <hr />
          </div>
        </>
      );
    });

    return (
      <div>
        <h4>Services Offered</h4>
        {displayServices.length < 1 ? (
          <Link to="/add">Add a Service</Link>
        ) : (
          displayServices
        )}
      </div>
    );
  }
}

export default ServiceInventory;
