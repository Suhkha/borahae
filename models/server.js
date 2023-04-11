const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //middleware
    this.middlewares();

    //routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello, this is a basic route");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`This app listen PORT: ${this.port}`);
    });
  }
}

module.exports = Server;
