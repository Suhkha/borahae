const { Router } = require("express");
const {
  spotifyAccess,
  spotifyCallback,
} = require("../controllers/spotify-auth");

const router = Router();

router.get("/access", spotifyAccess);
router.get("/callback", spotifyCallback);

module.exports = router;
