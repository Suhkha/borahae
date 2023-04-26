const { response } = require("express");
const {
  getSpotifyAccessToken,
} = require("../helpers/get-spotify-access-token");

const Playlist = require("../models/spotify-playlist");

const addTracksToPlaylist = async (req, res = response) => {
  const { id } = req.params;
  const { _id, name, description, user_id, ...spotifyData } = req.body;

  const spotifyApi = getSpotifyAccessToken();

  const { spotify_playlist_id } = await Playlist.findById(id);

  try {
    const addTracksToPlaylist = await spotifyApi.addTracksToPlaylist(
      spotify_playlist_id,
      spotifyData.spotify_tracks_id
    );

    await Playlist.findByIdAndUpdate(id, spotifyData);
    res.json(addTracksToPlaylist);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addTracksToPlaylist,
};
