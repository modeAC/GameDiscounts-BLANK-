import React, { Component } from "react";
import "./log-reg.css"
import { Link } from "react-router-dom";
import axios from "axios";

class LogReg extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            username: null,
            lr_opacity: 'flex',
            c_opacity: 'none'
        }
    }

    componentDidMount() {
        this.setState({username: null,
            lr_opacity: 'flex',
            c_opacity: 'none'});
        axios.get(`http://localhost:8080/username`).then(res => {
            const username = res.data;
            if (username != null){
                this.setState({username: username.username, lr_opacity: 'none', c_opacity: 'flex'})
            }
        })
    }

    render() { 
        return (
            <div class="log-reg">
                <Link to='/log' style={{display: `${this.state.lr_opacity}`}}>
                <button class="login">Log In</button>
                </Link>
                <Link to='/reg' style={{display: `${this.state.lr_opacity}`}}>
                <button to='/reg' role="button" class="register">Register</button>
                </Link>
                <Link to='/cabina' style={{display: `${this.state.c_opacity}`}}>
                <button class='register'>{this.state.username}</button>
                </Link>
            </div>
        );
    }
}
 
export default LogReg;