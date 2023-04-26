const { response } = require("express");
const {
  getSpotifyAccessToken,
} = require("../helpers/get-spotify-access-token");

const Playlist = require("../models/spotify-playlist");

const createPlaylist = async (req, res = response) => {
  const { name, description, user_id } = req.body;
  const spotifyApi = getSpotifyAccessToken();

  try {
    const createPlaylist = await spotifyApi.createPlaylist(name, {
      description: description,
      public: true,
    });

    const spotify_playlist_id = createPlaylist.body.id;

    const playlist = new Playlist({
      name,
      description,
      spotify_playlist_id,
      user_id,
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
