const { Activity, Comment, User } = require("../../database/models");

module.exports = (trip_id) => {
  return new Promise((resolve, reject) => {
    Activity.findAll({
      where: { trip_id },
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
            resolve(commentData);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => reject(error));
  });
};
