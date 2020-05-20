import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

class ItemInventory extends Component {
  deleteItem = (event) => {
    axios
      .delete(`/api/items/${event.target.value}`)
      .then((res) => {
        this.props.setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const itemsList = this.props.user.inventory;

    const filteredThings = itemsList.filter((thing) => {
      if (thing.type === "Thing") return true;
    });

    const displayThings = filteredThings.map((thing) => {
      console.log(thing.itemImgPath, "thing.itemimgpath");
      return (
        <>
          <div className="main" key={thing._id}>
            <ul>
              <li>Name: {thing.name}</li>
              <li>
                <img src={thing.itemImgPath} alt="picture of thing" />
              </li>
              <li>Category: {thing.category}</li>
              <li>Description: {thing.description}</li>

              {this.props.user._id === this.props.loggedInUser._id ? (
                <>
                  <li>Status: {thing.status}</li>
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

    // console.log("logged in user", this.props.loggedInUser._id);
    // console.log("user", this.props.user._id);

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
