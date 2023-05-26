const { response } = require("express");
const {
  getSpotifyAccessToken,
} = require("../helpers/get-spotify-access-token");
const { Playlist } = require("../models");

const addTracksToSpotifyPlaylist = async (req, res = response) => {
  const { id } = req.params;

  const spotifyApi = getSpotifyAccessToken();

  const { spotifyPlaylistId, spotifyTracksId } = await Playlist.findById(id);

  try {
    const addTracksToPlaylist = await spotifyApi.addTracksToPlaylist(
      spotifyPlaylistId,
      spotifyTracksId
    );

    await Playlist.findByIdAndUpdate(id, { spotifyTracksId });
    res.json(addTracksToPlaylist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addTracksToSpotifyPlaylist,
};
