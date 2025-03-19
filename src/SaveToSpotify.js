import React from 'react';
import './savetospotify.css';

export default function SaveToSpotify ({ sendToSpotify }){
    
    
    return(
    <div>
        <button  className="save-button" onClick={ sendToSpotify }> Send to Spotify </button>
    </div>
    )
}

