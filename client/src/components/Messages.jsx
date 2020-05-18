import React, { Component } from 'react';
import axios from "axios";


class Messages extends Component {
  state = {  }

/*   componentDidMount() {
    const userId = this.state.user._id;
    return axios
      .get(`/api/user/${userId}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  } */


  
  render() { 
    return ( <div>
      <h2>Sent Swap Offers</h2>

      <h2>Received Swap Offers</h2>

    </div> );
  }
}
 
export default Messages;