import React, { Component } from "react";

class AddItem extends Component {
  state = {
    name: "",
    itemImg: "", //could put a "insert image" thing here as a default
    type: "",
    category: "",
    category: "",
  };
  render() {
    return (
      <div>
        <h2>Add an Item</h2>
        {/* For this page use w8d2 "Add Project.js"
         */}{" "}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="type">Is this a product or thing?</label>
          <select id="cars" name="carlist" form="carform">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            {/*             Make this dynamic?
             */}{" "}
          </select>
        </form>
      </div>
    );
  }
}

export default AddItem;
