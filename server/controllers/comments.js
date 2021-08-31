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
  updateComment: (req, res) => {
    res.status(200).json("update comment");
  },
};
