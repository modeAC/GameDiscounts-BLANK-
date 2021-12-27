import React, { Component } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';

import './Login_Registration.css'

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
      registrationErrors: "",
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
    const { email, password, username } = this.state;

    axios.post("http://localhost:8080/register",
        {
          email: email,
          password: password,
          username: username
        }, {withCredentials: true}
      ).then(res => {
        setTimeout(function(){
          axios.post("http://localhost:8080/login",
            {
              username: username,
              password: password
            },
            { withCredentials: true }
          )
      }, 3000);
      }
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
        <form onSubmit={this.handleSubmit} class='form' autocomplete="off">

          <div class='log_quote'>
            <p class='sign-in'>Sign Un</p>
            <p>If you already have an account</p>
            <p>You can <a href='/reg'>Login here</a>!</p>
          </div>

          <p class='lbl'>Username</p>
          <input class='name'
              type="username"
              name="username"
              placeholder="Enter your User name"
              autocomplete="off"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          <p class='lbl'>Email</p>
          <input class='email'
            type="email"
            name="email"
            placeholder="Enter your email address"
            autocomplete="off"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <p class='lbl'>Password</p>
          <input class='password'
            type="password"
            name="password"
            placeholder="Enter your Password"
            autocomplete="off"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit" class='form-btn'>Register</button>
        </form>
        <p>{this.state.registrationErrors}</p>
      </div>
    );
  }
}
