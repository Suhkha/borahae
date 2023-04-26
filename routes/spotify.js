const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");

const { createPlaylist } = require("../controllers/spotify-playlist");

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

module.exports = router;
