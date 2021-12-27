import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './Login_Registration.css'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: "",
      redirect: false
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
    const { username, password } = this.state;

    axios.post("http://localhost:8080/login",
        {
          username: username,
          password: password
        },
        { withCredentials: true }
      )
    event.preventDefault();
    this.setState({redirect: true})
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Navigate to='/cabina' />
    }
  }

  render() {
    return (
      <div class='log-reg-wrap'>
        {this.renderRedirect()}
        <form onSubmit={this.handleSubmit} class='form'>
          
          <div class='log_quote'>
            <p class='sign-in'>Sign In</p>
            <p>If you don’t have an account register</p>
            <p>You can <a href='/reg'>Register here</a>!</p>
          </div>
          <p class='lbl'>Username</p>
          <input class='name'
            type="username"
            name="username"
            placeholder="Enter your User name"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <p class='lbl'>Password</p>
          <input class='password'
            // type="password"
            name="password"
            placeholder="Enter your Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit" class='form-btn'>Login</button>
        </form>
      </div>
    );
  }
}
