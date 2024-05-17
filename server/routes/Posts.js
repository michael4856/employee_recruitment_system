const { Job } = require("../controllers/Job");
const express = require("express");
const router = express.Router();

//Routes
// Create new user.
router.post("/getPosts", Job);

module.exports = router;
