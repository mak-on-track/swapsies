import React, { Component } from "react";
import { Link } from "react-router-dom";

class ServiceInventory extends Component {
  state = {};
  render() {
    const { itemsList, user } = this.props;

    const filteredServices = itemsList.filter((service) => {
      if (service.type === "Service" && user.inventory.includes(service._id))
        return true;
    });

    const displayServices = filteredServices.map((service) => {
      return (
        <>
          <div key={service._id}>
            <ul>
              <li>Name: {service.name}</li>
              <li>Description: {service.description}</li>
            </ul>
            {/* <button>Edit</button> */}
            <button id={service._id} onClick="function(this.id)">
              Delete
            </button>

            <hr />
          </div>
        </>
      );
    });

    console.log(displayServices);

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
