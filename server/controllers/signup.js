module.exports = {
  signup: (req, res) => {
    res.status(200).json('signup base');
  },
  verify: (req, res) => {
    res.status(200).json('signup verify');
  },
  code: (req, res) => {
    res.status(200).json('signup verify code');
  },
};
