const express = require("express");
const { registerOrg } = require("../controllers/Admin");

const router = express.Router();

//Create new org
router.post("/addOrg", registerOrg);

module.exports = router;
