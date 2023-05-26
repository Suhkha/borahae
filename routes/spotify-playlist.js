const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { createSpotifyPlaylist } = require("../controllers/spotify-playlist");
const router = Router();

router.post(
  "/:id",
  [check("id", "invalid Mongo ID").isMongoId(), validateFields],
  createSpotifyPlaylist
);

module.exports = router;
