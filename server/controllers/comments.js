const { Comment, User } = require("../../database/models");

module.exports = {
  getComments: async (req, res) => {
    const { activity_id } = req.params;
    Comment.findAll({
      where: {
        activity_id,
      },
      include: User,
    })
      .then((comments) => {
        res.status(200).json(comments);
      })
      .catch((error) => res.status(404).send(error));
  },
  createComment: (req, res) => {
    const { activity_id } = req.params;
    const { body, user_id } = req.body;
    Comment.create({ body, user_id, activity_id })
      .then((result) => {
        res.status(201).send({ id: result.dataValues.id });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  updateComment: async (req, res) => {
    const allowedFields = ["body", "activity_id", "user_id"];
    try {
      const comment = await Comment.findOne({
        where: { id: req.params.comment_id },
      });
      const changes = {};
      if (comment) {
        for (const field in req.body) {
          if (allowedFields.includes(field)) {
            changes[field] = req.body[field];
          }
        }
        await Comment.update(changes, {
          where: { id: req.params.comment_id },
        });
        res.sendStatus(204);
      } else {
        res.status(404).send("Comment not found");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error: " + err);
    }
  },
};
