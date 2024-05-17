const { Org, Post } = require("../models");
const bcrypt = require("bcrypt");

// Org login
const getOrg = async (req, res) => {
  const data = await req.body;
  try {
    const org = await Org.findOne({ where: { email: data.email } });
    if (org !== null) {
      await bcrypt.compare(data.password, org.password, function (err, result) {
        if (result) {
          req.session.orgId = org.id;
          res.json(["Correct Login", true, org]);
        } else {
          res.json(["Incorrect Login", false]);
        }
      });
    } else {
      res.json(["Incorrect Login", false]);
    }
  } catch (error) {
    res.json("Internal server error!");
  }
};

//Find company by primary key
const findOrgByPk = async (req, res) => {
  const PK = req.body.PK;

  const org = await Org.findByPk(PK);
  res.json({ org });
};

//Add job
const postJob = async (req, res) => {
  const newJob = req.body;

  const response = await Post.create(newJob);
  res.send("Job added.");
};

//Edit job
const editJob = async (req, res) => {
  const editData = req.body;
  const editedId = req.params.id;

  await Post.update(editData, {
    where: {
      id: editedId,
    },
  });
  res.send("Data will be editteds");
};

//Delete recent job
const deleteRecentJob = async (req, res) => {
  const deletedJob = req.body;

  try {
    const response = await Post.destroy({
      where: deletedJob,
    });

    res.send("message");
  } catch (error) {
    res.send("Job not deleted.");
  }
};

//Find job
const findJob = async (req, res) => {
  const posted = req.body;

  try {
    const info = await Post.findOne({
      where: posted,
    });
    res.send(info);
  } catch (error) {
    res.send("Error");
  }
};

//Find cookies data
const orgCookies = (req, res) => {
  if (req.session.orgId) {
    res.json({ valid: true, orgId: req.session.orgId });
  } else {
    res.json({ valid: false });
  }
};

module.exports = {
  getOrg,
  postJob,
  deleteRecentJob,
  editJob,
  findJob,
  orgCookies,
  findOrgByPk,
};
