import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemInventory extends Component {
  state = {};
  render() {
    const { itemsList, user } = this.props;


    const filteredThings = itemsList.filter((thing) => {
      if (thing.type === "Thing" && user.inventory.includes(thing._id))
      return true;
    });

    const displayThings = filteredThings.map((thing) => {
      return (
        <>
        <div key={thing._id}>
        <ul>
          <li>Name: {thing.name}</li>
          <li><img src="" alt="image here"/></li>
          <li>Category: {thing.category}</li>
          <li>Description: {thing.description}</li>
          </ul>
          <label>Status: </label>
          <select
            name="status"
            value={thing.status}
            onChange={this.handleChange}
          >
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Swapped">Swapped</option>
          </select> <br/>
          {/* <button>Edit</button> */}<button id={thing._id} onClick="function(this.id)">Delete</button>
        
          <hr/>
          </div>
        </>
      );
    });

    /*   const thingsList = allItems.map(thing => thing) */

    return (
      <div>
        <h4>List of Things</h4>
        {displayThings.length < 1 ? (
          <Link to="/add">Add an Item</Link>
        ) : (
           displayThings
        )}
      </div>
    );
  }
}

export default ItemInventory;
