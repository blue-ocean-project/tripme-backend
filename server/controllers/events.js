module.exports = {
  getEvents: (req, res) => {
    res.status(200).json('get events');
  },
  createEvent: (req, res) => {
    res.status(200).json('create event');
  },
  updateEvent: (req, res) => {
    res.status(200).json('update event');
  },
};
