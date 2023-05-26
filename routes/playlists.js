const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateJWT } = require("../middlewares");
const { createPlaylist } = require("../controllers/playlists");
// const { addTracksToPlaylist } = require("../controllers/tracks");
const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("name", "please add a playlist name").not().isEmpty(),
    check("userId", "please add valid user id").isMongoId(),
    validateFields,
  ],
  createPlaylist
);

module.exports = router;
