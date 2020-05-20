import React, { Component } from "react";
import { login } from "../services/AuthService";
import "./style.css";
import { Link } from "react-router-dom";
import "../style/Home.css"
import "../style/Auth.css";


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
      <>
        <div className="auth-container">
          <form onSubmit={this.handleSubmit}>
            <div className="field input-form">
              <a href="/">
                <img className="auth-logo" src="/icon_swap.png" alt="" />
              </a>
              <h1 className="title is-1">Login</h1>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
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
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
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
                {this.state.message && <p>{this.state.message}</p>}
              </div>
              <div className="field button-group">
                <div className="control">
                  <button
                    type="submit"
                    value="Login"
                    className="button is-link is-light"
                  >
                    Login
                  </button>
                </div>
                <div className="alt-link">
                  <Link to="/signup">
                    <p>Don't have an account yet? Click here to signup!</p>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
