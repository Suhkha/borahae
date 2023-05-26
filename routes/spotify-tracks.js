const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { addTracksToSpotifyPlaylist } = require("../controllers/spotify-tracks");
const router = Router();

router.put(
  "/:id",
  [check("id", "invalid Mongo ID").isMongoId(), validateFields],
  addTracksToSpotifyPlaylist
);

module.exports = router;
