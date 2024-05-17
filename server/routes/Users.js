const {
  register,
  login,
  cookies,
  userByUsername,
  editAccount,
} = require("../controllers/User");
const express = require("express");
const router = express.Router();
const { User } = require("../models");

//Routes
router.post("/getUser", login);
router.get("/getUser/cookies", cookies);

// Create New User.
router.post("/addUser", register);

// Find User By Username.
router.post("/getUserByUsername", userByUsername);

// Eddit Account
router.post("/editAccount", editAccount);

module.exports = router;
