const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { createPlaylistDatabase } = require("../controllers/playlists");
// const { addTracksToPlaylist } = require("../controllers/tracks");
const router = Router();

router.post(
  "/",
  [
    check("name", "please add a playlist name").not().isEmpty(),
    check("userId", "please add valid user id").isMongoId(),
    validateFields,
  ],
  createPlaylistDatabase
);

// router.put(
//   "/add-tracks-to-playlist/:id",
//   [check("id", "invalid Mongo ID").isMongoId(), validateFields],
//   addTracksToPlaylist
// );

module.exports = router;
