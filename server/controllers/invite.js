const models = require("../../database/models");
const utils = require("../lib/utils.js");
const config = require("../config/config.server");

module.exports = {
  createInvite: async (req, res) => {
    if (!req.body.contacts || req.body.contacts.length === 0) {
      res.status(400).send("No emails or phone numbers provided");
    } else if (
      !req.body.trip_id ||
      !req.body.first_name ||
      !req.body.last_name
    ) {
      res.status(400).send("Fields Missing");
    } else {
      try {
        for (let i = 0; i < req.body.contacts.length; i++) {
          let code;
          do {
            code = utils.generateCode(10);
          } while (
            (await models.Invite.findOne({
              where: { trip_id: req.body.trip_id, key: code },
            })) !== null
          );

          if (utils.validateEmail(req.body.contacts[i])) {
            const info = await utils.transporter.sendMail({
              from: `"Trip Me" <tripmeblue@gmail.com>`,
              to: req.body.contacts[i],
              subject: `Trip.Me: ${req.body.first_name} ${req.body.last_name} has invited you to a trip!`,
              text: `You have been invited to join a trip on Trip.Me! Visit the following link to accept the invitation: ${config.clientUrl}/?trip=${req.body.trip_id}&key=${code}`,
              html: `<body><img src="http://titaniasgarden.com/wp-content/uploads/2021/08/TripMe.png" width="300"/><h1>You have been invited to join a trip on Trip.Me!</h1><p>Click on the following link to accept the invitation:</p><a href="${config.clientUrl}/?trip=${req.body.trip_id}&key=${code}">Accept Invitation</a></body>`,
            });

            await models.Invite.create({
              trip_id: req.body.trip_id,
              key: code,
            });
          } else if (
            utils.validatePhone(utils.parsePhone(req.body.contacts[i]))
          ) {
            const msg = await utils.twilio.messages.create({
              body: `${req.body.first_name} ${req.body.last_name} has invited to join a trip on Trip.Me! Visit the following link to accept the invitation: ${config.clientUrl}/?trip=${req.body.trip_id}&key=${code}`,
              from: `${config.twilioNumber}`,
              to: `+1${utils.parsePhone(req.body.contacts[i])}`,
            });

            await models.Invite.create({
              trip_id: req.body.trip_id,
              key: code,
            });
          }
        }

        res.status(200).send("Invites sent successfully");
      } catch (err) {
        res.status(500).send("Internal Server Error: " + err);
      }
    }
  },
  verifyInvite: async (req, res) => {
    if (!req.body.user_id) {
      res.status(400).send("User ID not provided");
    } else if (!req.params.trip_id) {
      res.status(404).send("Trip ID Invalid or Not Found");
    } else if (!req.query.key) {
      res.status(403).send("Invalid Invite Code");
    } else {
      try {
        const invite = await models.Invite.findOne({
          where: { trip_id: req.params.trip_id, key: req.query.key },
        });
        if (invite) {
          await models.Trips_Users.create({
            trip_id: req.params.trip_id,
            user_id: req.body.user_id,
          });
          await models.Invite.destroy({
            where: { id: invite.id },
          });
          res.status(200).send("Invite Successfully Accepted");
        } else {
          res.status(403).send("Invalid Invite Code");
        }
      } catch (err) {
        res.status(500).send("Internal Server Error: " + err);
      }
    }
    // res.status(200).json("verify invite");
  },
};
