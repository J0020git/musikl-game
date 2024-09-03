const axios = require("axios");
const { clientId, clientSecret, baseURL } = require('./config');

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // POST request body
  data: "grant_type=client_credentials",
};

async function getAccessToken() {
  try {
    const response = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers,
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token", error);
    throw error;
  }
}

async function getPlaylistDetails(playlistId) {
  const token = await getAccessToken();
  const playlistUrl = `${baseURL}/playlists/${playlistId}`;

  try {
    const response = await axios.get(playlistUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const playlistData = response.data;
    const he = require('he');

    const tracks = playlistData.tracks.items
      // Filter only tracks with type="track" and isLocal=false
      .filter(trackObj => trackObj.track.type === "track" && !trackObj.track.isLocal)
      // Map each track to a simplified object
      .map(trackObj => ({
        id: trackObj.track.id,
        name: trackObj.track.name,
        artists: trackObj.track.artists.map(artist => artist.name),
        previewUrl: trackObj.track.preview_url
      }));

    const playlistDetails = {
      playlistId: playlistData.id,
      name: he.decode(playlistData.name),
      description: he.decode(playlistData.description),
      img: playlistData.images[0].url,
      tracks,
    }

    return playlistDetails
  } catch (error) {
    console.error("Error getting playlist details", error.code);
    throw error;
  }
}

async function getTrackDetails(trackId) {
  const token = await getAccessToken();
  const trackUrl = `${baseURL}/tracks/${trackId}`;

  try {
    const response = await axios.get(trackUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const trackData = response.data;

    const trackDetails = {
      trackId: trackData.id,
      name: trackData.name,
      artists: trackData.artists.map(artist => artist.name),
      album: {
        name: trackData.album.name,
        img: trackData.album.images[0].url,
      },
      previewUrl: trackData.preview_url
    }

    return trackDetails
  } catch (error) {
    console.error("Error getting track details", error.code);
    throw error;
  }
}

module.exports = {
  getPlaylistDetails,
  getTrackDetails
};