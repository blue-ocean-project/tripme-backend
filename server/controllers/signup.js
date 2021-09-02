const models = require("../../database/models");
const utils = require("../lib/utils.js");
const hashUtils = require("../lib/hashUtils.js");
const config = require("../config/config.server");
module.exports = {
  signup: async (req, res) => {
    // TODO: Handle trip and key parameters
    try {
      if (
        !req.body.first_name === undefined ||
        req.body.last_name === undefined ||
        req.body.email === undefined ||
        req.body.phone === undefined ||
        req.body.password === undefined ||
        utils.validatePhone(utils.parsePhone(req.body.phone)) === false ||
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
        const salt = hashUtils.createRandom32String();
        const hashedPassword = hashUtils.createHash(req.body.password, salt);
        const user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone: utils.parsePhone(req.body.phone),
          password: hashedPassword,
          salt: salt,
          profile_pic: req.body.profile_pic || "",
        };
        if (req.body.verified !== undefined) {
          user.verified = req.body.verified;
        }
        const newUser = await models.User.create(user);
        // console.log(newUser);
        res.status(201).json({
          user_id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          phone: newUser.phone,
          verified: newUser.verified,
          profile_pic: newUser.profile_pic,
        });
      }
    } catch (err) {
      res.status(500).send("Internal Server Error: " + err);
    }
  },
  verify: async (req, res) => {
    if (req.query.user_id === undefined || req.query.key === undefined) {
      res.status(400).send("Bad Request: Missing user_id or key");
    } else {
      const user = await models.User.findOne({
        where: { id: req.query.user_id },
      });
      if (!user) {
        res.status(404).send("User not found");
      } else if (user.verified === "verified") {
        res.status(403).send("User already verified");
      } else {
        const verification = await models.Verification.findOne({
          where: { user_id: req.query.user_id },
        });
        if (!verification) {
          res.status(404).send("No verification pending");
        } else if (verification.key === req.query.key) {
          models.User.update(
            { verified: "verified" },
            { where: { id: req.query.user_id } }
          );
          models.Verification.destroy({
            where: { user_id: req.query.user_id },
          });
          res.status(301).redirect(`${config.clientUrl}/login`);

          // IF AUTO LOGIN AFTER VERIFICATION
          // let hash = "";
          // do {
          //   hash = hashUtils.createRandom32String();
          // } while (
          //   (await models.Session.findOne({
          //     where: { session_hash: hash },
          //   })) !== null
          // );

          // await models.Session.create({
          //   session_hash: hash,
          // });

          // res.status(200).
          // .cookie("session_id", hash, {
          //   domain: serverConfig.clientUrl,
          //   expires: new Date(Date.now() + 8 * 3600000), // Cookie removed after 8 hours.
          // }).
          // json({
          //   user_id: newUser.id,
          //   first_name: newUser.first_name,
          //   last_name: newUser.last_name,
          //   email: newUser.email,
          //   phone: newUser.phone,
          //   verified: "verified",
          //   profile_pic: newUser.profile_pic,
          // });
        } else {
          res.status(401).send("Invalid key");
        }
      }
    }
  },
  sendCode: async (req, res) => {
    if (
      req.query.user_id === undefined ||
      req.query.method === undefined ||
      (req.query.method !== "email" && req.query.method !== "phone")
    ) {
      res.status(400).send("Missing Parameters");
    } else {
      try {
        const user = await models.User.findOne({
          where: { id: req.query.user_id },
        });
        if (!user) {
          res.status(404).send("User not found");
        } else if (user.verified !== "pending") {
          // console.log(user);
          res.status(401).send("Account already verified");
        } else {
          const code = utils.generateCode(5);
          await models.Verification.destroy({
            where: { user_id: user.id },
          });
          await models.Verification.create({
            user_id: user.id,
            key: code,
          });
          if (req.query.method === "email") {
            const info = await utils.transporter.sendMail({
              from: `"Trip Me" <tripmeblue@gmail.com>`,
              to: user.email,
              subject: "Trip Me: Activate your account!",
              text: `Your Trip Me Verification Code is: ${code}\n\nOr use the following link to verify: ${config.serverUrl}/signup/verify?user_id=${user.id}&key=${code}`,
              html: `<body><img src="http://titaniasgarden.com/wp-content/uploads/2021/08/TripMe.png" width="300"/><h1>Click verify to activate your account:</h1><a href="${config.serverUrl}/signup/verify?user_id=${user.id}&key=${code}">Verify Account</a><p>Verification Code: ${code}</p></body>`,
            });
            res.status(200).send("Verification Code Sent");
          } else if (req.query.method === "phone") {
            //TODO: send phone verification
            if (user.phone !== "") {
              const msg = await utils.twilio.messages.create({
                body: `Your Trip Me Verification Code is: ${code}\n\nOr use the following link to verify: ${config.serverUrl}/signup/verify?user_id=${user.id}&key=${code}`,
                from: `${config.twilioNumber}`,
                to: `+1${user.phone}`,
              });
              res.status(200).send("Verification Code Sent");
              //console.log(msg);
            } else {
              res.status(404).send("Phone number not found");
            }
          }
        }
      } catch (err) {
        res.status(500).send("Internal Server Error: " + err);
      }
    }
  },
};
