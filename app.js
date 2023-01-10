const express = require("express");
const queryString = require("node:querystring");
const axios = require("axios");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT);

app.get("/", (request, response) => {
    response.send(
        "<a href='https://accounts.spotify.com/authorize?client_id=" +
        process.env.CLIENT_ID +
        "&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Faccount&scope=user-top-read'>Sign in</a>"
    );
});

app.get("/account", async(request, response) => {
    const spotifyResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
            queryString.stringify({
            grant_type: "authorization_code",
            code: request.query.code,
            redirect_uri: process.env.REDIRECT_URI_DECODED,
        }),
        {
            headers: {
                Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
    );

    console.log(spotifyResponse.data);
    const data = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50", {
        headers: {
            Authorization: "Bearer " + spotifyResponse.data.access_token,
        },
    });

});
