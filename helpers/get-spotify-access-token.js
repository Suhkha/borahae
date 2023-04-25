const SpotifyWebApi = require("spotify-web-api-node");
const { LocalStorage } = require("node-localstorage");

const getSpotifyAccessToken = () => {
  const localStorage = new LocalStorage("./local-storage");
  const access_token = localStorage.getItem("access_token");

  const spotifyApi = new SpotifyWebApi({
    accessToken: access_token,
  });

  return spotifyApi;
};

module.exports = {
  getSpotifyAccessToken,
};
