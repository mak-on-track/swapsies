import React, { Component } from 'react';
import axios from "axios";


class Messages extends Component {
  state = {  }

  componentDidMount() {
    this.props.setUser(this.props.user);

/*     const findChats = this.props.match.params.id;
    console.log(findChats)
    return axios
      .get(`/api/chat/${findChats}`)
      .then((response) => {
         console.log(`response data: ${response}`);

      })
      .catch((err) => {
        console.log(err);
      }); */
  }


  
  render() {
console.log(this.props)


    return ( <div>
      <h2>Sent Swap Offers</h2>

      <h2>Received Swap Offers</h2>

    </div> );
  }
}
 
export default Messages;