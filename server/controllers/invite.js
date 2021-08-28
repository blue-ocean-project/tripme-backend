module.exports = {
  createInvite: (req, res) => {
    res.status(200).json('create invite');
  },
  verifyInvite: (req, res) => {
    res.status(200).json('verify invite');
  },
};
