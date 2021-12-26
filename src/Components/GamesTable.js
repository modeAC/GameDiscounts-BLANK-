import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './GamesTable.css'

class GamesTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            games: [],
            img_url: "./resources/placeholder.png"
        }
    }

    componentDidMount() {
        // axios.get(`http://localhost:8080/featured?start=${getRandomInt(0, 7)}&count=1`).then(res => {
        axios.get(`http://localhost:8080/featured?start=0&count=8`).then(res => {
            const games = res.data;
            this.setState({ games: games });
            // if (this.state.game.image_url != null){
            //     this.setState({img_url: this.state.game.image_url})
            // }
        })
    }

    render() { 
        return ( 
            <div class='table_wrap'>
                {this.state.games.map(g => <>
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
        );
    }
}
 
export default GamesTable;
