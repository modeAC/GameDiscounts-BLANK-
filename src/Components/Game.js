import React, { Component } from "react";
import axios from 'axios';
import "./Game.css"
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

axios.defaults.withCredentials = true;

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            game: [],
            wishlist: false,
            id : 0,
            style: ''
        }
    }
    
    componentDidMount() {
        const id = window.location.pathname.split('/')[2]
        // this.setState({id: id})
        
        axios.get(`http://localhost:8080/app/${id}`).then(res => {
            const game = res.data;
            console.log(res.data)
            this.setState({ game: [game], 
                            id: game.id});
        })

        axios.get(`http://localhost:8080/wishlist`, { withCredentials: true }).then(res => {
            const wishlist = res.data;
            if (wishlist != null){
                console.log(res.data)
                wishlist.map(g => {
                    if (g.id == this.state.id){
                        this.setState({wishlist: true, style: 'added'})
                    }
                })
            }
            
        })
        // console.log(this.state.wishlist)

    }

    handleSubmit(id) {
        axios.put(`http://localhost:8080/wishlist/${id}`, {}, { withCredentials: true }).then(
            this.setState({wishlist: true, style: 'added'})
        )
      }

    render() { 
        const AutoplaySlider = withAutoplay(AwesomeSlider);
        return ( 
            
            <div class='g_wrap'>
                {this.state.game.map(g => <>
                <AutoplaySlider
                bullets={false}
                play={true}
                interval={10000}
                organicArrows={false}
                >
                    {g.Screenshots.map(url => <div style={{background: `url(${url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height:'100%', width: '100%'}}/>)}
                </AutoplaySlider>
                <div class='g_card'>
                
                    {/* <form> */}
                        <button class={`add-to-favs ${this.state.style}`} onClick={this.handleSubmit.bind(this, g.id)}>Favourite</button>
                    
                    {/* </form> */}

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
                        {g.price.map(p => <p class='g_price'>-{p.discount}%</p>)}
                    </div>

                    <div class='g_descr'>
                        {g.shortdescription}
                    </div>
                    
                </div>

                <div class='g-main-content'>
                    <Link class='g_link' to='/'>
                        <button class='home-button'>Blank.</button>
                    </Link>
                </div>
                </>)}
            </div>
        );
    }
}
 
export default GamePage;