import React, { Component } from "react";
import '../App.css'
import MainScreen from './MainScreen.js';
import Content from './Content.js';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 1) {
          sessionStorage.setItem('reloadCount', String(reloadCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
        this.setState({});
    }

    render() { 
        return ( 
            <body>
                <div class='wrap'>
                    <MainScreen/>
                    <Content class='content'/>
                </div>
            </body>
         );
    }
}
 
export default Main;