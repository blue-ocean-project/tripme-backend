const { Checklist } = require("../../database/models");
const Sequelize = require("sequelize");

module.exports = {
  getChecklist: (req, res) => {
    const { trip_id } = req.params;
    Checklist.findAll({
      attributes: ["id", "item", "checked"],
      where: {
        trip_id,
      },
    }).then((items) => {
      res.status(200).json(items);
    });
  },
  createChecklist: (req, res) => {
    const { trip_id } = req.params;
    const { item, checked } = req.body;
    Checklist.create({
      trip_id,
      item,
      checked,
    })
      .then((checklistId) => {
        const { id, item, checked } = checklistId.dataValues;
        res.status(200).json({ id, item, checked });
      })
      .catch((error) => res.status(404).send(error));
  },
  updateChecklist: (req, res) => {
    const id = req.params.item_id;
    Checklist.update(
      {
        checked: Sequelize.literal("NOT checked"),
      },
      {
        where: { id },
      }
    )
      .then((result) => {
        res.status(204).json(result);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  },
};
