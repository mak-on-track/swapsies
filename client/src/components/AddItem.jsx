import React, { Component } from "react";
import axios from "axios";

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

    //console.log(name)
    //console.log(value)

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { name, category, description, /* CLOUDINARY */ type } = this.state;
    console.log("submitted");
    console.log(category);

    if(type === "Service") {category = null}
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
      .then(() => {
        this.setState({
          name: "",
          description: "",
          itemImg: "",
          type: "",
          category: "",
        });
        // update state in dashboard by executing getData()
        /*   this.props.getData(); */
      }).then(() => {
        this.props.history.push("/dashboard")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { name, description, /* CLOUDINARY */ type } = this.state;
    return (
      <div>
        <h2>Add an Item</h2>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="type">Is this a product or thing? </label>
          <select id="type" name="type" onChange={this.handleChange}>
            <option value="">Select</option>
            <option value="Thing">Thing</option>
            <option value="Service">Service</option>
          </select>
          <br />
          {type !== "Service" && (
            <>
              {" "}
              <label htmlFor="type">Category: </label>
              <select
                id="category"
                name="category"
                onChange={this.handleChange}
              >
                <option value="">Select</option>
                <option value="Furniture">Furniture</option>
                <option value="Plants">Plants</option>
              </select>
            </>
          )}
          <br />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            id="name"
          ></input>
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            value={description}
            onChange={this.handleChange}
            name="description"
            id="description"
          />
          <br />

          {type !== "Service" && (
            <>
              <label>Add image:</label>
              <input type="file" name="itemImg"></input> <br />{" "}
            </>
          )}

          <button type="submit">Add!</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
