const models = require("../../database/models");
const hashUtils = require("../lib/hashUtils");
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = {
  login: async (req, res) => {
    // TODO: handle trip & key params, handle redirects.
    if (
      req.body.email === undefined ||
      req.body.password === undefined ||
      validateEmail(req.body.email) === false
    ) {
      res.status(400).send("Login Failed: Invalid Syntax.");
    } else {
      try {
        const user = await models.User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (user === null) {
          res.status(404).send("Login Failed: User does not exist.");
        } else if (user.verified === "pending") {
          res.status(403).send("Login Success: Email not verified.");
        } else {
          if (
            hashUtils.compareHash(req.body.password, user.password, user.salt)
          ) {
            let hash = "";
            do {
              hash = hashUtils.createRandom32String();
            } while (
              (await model.Session.findOne({
                where: { session_hash: hash },
              })) !== null
            );

            await models.Session.create({
              session_hash: hash,
            });
            res
              .status(200)
              .cookie("session_id", hash, {
                expires: new Date(Date.now() + 8 * 3600000), // Cookie removed after 8 hours.
              })
              .send("Login Successful.");
          } else {
            res.status(401).send("Login Failed: Incorrect Password.");
          }
        }
      } catch (err) {
        res.status(500).send("Internal Server Error: " + err);
      }
    }
  },
  createSession: (req, res) => {
    res.status(200).json("create session");
  },
  deleteSession: (req, res) => {
    res.status(200).json("delete session");
  },
};
