import React, { Component } from 'react';

class NotFound extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="main">
        <h1 className="title is-1 has-text-centered is-size-3-mobile">Oops! Page Not Found</h1>
        <p className="has-text-centered">Ok but here is a cute gif for you.</p>
        <figure class="image is-16by9">
          <iframe class="has-ratio" width="640" height="360" src="https://giphy.com/embed/vvbVmC7mKsvOhlmkSz" frameborder="0" allowfullscreen></iframe>
        </figure>

      </div>
    );
  }
}
 
export default NotFound;