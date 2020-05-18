import React, { Component } from "react";
import { Link } from "react-router-dom";

class ServiceInventory extends Component {
  render() {
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
              <li>Description: {service.description}</li>
            </ul>

            {this.props.user._id === this.props.loggedInUser._id ? (
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
        </div>
      );
    });

    return (
      <div className="main">
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
