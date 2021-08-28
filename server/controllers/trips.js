module.exports = {
  getTrips: (req, res) => {
    res.status(200).json('get trips');
  },
  createTrip: (req, res) => {
    res.status(200).json('create trip');
  },
  updateTrip: (req, res) => {
    res.status(200).json('edit trip');
  },
};
