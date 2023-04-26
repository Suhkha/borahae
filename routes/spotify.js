const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { createPlaylist } = require("../controllers/spotify-playlist");
const { addTracksToPlaylist } = require("../controllers/spotify-tracks");
const router = Router();

router.post(
  "/create-playlist",
  [
    check("name", "please add a playlist name").not().isEmpty(),
    check("user_id", "please add valid user id").isMongoId(),
    validateFields,
  ],
  createPlaylist
);

router.put(
  "/add-tracks-to-playlist/:id",
  [check("id", "invalid Mongo ID").isMongoId(), validateFields],
  addTracksToPlaylist
);

module.exports = router;
