const { Org } = require("../models");
const bcrypt = require("bcrypt");

const registerOrg = async (req, res) => {
  const newOrg = req.body;
  let isPWDTaken = false;

  try {
    const result = await Org.findOne({ where: { name: newOrg.name } });

    if (result !== null) {
      await bcrypt.compare(
        newOrg.password,
        result.password,
        function (err, result) {
          isPWDTaken = result;
        }
      );
    }
    if (!isPWDTaken && result == null) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newOrg.password, salt);

      await Org.create({
        name: newOrg.name,
        email: newOrg.email,
        password: hash,
      });
      res.json(["Org created successfully.", true]);
    } else {
      res.json(["Password is taken!", false]);
    }
  } catch (error) {
    console.log(error);
    res.json(["Iternal server error!", true]);
  }
};

module.exports = { registerOrg };
