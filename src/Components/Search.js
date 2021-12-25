
import React, { Component } from "react";
import "./Search.css"
import "./fontawesome-free-5.15.4-web/css/all.css"

class Search extends React.Component {
    render() { 
        return(
            <div class="search-box">
                <button class="btn-search"><i class="fas fa-search"/></button>
                <input type="text" class="input-search" placeholder="Search by game"/>
            </div>
        )
    }
}
 
export default Search;