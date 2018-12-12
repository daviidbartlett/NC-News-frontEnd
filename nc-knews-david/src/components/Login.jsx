import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    username: ""
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
      </form>
    );
  }
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ username: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    //api.checkUsername(this.state.username).then(console.log);
  };
}

export default Login;
