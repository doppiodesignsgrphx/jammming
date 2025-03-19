import React from 'react';
import './track.css';
import PlusIcon from './PlusIcon'

export default function Track ({trackName, artist, albumName, artistImage, addToPlaylist, track, showPlusIcon }){
    
    return(
    <div className="track-container">
        <div><img className="album-thumbnail" src={artistImage}/></div>
        <div className="track-information">
        <h2>{trackName}</h2> 
        <h4>{artist}</h4>
        <p>{albumName}</p>
        </div>
        <div>
        {showPlusIcon && (
          <PlusIcon onClick={() => addToPlaylist(track)} />
        )}
        </div>
    </div>
    )
}

