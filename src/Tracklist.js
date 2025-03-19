import React from 'react';
import Track from './Track';
import PlusIcon from './PlusIcon';
import './tracklist.css';

function Tracklist({ searchResults, addToPlaylist, track, showPlusIcon }) {
    
  return (
    
      
    <div className="search-results-container">
      <div><h1>Search Results</h1></div>
      <div className="tracklist-flex-container"><ul className="search-results-content">
        {searchResults.map((track) => (
          <li key={track.id}>
            <Track 
              trackName={track.name} 
              artist={track.artist[0].name} 
              albumName={track.album.name}
              artistImage={track.image[0].url}
              addToPlaylist={addToPlaylist} 
              track={track}
              showPlusIcon={true}
                
            />
            
            <hr/>
          </li>
        
        ))

            }
            
            
      </ul>
    </div>
    </div>
   
  );
}

export default Tracklist;