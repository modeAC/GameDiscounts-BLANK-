import React, { Component } from "react";
import axios from 'axios';
import "./Game.css"
import { Link } from "react-router-dom";


class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            game: [],
        }
    }
    
    componentDidMount() {
        const id = window.location.pathname.split('/')[2]
        // this.setState({id: id})
        
        axios.get(`http://localhost:8080/app/${id}`).then(res => {
            const game = res.data;
            this.setState({ game: [game] });
        })

    }

    handleSubmit(event, id) {
        axios.put(`http://localhost:8080/wishlist/${id}`);
      }

    render() { 
        return ( 
            <div class='g_wrap'>
                <div class='g_card'>
                {this.state.game.map(g => <>
                    <form onSubmit={this.handleSubmit(g.id)}>
                    
                        <button class='add-to-favs' type="submit">Favourite</button>
                    
                    </form>

                    <p class='g_title'>{g.name}</p><img src={g.image_url} class='g_card-img' />
                    <div class='g_price-tag'>
                        <p class='g_best-price'><img class='g_store' />Best price:</p>
                        {g.price.map(p => <p class='g_price'>{p.final / 100} {p.currency}</p>)}
                    </div>

                    <div class='g_price-tag'>
                        <p class='g_best-price'><img class='g_store' />Standart price:</p>
                        {g.price.map(p => <p class='g_price init'>{p.initial / 100} {p.currency}</p>)}
                    </div>

                    <div class='g_price-tag'>
                        <p class='g_best-price'><img class='g_store' />Current discount:</p>
                        {g.price.map(p => <p class='g_price'>{p.discount}%</p>)}
                    </div>

                    <div class='g_descr'>
                        {g.shortdescription}
                    </div>
                    </>)}
                </div>

                <div class='g-main-content'>
                    <Link class='g_link' to='/'>
                        <button class='home-button'>Blank.</button>
                    </Link>
                </div>
            </div>
        );
    }
}
 
export default GamePage;