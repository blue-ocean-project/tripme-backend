const { Activity, Comment, User } = require("../../database/models");

module.exports = {
  getActivities: (req, res) => {
    const { trip_id } = req.params;
    Activity.findAll({
      where: {
        trip_id,
      },
    })
      .then((activities) => {
        let commentsOnly = [];
        activities.forEach((activity) => {
          commentsOnly.push(
            Comment.findAll({
              where: { activity_id: activity.dataValues.id },
              include: User,
            }).then((comments) => comments)
          );
        });

        Promise.all(commentsOnly)
          .then((comments) => {
            const commentData = activities.map((activity, i) => {
              let activityData = activity.dataValues;
              activityData.comments = comments[i];
              return activityData;
            });

            res.status(200).json(commentData);
          })
          .catch((error) => {
            res.status(404).json(error);
          });
      })
      .catch((error) => res.status(404).send(error));
  },
  createActivity: (req, res) => {
    res.status(200).json("create activity");
  },
  updateActivity: (req, res) => {
    res.status(200).json("update activity");
  },
};
