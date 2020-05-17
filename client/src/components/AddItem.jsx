import React, { Component } from "react";
import axios from "axios";

class AddItem extends Component {
  state = {
    name: "",
    itemImg: "", //could put a "insert image" thing here as a default
    type: "",
    category: "",
    description: "",
    location: this.props.user.location,
    locationOptions: [
      "Select Kiez",
      "Charlottenburg",
      "Friedrichshain",
      "Kreuzberg",
      "Mitte",
      "Moabit",
      "Neukölln",
      "Schöneberg",
      "Wedding",
      "Wilmersdorf",
      "Janz weit draußen",
    ],
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleImageChange = (event) => {};

  handleSubmit = (event) => {
    event.preventDefault();
    let {
      name,
      category,
      location,
      description,
      /* CLOUDINARY */ type,
    } = this.state;

    if (type === "Service") {
      category = "None";
    }
    /* if(type === "Service") {IMAGE IS NULL} */

    return axios
      .post("/api/items", {
        owner: this.props.user._id,
        favourites: 0,
        status: "Available",
        name,
        description,
        location,
        type,
        category,
        /* IMAGE */
      })
      .then((data) => {
        this.setState({
          name: "",
          description: "",
          itemImg: "",
          type: "",
          category: "",
          location: this.props.user.location,
        });
        this.props.setUser(data.data);
        console.log(data);
        this.props.getData();
      })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {
      name,
      description,
      location,
      locationOptions,
      /* CLOUDINARY */ type,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="field">
          <label class="label">Add new item</label>
        </div>

        {/* Dropdown for selecting thing or service */}
        <div class="field">
          <label class="label">Is this a service or thing?</label>
          <div class="control">
            <div class="select">
              <select id="type" name="type" onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="Thing">Thing</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </div>
        </div>

        {/* Only displays when selected type is "thing" */}
        {type !== "Service" && (
          <>
            {/* Dropdown for selecting category */}
            <div class="field">
              <label class="label">Category</label>
              <div class="control">
                <div class="select">
                  <select
                    id="category"
                    name="category"
                    onChange={this.handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Plants">Plants</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Name of item */}
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              id="name"
              placeholder="Name of item"
            />
          </div>
        </div>

        {/* Description of item */}
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input
              class="input"
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              id="description"
              placeholder="Add a description"
            />
          </div>
        </div>

        <label>Location:</label>
        <select name="location" value={location} onChange={this.handleChange}>
          {locationOptions.map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>

        {/* Check for whether type is thing to have functionality of adding image */}
        {type !== "Service" && (
          <>
            <div class="field">
              <label class="label">Add photos</label>
              <div class="control">
                <input
                  type="file"
                  name="itemImageUrl"
                  value={itemImagePath}
                  onChange={this.handleImageChange}
                />
              </div>
            </div>
          </>
        )}

        {/* Submit button */}
        <div class="control">
          <button type="submit" value="add" class="button is-link is-light">
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default AddItem;
