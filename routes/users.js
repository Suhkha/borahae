const { Router } = require("express");
const { check } = require("express-validator");
const { usersGet, usersPost } = require("../controllers/users");
const cors = require("cors");
const { isValidEmail } = require("../database/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("password", "password is required, check again")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("nickname", "nickname is required").not().isEmpty(),
    check("email", "not valid").isEmail().custom(isValidEmail),
    check("age", "age is required").not().isEmpty(),
    check("city", "city is required").not().isEmpty(),
    check("social_media_url", "social media url is required").not().isEmpty(),
    validateFields,
  ],
  usersPost
);

module.exports = router;
