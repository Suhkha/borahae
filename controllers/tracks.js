const { response } = require("express");
const { Playlist } = require("../models");

const addTracksToPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const { spotifyTracksId } = req.body;

  try {
    const tracks = await Playlist.findByIdAndUpdate(id, { spotifyTracksId });
    console.log(spotifyTracksId);
    res.json(tracks);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addTracksToPlaylist,
};
