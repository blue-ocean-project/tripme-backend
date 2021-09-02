const models = require("../../database/models");
const utils = require("../lib/utils.js");
const hashUtils = require("../lib/hashUtils");
const serverConfig = require("../config/config.server.js");

module.exports = {
  login: async (req, res) => {
    // TODO: handle trip & key params, handle redirects.
    if (
      req.body.email === undefined ||
      req.body.password === undefined ||
      utils.validateEmail(req.body.email) === false
    ) {
      res.status(400).send("Login Failed: Invalid Email/Password.");
    } else {
      try {
        const user = await models.User.findOne({
          where: {
            email: req.body.email,
          },
        });
        if (user === null) {
          res.status(404).send("Login Failed: User does not exist.");
          // } else if (user.verified === "pending") {
          //   res.status(403).send("Login Success: Account not verified.");
        } else {
          if (
            hashUtils.compareHash(req.body.password, user.password, user.salt)
          ) {
            let hash = "";
            do {
              hash = hashUtils.createRandom32String();
            } while (
              (await models.Session.findOne({
                where: { session_hash: hash },
              })) !== null
            );

            await models.Session.create({
              session_hash: hash,
            });
            res
              .status(200)
              .cookie("session_id", hash, {
                domain: serverConfig.clientUrl,
                expires: new Date(Date.now() + 8 * 3600000), // Cookie removed after 8 hours.
              })
              .json({
                user_id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                verified: user.verified,
                profile_pic: user.profile_pic,
              });
            // Redirect to dashboard
          } else {
            res.status(401).send("Login Failed: Incorrect Password.");
          }
        }
      } catch (err) {
        res.status(500).send("Internal Server Error: " + err);
      }
    }
  },
  checkSession: async (req, res) => {
    if (!req.cookies.session_id) {
      res.status(404).send("Session not found.");
    } else {
      try {
        const session = await models.Session.findOne({
          where: { session_hash: req.cookies.session_id },
        });
        if (session === null) {
          res.status(404).send("Session not found.");
        } else if (
          session.updatedAt - Date.now() >
          serverConfig.sessionTimeout
        ) {
          await models.Session.destroy({
            where: { session_hash: req.cookies.session_id },
          });
          res.status(401).send("Session Expired.");
          //TODO: Redirect to login page.
        } else {
          await models.Session.update(
            { updatedAt: Date.now() },
            {
              where: { session_hash: req.cookies.session_id },
            }
          );
          res.status(200).send("Session Valid.");
        }
      } catch (err) {
        res.status(500).send("Internal Server Error: " + err);
      }
    }
  },
  deleteSession: async (req, res) => {
    try {
      if (req.cookies.id) {
        req.clearCookie("session_id", {
          domain: serverConfig.clientUrl,
        });
      }
      await models.Session.destroy({
        where: { session_hash: req.cookies.session_id },
      });
      res.status(200).send("Session Deleted.");
      //TODO: redirect to login page
    } catch (err) {
      res.status(500).send("Internal Server Error: " + err);
    }
  },
};
