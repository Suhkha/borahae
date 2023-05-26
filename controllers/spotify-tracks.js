const { response } = require("express");
const {
  getSpotifyAccessToken,
} = require("../helpers/get-spotify-access-token");
const { Playlist } = require("../models");

const addTracksToSpotifyPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const { _id, name, description, userId, ...spotifyData } = req.body;

  const spotifyApi = getSpotifyAccessToken();

  const { spotifyPlaylistId } = await Playlist.findById(id);

  try {
    const addTracksToPlaylist = await spotifyApi.addTracksToPlaylist(
      spotifyPlaylistId,
      spotifyData.spotifyTracksId
    );

    await Playlist.findByIdAndUpdate(id, spotifyData);
    res.json(addTracksToPlaylist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addTracksToSpotifyPlaylist,
};
