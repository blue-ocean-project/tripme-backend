module.exports = {
  login: (req, res) => {
    res.status(200).json('login');
  },
  createSession: (req, res) => {
    res.status(200).json('create session');
  },
  deleteSession: (req, res) => {
    res.status(200).json('delete session');
  },
};
