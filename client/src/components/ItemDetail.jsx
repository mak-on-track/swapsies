import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class ItemDetail extends Component {
  state = {
    item: null,
    name: "",
    description: "",
    error: null,
  };

  getData = () => {
    const id = this.props.match.params.id;
    const itemId = this.props.params;
    console.log(id);
    axios.get(`/api/items/${id}`).then((response) => {
      console.log(response);
      this.setState({
        item: response.data,
      });
    });
    // .catch((err) => {
    //   if (err.response.status === 404) {
    //     this.setState({ error: "Item not found" });
    //   }
    // });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    console.log("props", this.props.match.params);
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.item) return <div></div>;
    else
      return (
        <div className="main">
          <h1>Edit item</h1>
          <p>{this.state.item.name}</p>
          <p>{this.state.item.description}</p>
        </div>
      );
  }
}

export default ItemDetail;
