const models = require("../../database/models");
const utils = require("../lib/utils.js");
const hashUtils = require("../lib/hashUtils.js");
module.exports = {
  signup: async (req, res) => {
    // TODO: Handle trip and key parameters
    try {
      if (
        !req.body.first_name === undefined ||
        req.body.last_name === undefined ||
        req.body.email === undefined ||
        req.body.password === undefined ||
        utils.validateEmail(req.body.email) === false
      ) {
        res
          .status(400)
          .send("Sign Up Failed: Invalid email or missing fields.");
      } else if (
        await models.User.findOne({ where: { email: req.body.email } })
      ) {
        res
          .status(401)
          .send("Sign Up Failed: Account with provided email already exists.");
      } else {
        console.log(req.body);
        const salt = hashUtils.createRandom32String();
        const hashedPassword = hashUtils.createHash(req.body.password, salt);
        const user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
          profile_pic: req.body.profile_pic || "",
        };
        if (req.body.verified) {
          user.verified = req.body.verified;
        }
        const newUser = await models.User.create(user);
        res.status(201).json({
          user_id: newUser.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: "",
          verified: user.verified,
          profile_pic: user.profile_pic,
        });
      }
    } catch (err) {
      res.status(500).send("Internal Server Error: " + err);
    }
  },
  verify: async (req, res) => {
    res.status(200).json("signup verify");
  },
  code: async (req, res) => {
    res.status(200).json("signup verify code");
  },
};
