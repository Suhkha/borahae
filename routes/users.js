const { Router } = require("express");
const { usersGet, usersPost } = require("../controllers/users");
const cors = require("cors");

const router = Router();

router.get("/", usersGet);

router.post("/", usersPost);

module.exports = router;
