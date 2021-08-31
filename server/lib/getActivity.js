const { Activity, Comment, User } = require("../../database/models");

module.exports = (trip_id) => {
  return new Promise((resolve, reject) => {
    Activity.findAll({
      attributes: [
        "id",
        "type",
        "title",
        "image_url",
        "description",
        "start_time",
        "end_time",
        "trip_id",
      ],
      where: { trip_id },
    })
      .then((activities) => {
        let commentsOnly = [];
        activities.forEach((activity) => {
          commentsOnly.push(
            Comment.findAll({
              where: { activity_id: activity.dataValues.id },
              include: [
                {
                  model: User,
                  attributes: ["first_name", "last_name", "profile_pic"],
                },
              ],
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
