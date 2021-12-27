import React, { Component } from "react";
import "./Cabinet.css"
import "./GamesTable.css"
import axios from "axios";
import { Link } from "react-router-dom";

class Cabina extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            c_wishlist : [],
            c_username: null,
            display_t: 'none',
            display_q: 'flex',
        }
    }

    componentDidMount() {
        const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 2) {
          sessionStorage.setItem('reloadCount', String(reloadCount + 1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
        axios.get(`http://localhost:8080/wishlist`, { withCredentials: true }).then(res => {
            const wishlist = res.data; 
            if (wishlist != null){
                this.setState({ c_wishlist : wishlist , display_t : 'grid', display_q : 'none'})
            }
        })

        axios.get(`http://localhost:8080/username`).then(res => {
            const username = res.data;
            if (username != null){
                this.setState({c_username: username.username, lr_c_opacity: 'none', c_c_opacity: 'flex'})
            }
        })
    }

    logout() {
        axios.post(`http://localhost:8080/logout`, {}, {withCredentials:true})
    }

    render() { 
        return ( 
            <div class='cab_wrap'>
                <Link class='g_link' to='/'>
                    <button class='home-button'>Blank.</button>
                </Link>
                <div class='hdr'>
                    <p class='hi'>Hi {this.state.c_username},</p>
                    <p class='what'>What will you play today?</p>
                </div>
                <div class='table_wrap' style={{display: `${this.state.display_t}`}}>
                {this.state.c_wishlist.map(g => <>
                    <Link class='table_link' to={`/game/${g.id}`}>
                    <div class='slide'>
                        <p class='title'>{g.name}</p>
                        <img src={g.image_url} class='slide-img' />
                        <div class='price-tag'>      
                            <p class='best-price'><img class='store' />Best price:</p>
                            {g.price.map(p => <p class='price_init'>{p.initial / 100}</p>)}
                            {g.price.map(p => <p class='price'>{p.final/100} {p.currency}</p>)}
                        </div>
                    </div>
                    </Link>
                </>)}

                </div>
                
                <div class='q' style={{display: `${this.state.display_q}`}}>
                    <p class='y'>You don`t have any games</p>
                    <Link to='/' class='c'>Click to add</Link>
                </div>
                <Link to='/' class='lo_wrap'>
                    <button class='logout' onClick={this.logout.bind(this)}>Logout</button>
                </Link>
            </div>
         );
    }
}
 
export default Cabina;