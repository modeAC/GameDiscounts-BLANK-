import React, { Component } from "react";
import "./log-reg.css"
import { Link } from "react-router-dom";

class LogReg extends Component {
    render() { 
        return (
            <div class="log-reg">
                <Link to='/log'>
                <button class="login">Log In</button>
                </Link>
                <Link to='/reg'>
                <button to='/reg' role="button" class="register">Register</button>
                </Link>

            </div>
        );
    }
}
 
export default LogReg;