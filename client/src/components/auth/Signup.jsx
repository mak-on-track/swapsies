import React, { Component } from "react";
import { signup } from '../services/AuthService';
import "./style.css"

class Signup extends Component {
  state = {
    username: '',
    password: '',
    message: ''
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    signup(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: '',
          password: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/dashboard');
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field input-form">
          <h1>Sign Up</h1>  
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input 
                class="input" 
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
                placeholder="My username"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input 
                class="input"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
                placeholder="My password" 
              />
            </div>
          </div>
          <div className="notice">
            {this.state.message && (
              <p>{this.state.message}</p>
            )}
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button type="submit" value="Signup" class="button is-link is-light">Sign up</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
  
        </div>
      </form>
    );
  }
}

export default Signup;
