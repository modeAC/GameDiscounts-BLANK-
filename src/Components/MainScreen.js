import React, { Component } from "react";
import "./MainScreen.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Search from "./Search";
import LogReg from "./log-reg"




class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            opacity: 1,
            scrollPos: 0
         }
    }


    componentDidMount() {
        if (typeof window !== "undefined") {
          window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;
            let maxScroll = document.body.scrollHeight - window.innerHeight;
            // console.log(maxScroll)
            if (currentScrollPos > this.state.scrollPos) {
                if (this.state.opacity > 0) {
                    this.setState({ opacity: this.state.opacity - 0.07 })
                }
                this.setState({ scrollPos: currentScrollPos })
            } else {
                if (this.state.opacity < 1) {
                    this.setState({ opacity: this.state.opacity + 0.1 })
                }
                this.setState({ scrollPos: currentScrollPos })
            }
          }
        }
    }

    render() { 
        return (  
            <div class="main_screen">
                <div class='back'>
                <div class="header" style={{ opacity: `${this.state.opacity}`}}>
                    <ul>
                        <li>
                            <Search/>
                        </li>
                        <li>
                            <LogReg/>
                        </li>
                    </ul>
                </div>
                <div class='logo' style={{ opacity: `${this.state.opacity}`}}><p>BLANK</p></div>
                <div class='quote' style={{ opacity: `${this.state.opacity}`}}><p>We’re <span>#alwaysonline</span> for u wherever u go…</p></div>
                </div>
            </div>
        );
    }
}
 
export default MainScreen;