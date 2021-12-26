import React, { Component } from "react";
import axios from 'axios';
import './Content.css'
import GamesTable from "./GamesTable";
import ContentQuote from "./ContentQuote";

import { Link } from "react-router-dom";


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            game: [],
            img_url: "./resources/placeholder.png"
        }
    }
    
    componentDidMount() {
        axios.get(`http://localhost:8080/featured?start=${getRandomInt(0, 7)}&count=1`).then(res => {
            const game = res.data;
            this.setState({ game: game });
            this.setState({img_url: this.state.game.image_url})
        })

    }


    render() { 
        return (
            <div class='content_wrap'> 

                <div class='wrap1'>
                    <ContentQuote />
                    {this.state.game.map(g => <>
                    <Link class='card_link' to = {`/game/${g.id}`}>
                    <div class='card'>
                        <p class='c_title'>{g.name}</p><img src={g.image_url} class='card-img' /><div class='c_price-tag'>
                            <p class='c_best-price'><img class='c_store' />Best price:</p>
                            {g.price.map(p => <p class='c_price_init'>{p.initial / 100}</p>)}
                            {g.price.map(p => <p class='c_price'>{p.final / 100} {p.currency}</p>)}
                        </div>
                    </div>
                    </Link>
                    </>)}
                </div>
                
                <GamesTable />
                
                <div class='log-reg-background'>
                    <p>Stay with us</p>
                    <div class="content-log-reg">
                        <Link to = '/log'>
                        <button class="c_login">Log In</button>
                        </Link>
                        <Link to='/reg'>
                        <button class="c_register">Register</button>
                        </Link>
                    </div>
                </div>

            </div>
         );
    }
}
 
export default Content;