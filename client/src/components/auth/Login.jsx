import React, { Component } from "react";
import { login } from "../services/AuthService";
import { Link } from "react-router-dom";
import "./Login.css"


class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password).then((data) => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: "",
        });
      } else {

        this.props.setUser(data);
        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    return (
      <div className="field login">

        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
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
              placeholder="My password" 
              value=""
            />
          </div>
        </div>
        
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
        
        <form>
          <p>Jello</p>
          {this.state.message && (
            <p>{this.state.message}</p>
          )}
        </form>
      </div>);
  }
}

export default Login;
