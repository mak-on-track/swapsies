import React, { Component } from "react";
import { login } from "../services/AuthService";
import "./style.css"


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
      <form onSubmit={this.handleSubmit}>
        <div className="field input-form">
          <h1>Login</h1>
           <div className="field">
            <label class="label">Username</label>
             <div className="control">
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

           <div className="field">
            <label class="label">Password</label>
             <div className="control">
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
           <div className="field is-grouped">
             <div className="control">
              <button type="submit" value="Login" class="button is-link is-light">Login</button>
            </div>
             <div className="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
          
        </div>
      </form>
    )
  }
}

export default Login;
