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
          <div className="card">
            <div className="card-content">
              <div class="media">
                <div className="card-image">
                  <figure class="image is-96x96">
                    <img src={thing.itemImgPath} alt="picture of thing" />
                  </figure>
                </div>

                <div className="card-content">
                  <p>Name: {thing.name}</p>

                  <p>Category: {thing.category}</p>
                  <p>Description: {thing.description}</p>
                </div>
              </div>
            </div>
            {this.props.user._id === this.props.loggedInUser._id ? (
              <>
                {/*    <p>Status: {thing.status}</p> */}

                <footer class="card-footer">
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
                </footer>
              </>
            ) : (
              <>
                {/*   <div>
                  <p>Status: {thing.status}</p>
                  </div> */}
                <footer class="card-footer">
                  <Link to={`/swap/${thing._id}`}>
                    <button id={thing._id}>Offer Swap</button>
                  </Link>
                </footer>
              </>
            )}
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
