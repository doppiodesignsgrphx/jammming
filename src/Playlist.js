import React from 'react';
import Track from './Track';
import SaveToSpotify from './SaveToSpotify';
import './playlist.css';


function Playlist ({ playlistName, playlistTracks, updatePlaylistName, removeTrack, sendToSpotify }){
    console.log(playlistTracks);
    
    return(
    <div className="playlist-container">
        <input className="playlist-name"
            placeholder="Name your playlist here..." 
            value={playlistName} 
            onChange={updatePlaylistName}
        />
        
        <ul>
  {playlistTracks.map((track) => (
    <li key={track.id}>
      <Track 
        trackName={track.name} 
        artist={track.artist[0].name}
        albumName={track.album.name}
        artistImage={track.image[0].url}
        showPlusIcon={false}
      />
        
        
        <button className="remove-button" onClick={() => removeTrack(track)}>REMOVE</button>
    </li>

  ))}
  
</ul>
        <SaveToSpotify sendToSpotify={sendToSpotify}/>
    </div>
    )
}

export default Playlist