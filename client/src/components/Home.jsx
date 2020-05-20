import React, { Component } from 'react';
import "./style/Home.css"

class Home extends Component {
  state = {  }

  render() { 
    return (
      <div className="hero-image">
        <div className="hero-text">
          <h1 style={{"fontSize":"4.5rem"}}>
            Swapsies
          </h1>
          <h3>
            Have an item you don't want anymore?<br/>
            You know how to cook, sing or maybe code and could give an intro over video chat?<br/>
            On swapsies you'll find other people for swapping!
          </h3>
          <div className="buttons" style={{"display": "block", "margin": "1rem"}}>
            <a className="button is-link is-light" href="/signup">Sign up</a>
            <a className="button is-link is-light" href="/login">Log in</a>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Home;