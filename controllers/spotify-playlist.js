const { response } = require("express");
const {
  getSpotifyAccessToken,
} = require("../helpers/get-spotify-access-token");
const { Playlist } = require("../models");

/**
 * This allow to create the playlist in spotify only
 */
const createSpotifyPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const spotifyApi = getSpotifyAccessToken();

  const { name, description } = await Playlist.findById(id);

  try {
    const createPlaylist = await spotifyApi.createPlaylist(name, {
      description: description,
      public: true,
    });

    const spotifyPlaylistId = createPlaylist.body.id;
    await Playlist.findByIdAndUpdate(id, { spotifyPlaylistId });

    res.json(createPlaylist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createSpotifyPlaylist,
};
