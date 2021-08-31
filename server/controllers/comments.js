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
    res.status(200).json("create comment");
  },
  updateComment: (req, res) => {
    res.status(200).json("update comment");
  },
};
