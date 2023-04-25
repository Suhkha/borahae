const { response } = require("express");
const { LocalStorage } = require("node-localstorage");
const SpotifyWebApi = require("spotify-web-api-node");

scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
];

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.URL_CALLBACK,
});

const spotifyAccess = (req, res = response) => {
  const html = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(html + "&show_dialog=true");
};

const spotifyCallback = async (req, res = response) => {
  const localStorage = new LocalStorage("./local-storage");
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    localStorage.setItem("access_token", access_token);

    res.status(200).json({
      message: "auth successful",
    });
  } catch (err) {
    res.redirect("/#/error/invalid token");
  }
};

module.exports = {
  spotifyAccess,
  spotifyCallback,
};
