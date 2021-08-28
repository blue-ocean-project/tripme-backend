module.exports = {
  getComments: (req, res) => {
    res.status(200).json('get comments');
  },
  createComment: (req, res) => {
    res.status(200).json('create comment');
  },
  updateComment: (req, res) => {
    res.status(200).json('update comment');
  },
};
