const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      spotify: "/api/spotify",
      spotifyAuth: "/api/spotify/auth",
      users: "/api/users",
    };

    //database
    this.database();

    //middleware
    this.middlewares();

    //routes
    this.routes();
  }

  async database() {
    await databaseConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.spotify, require("../routes/spotify"));
    this.app.use(this.paths.spotifyAuth, require("../routes/spotify-auth"));
    this.app.use(this.paths.users, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This app listen PORT: ${this.port}`);
    });
  }
}

module.exports = Server;
