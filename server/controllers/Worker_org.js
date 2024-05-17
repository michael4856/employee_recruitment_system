const { Worker_org } = require("../models");

const Add_worker_org = async (req, res) => {
  const new_data = req.body;

  try {
    await Worker_org.create(new_data);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
    console.log(error);
  }
};

module.exports = { Add_worker_org };
