const { Post } = require("../models");
const { Org } = require("../models");

const Job = async (req, res) => {
  const searchData = req.body.searchData;

  try {
    if (searchData == null || searchData.departement == "all") {
      const allJobs = await Post.findAll();
      console.log(allJobs);
      res.send(allJobs);
    } else {
      someJobs = await Post.findAll({ where: searchData });
      res.send(someJobs);

      console.log(someJobs);
    }
  } catch (error) {
    console.log(error);
    error && res.send("Error occured");
  }
};

module.exports = { Job };
