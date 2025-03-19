// Spotify.js

const clientId = '6e949d66a06d4ab585fda4bfa1caba86';
const redirectUri = 'http://localhost:3000';

let accessToken;

function getAccessToken() {
  if (accessToken) return accessToken;

  const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (tokenMatch && expiresInMatch) {
    accessToken = tokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    const scope = 'playlist-modify-public playlist-modify-private';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&show_dialog=true`;
    window.location = authUrl;
  }
}

function search(term) {
  const token = getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => response.json())
    .then(jsonResponse => {
      if (!jsonResponse.tracks) return [];
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists, // Array; you'll access the first one when rendering
        album: track.album,
        uri: track.uri,
        image: track.album.images
      }));
    });
}

// New method: Save Playlist to Spotify
async function savePlaylist(playlistName, trackUris) {
  if (!playlistName || !trackUris.length) return;
  
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  
  try {
    // Step 1: Get the user ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const userData = await userResponse.json();
    const userId = userData.id;

    // Step 2: Create a new playlist
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: playlistName,
        public: false  // or true, depending on your requirements
      })
    });
    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    // Step 3: Add tracks to the playlist
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ uris: trackUris })
    });

    console.log('Playlist saved successfully!');
  } catch (error) {
    console.error('Error saving playlist:', error);
  }
}

export default { getAccessToken, search, savePlaylist };
