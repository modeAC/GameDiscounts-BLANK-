import React, { Component } from "react";
import axios from "axios";

import './Login_Registration.css'

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password, username } = this.state;

    axios.post("http://localhost:8080/register",
        {
          email: email,
          password: password,
          username: username
        }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        this.state.registrationErrors = {error}
      });
    event.preventDefault();
    // axios.post("http://localhost:8080/login"), 
    // {
    //   username: username,
    //   password: password
    // }
  }

  render() {
    return (
      <div class='log-reg-wrap'>
        <form onSubmit={this.handleSubmit}>
          <input
              type="username"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
        <p>{this.state.registrationErrors}</p>
      </div>
    );
  }
}
