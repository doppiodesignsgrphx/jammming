import React from 'react';
import './searchbutton.css'

export default function SearchButton ( {onClick}){
    return(
    <div>
        <button className="search-button" onClick={onClick} > Search </button>    
    </div>
    )
}