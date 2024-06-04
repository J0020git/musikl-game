const axios = require("axios");

const clientId = "79f704fc81fc4ae09ceb390dbd6b54ac";
const clientSecret = "eb8ccbe8db9843b5b0bac00bf97a7df0";
const baseURL = "https://api.spotify.com/v1";

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

    return response.data;
  } catch (error) {
    console.error("Error getting playlist details", error.code);
    throw error;
  }
}

module.exports = {
  getPlaylistDetails
};