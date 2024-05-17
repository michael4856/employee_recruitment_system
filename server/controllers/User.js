const { User } = require("../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const user = await req.body;

  try {
    //Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    const [newUser, created] = await User.findOrCreate({
      where: { username: user.username },
      defaults: {
        username: user.username,
        email: user.email,
        password: hash,
      },
    });
    if (created) {
      res.json("Thank you for your registration.");
    } else {
      res.json("Username is already taken, please try again.");
    }
  } catch (error) {
    console.log(error);
    res.json("Interval server error, please try again later.");
  }
};
const login = async (req, res) => {
  const user = req.body;

  try {
    const targetUser = await User.findOne({
      where: { username: user.username },
    });
    const hashedPWD = targetUser.password;
    await bcrypt.compare(user.password, hashedPWD, async (err, response) => {
      if (response) {
        const dbUser = await User.findOne({
          where: { username: user.username },
        });

        req.session.username = dbUser.username;
        res.json({ user: dbUser, username: req.session.username, login: true });
      } else {
        res.send("User not found");
      }
    });
  } catch (error) {
    error && res.send("User not found");
  }
};
const cookies = (req, res) => {
  if (req.session.username) {
    res.json({ valid: true, username: req.session.username });
  } else {
    res.json({ valid: false });
  }
};

//Find user by username
const userByUsername = async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({
      where: { username: username },
    });

    if (user) {
      res.json({ success: true, user: user });
    }
  } catch (error) {
    res.send({ success: false });
  }
};

//Eddit Account
const editAccount = async (req, res) => {
  const editData = req.body.data;
  const username = req.body.username;
  const currentPassword = req.body.currentPassword;

  try {
    if (req.body.data) {
      const account = await User.findOne({ where: { username: username } });
      let hashedPWD = "";
      if (account) {
        hashedPWD = account.password;
      } else {
        res.json({ success: true, msg: "User Not Found" });
      }

      if (currentPassword) {
        await bcrypt.compare(currentPassword, hashedPWD, (err, response) => {
          if (response && hashedPWD !== editData.password) {
            //Hash password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(editData.password, salt);
            User.update(
              {
                username: editData.username,
                email: editData.email,
                password: hash,
              },
              {
                where: {
                  username: username,
                },
              }
            );
            req.session.username = editData.username;

            res.json({ success: true, msg: "Account Edited!" });
          } else {
            res.json({ success: true, msg: "Account Not Edited!" });
          }
        });
      } else if (account) {
        if (
          editData.username !== account.username ||
          editData.email !== account.email
        ) {
          User.update(
            {
              username: editData.username,
              email: editData.email,
              password: editData.password,
            },
            {
              where: {
                username: username,
              },
            }
          );
        }

        res.json({ success: true, msg: "Account Edited!" });
      }
    }
  } catch (error) {
    res.json({ success: false, msg: "Account Is Not Edited" });
  }
};

module.exports = { register, login, cookies, userByUsername, editAccount };
