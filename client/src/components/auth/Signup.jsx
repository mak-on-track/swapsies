import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from '../services/AuthService';



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
        this.props.history.push('/');
      }
    });
  };



  render() {
    return (
      <div>
      <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            id='username'

          />

          <label htmlFor='password'>Password:</label>
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
              id='password'
          />

          <input type="submit" value="Signup" />

    
          {this.state.message && (
            <p>{this.state.message}</p>
          )}
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
