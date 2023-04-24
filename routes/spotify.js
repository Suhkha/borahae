const { Router } = require("express");
const { spotifyArtistAlbums } = require("../controllers/spotify-artist");

const router = Router();

router.get("/artist/albums", spotifyArtistAlbums);

module.exports = router;
