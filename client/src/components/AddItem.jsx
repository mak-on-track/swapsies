import React, { Component } from "react";
import axios from "axios";
import "./style.css"

class AddItem extends Component {
  state = {
    name: "",
    itemImg: "", //could put a "insert image" thing here as a default
    type: "",
    category: "",
    description: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { name, category, description, /* CLOUDINARY */ type } = this.state;

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
        });
        this.props.setUser(data.data);
        console.log(data)
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
    const { name, description, /* CLOUDINARY */ type } = this.state;
    return (
      <div className="main">
        <form onSubmit={this.handleSubmit}>
          <div class="field">
            <label class="label">Add new item</label>
          </div>

          {/* Dropdown for selecting thing or service */}
          <div class="field">
            <label class="label">Is this a service or thing?</label>
            <div class="control">
              <div class="select">
                <select 
                  id="type" 
                  name="type" 
                  onChange={this.handleChange}
                >
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

          {/* Check for whether type is thing to have functionality of adding image */}
          {type !== "Service" && (
            <>
              <div class="field">
                <label class="label">Add image</label>
                <div class="control">
                  <input
                    type="file" 
                    name="itemImg"
                  />
                </div>
              </div>
            </>
          )}

          {/* Submit button */}
          <div class="control">
            <button type="submit" value="add" class="button is-link is-light">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddItem;
