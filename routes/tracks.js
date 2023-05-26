const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { addTracksToPlaylist } = require("../controllers/tracks");
const router = Router();

router.put(
  "/:id",
  [check("id", "invalid Mongo ID").isMongoId(), validateFields],
  addTracksToPlaylist
);

module.exports = router;
