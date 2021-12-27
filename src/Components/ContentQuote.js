import React, { Component } from "react";
import './Content.css'
import { Link } from "react-router-dom";
import axios from "axios";

class ContentQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            q_username: null,
            j_opacity: 'block',
            w_opacity: 'none'
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/username`).then(res => {
            const username = res.data;
            if (username != null){
                this.setState({q_username: username.username, j_opacity: 'none', w_opacity: 'flex'})
            }
        })
    }

    render() { 
        return ( 
        <div class='content_quote'>
            <img src ='/resources/NewGamesThatYouEnjoy.png' class='content_logo' />
            <div class='text'><p>Gaming and Sports Template that is designed to build modern Online Game, Gaming News Portal, Gaming Online News Portal, and other News services websites and it is suitable for any kind of small business activity.</p></div>
            <Link class='link' to='/reg' style={{display: `${this.state.j_opacity}`}}>
            <button class='join_us'>Join Us</button>
            </Link>
            <Link class='link' to='/cabina' style={{display: `${this.state.w_opacity}`}}>
            <button class='join_us'>Wishlist</button>
            </Link>

        </div> 
        );
    }
}
 
export default ContentQuote;