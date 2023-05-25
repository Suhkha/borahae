const { response } = require("express");
const {
  getSpotifyAccessToken,
} = require("../helpers/get-spotify-access-token");
const { Playlist } = require("../models");

const createPlaylist = async (req, res = response) => {
  const { name, description, userId } = req.body;
  const spotifyApi = getSpotifyAccessToken();

  try {
    const createPlaylist = await spotifyApi.createPlaylist(name, {
      description: description,
      public: true,
    });

    const spotifyPlaylistId = createPlaylist.body.id;

    const playlist = new Playlist({
      name,
      description,
      spotifyPlaylistId,
      userId,
    });
    await playlist.save();

    res.json(createPlaylist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPlaylist,
};
