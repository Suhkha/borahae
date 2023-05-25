const SpotifyWebApi = require("spotify-web-api-node");
const { LocalStorage } = require("node-localstorage");

const getSpotifyAccessToken = () => {
  const localStorage = new LocalStorage("./local-storage");
  const accessToken = localStorage.getItem("accessToken");

  const spotifyApi = new SpotifyWebApi({
    accessToken: accessToken,
  });

  return spotifyApi;
};

module.exports = {
  getSpotifyAccessToken,
};
