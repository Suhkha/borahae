const { response } = require("express");
const { Playlist } = require("../models");

/**
 * This allow to create the playlist in database only
 */
const createPlaylist = async (req, res = response) => {
  const { name, description, userId } = req.body;

  try {
    const playlist = new Playlist({
      name,
      description,
      userId,
    });
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPlaylist,
};
