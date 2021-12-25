import React, { Component } from "react";
import './Content.css'
import { Link } from "react-router-dom";

class ContentQuote extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() { 
        return ( 
        <div class='content_quote' style={{ opacity: `${this.state.opacity_quote}`}}>
            <img src ='/resources/NewGamesThatYouEnjoy.png' class='content_logo' />
            <div class='text'><p>Gaming and Sports Template that is designed to build modern Online Game, Gaming News Portal, Gaming Online News Portal, and other News services websites and it is suitable for any kind of small business activity.</p></div>
            <Link class='link' to='/reg'>
            <button class='join_us'>Join Us</button>
            </Link>

        </div> 
        );
    }
}
 
export default ContentQuote;