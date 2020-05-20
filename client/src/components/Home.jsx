import React, { Component } from 'react';
import "./Home.css"

class Home extends Component {
  state = {  }
  render() { 
    return (
      <div className="home">
        <div className="hero-image"></div>
        <div className="hero-text">
          <h1 style={{"fontSize":"50px"}}>
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