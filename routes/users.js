const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");
const {
  isValidEmail,
  isValidNickname,
  isValidRole,
  isUserValidById,
} = require("../database/db-validators");
const { validateFields, validateJWT, hasRole } = require("../middlewares");

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
    check("nickname", "nickname is required")
      .not()
      .isEmpty()
      .custom(isValidNickname),
    check("email", "not valid").isEmail().custom(isValidEmail),
    check("age", "age is required").not().isEmpty(),
    check("city", "city is required").not().isEmpty(),
    check("socialMediaUrl", "social media url is required").not().isEmpty(),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "invalid Mongo ID").isMongoId(),
    check("id").custom(isUserValidById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN"),
    check("id", "Invalid Mongo ID").isMongoId(),
    check("id").custom(isUserValidById),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
