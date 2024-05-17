const express = require("express");
const {
  getOrg,
  postJob,
  deleteRecentJob,
  editJob,
  findJob,
  orgCookies,
  findOrgByPk,
} = require("../controllers/Org");

const router = express.Router();

//Create new org
router.post("/getOrg", getOrg);

//Post new job
router.post("/postJob", postJob);

//Return cookies data
router.get("/orgCookies", orgCookies);

//Delete recent job
router.delete("/deleteRecentJob", deleteRecentJob);

//Edit job
router.put("/editJob/:id", editJob);

//Find job
router.post("/findJob", findJob);

//Find job
router.post("/findOrg", findOrgByPk);

module.exports = router;
