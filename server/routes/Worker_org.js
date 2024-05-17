const { Add_worker_org } = require("../controllers/Worker_org");
const express = require("express");
const router = express.Router();

//Create add worker_router data
router.post("/add_worker_org", Add_worker_org);

module.exports = router;
