const { Schema, model } = require("mongoose");

const PlaylistSchema = Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

PlaylistSchema.methods.toJSON = function () {
  const { __v, _id, ...playlist } = this.toObject();
  playlist.uid = _id;

  return playlist;
};

module.exports = model("Playlists", PlaylistSchema);
