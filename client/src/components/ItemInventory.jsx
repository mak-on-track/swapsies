import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddItem from "./AddItem";

class ItemInventory extends Component {
  // state = {
  //   itemsList: false,
  // };

  deleteItem = (event) => {
    //console.log("event target value", event.target.value);
    console.log("event target value", event.target.value);

    // this.setState({
    //   delete: true,
    // });

    axios
      .delete(`/api/items/${event.target.value}`)
      .then((res) => {
        console.log(res.data);
        this.props.setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.props.user.inventory[0]._id);
    // console.log(this.state.user)

    const itemsList = this.props.user.inventory;

    console.log("itemslist", itemsList);
    const filteredThings = itemsList.filter((thing) => {
      if (thing.type === "Thing") return true;
    });

    const displayThings = filteredThings.map((thing) => {
      return (
        <>
          <div className="main" key={thing._id}>
            <ul>
              <li>Name: {thing.name}</li>
              <li>
                <img src={thing.itemImgPath} alt="item image" />
              </li>
              <li>Category: {thing.category}</li>
              <li>Description: {thing.description}</li>

              {this.props.user._id === this.props.loggedInUser._id ? (
                <>
                  <li>Status: {thing.status}</li>
                  {/*   <label>Status: </label>
                  <select
                    name="status"
                    value={thing.status}
                    onChange={this.handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Swapped">Swapped</option>
                  </select> */}
                  <br />
                  <Link to={`/items/${thing._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    id={thing._id}
                    name={thing}
                    value={thing._id}
                    onClick={this.deleteItem}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <li>Status: {thing.status}</li>
                  <Link to={`/swap/${thing._id}`}>
                    <button id={thing._id}>Offer Swap</button>
                  </Link>
                </>
              )}
            </ul>
            <hr />
          </div>
        </>
      );
    });

    /*   const thingsList = allItems.map(thing => thing) */

    console.log("logged in user", this.props.loggedInUser._id);
    console.log("user", this.props.user._id);

    return (
      <div>
        {displayThings.length < 1 &&
        this.props.loggedInUser._id === this.props.user._id ? (
          <></>
        ) : (
          <div>
            <h4>List of Things</h4>
            <div> {displayThings}</div>
          </div>
        )}
      </div>

      // <div>
      //   {displayThings.length < 1 ? (
      //     this.props.loggedInUser._id === this.props.user._id ? (
      //       <p></p>
      //     ) : (
      //       ""
      //     )
      //   ) : (
      //     <>
      //       {" "}
      //       <h4>List of Things</h4>
      //       {displayThings}
      //     </>
      //   )}
      // </div>
    );
  }
}

export default ItemInventory;
