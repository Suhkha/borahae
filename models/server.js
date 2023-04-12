const express = require("express");
const cors = require("cors");
const { databaseConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersBasePath = "/api/users";
    this.authBasePath = "/api/auth";

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
    this.app.use(this.authBasePath, require("../routes/auth"));
    this.app.use(this.usersBasePath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This app listen PORT: ${this.port}`);
    });
  }
}

module.exports = Server;
