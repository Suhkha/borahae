const SpotifyWebApi = require("spotify-web-api-node");
const { LocalStorage } = require("node-localstorage");

const spotifyArtistAlbums = async (req, res = response) => {
  const localStorage = new LocalStorage("./local-storage");
  const access_token = localStorage.getItem("access_token");

  const spotifyApi = new SpotifyWebApi({
    accessToken: access_token,
  });

  const getArtistAlbums = await spotifyApi.getArtistAlbums(
    "5RmQ8k4l3HZ8JoPb4mNsML"
  );
  res.json(getArtistAlbums);
};

module.exports = {
  spotifyArtistAlbums,
};
