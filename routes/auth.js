const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signup, logIn, logOut } = require("../controllers/auth");

//SIGNUP ROUTE
router.post(
  "/signup",
  [
    check("name", "Name Should not be empty").notEmpty(),
    check("email", "Email Should not be empty").isEmail(),
    check("password", "Password Should not be empty").notEmpty(),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "Email Should not be empty").isEmail(),
    check("password", "Password Should Not Be empty").notEmpty(),
  ],
  logIn
);

router.get("/logout", logOut);

module.exports = router;
