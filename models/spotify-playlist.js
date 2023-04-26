const { Schema, model } = require("mongoose");

const PlaylistSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
  },
  spotify_playlist_id: {
    type: String,
  },
  spotify_tracks_id: {
    type: [String],
    default: [],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

PlaylistSchema.methods.toJSON = function () {
  const { __v, _id, ...playlist } = this.toObject();
  playlist.uid = _id;

  return playlist;
};

module.exports = model("Playlists", PlaylistSchema);
