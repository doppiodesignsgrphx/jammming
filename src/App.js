import logo from './logo.svg';
import './App.css';
import React, {
    useState
} from 'react';
import SearchBar from './SearchBar';
import Tracklist from './Tracklist';
import Playlist from './Playlist';
import {
    SampleTracks
} from './SampleData';
import Spotify from './Spotify';



function App() {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const updatePlaylistName = (e) => {
        setPlaylistName(e.target.value)
    };

    const addToPlaylist = (track) => {
        console.log(playlistTracks);
        if (playlistTracks.some((playlistTrack) => playlistTrack.id === track.id)) {
            alert('This track is already in your playlist!')
            return;
        }
        setPlaylistTracks((prevTracks) => [...prevTracks, track])

    };

    const removeTrack = (track) => {
        setPlaylistTracks((prevTracks) =>
            prevTracks.filter((playlistTrack) => playlistTrack.id !== track.id)
        );
    };

    const sendToSpotify = () => {
        const playlistUris = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(playlistName, playlistUris);
        alert(`Your playlist called ${playlistName} was successfully saveed to your spotify account!`)
    };

    const search = (term) => {
        Spotify.search(term).then((tracks) => {
            setSearchResults(tracks)
        })
    };
    
    
    const handleSearch = () => {
        if (!searchTerm) return; // Optionally, do nothing if search term is empty

  Spotify.search(searchTerm)
    .then(tracks => {
      console.log('Mapped tracks:', tracks);
      setSearchResults(tracks);
    })
    .catch(error => {
      console.error("Error searching Spotify:", error);
      setSearchResults([]); // Clear the results or display an error message
    });
};
    


    return ( <
        div className="application-bg">
        <
        div className = "header" >
        <
        h1 > Jammming App < /h1> < /
        div > <
        div className = "searchbar" >
        <
        SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            handleSearch={handleSearch}
        / >
        <
        /div>

        <
        div className = "playlist-tracklist-container" >

        <
        div className = "tracklist" >
        <
        Tracklist searchResults = {
            searchResults
        }
        setSearchResults = {
            setSearchResults
        }
        addToPlaylist = {
            addToPlaylist
        }
        /> < /
        div >

        <
        div className = "playlist" >
        <
        Playlist playlistName = {
            playlistName
        }
        playlistTracks = {
            playlistTracks
        }
        updatePlaylistName = {
            updatePlaylistName
        }
        removeTrack = {
            removeTrack
        }


        sendToSpotify = {
            sendToSpotify
        }

        />  < /
        div >

        <
        /div> < /
        div >
    );
}

export default App;
