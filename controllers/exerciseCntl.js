const exerciseModel = require("../models/exerciseModel");
const userModel = require("../models/userModel");

const createExercise = (req, res) => {
  const { id } = req.params;
  let { description, duration, date } = req.body;
  userModel.findOne({ _id: id }, (err, data) => {
    if (err) return res.json({ err });
    const { username } = data;
    if (date === undefined) {
      date = new Date().toDateString();
    } else {
      date = new Date(date).toDateString();
    }
    const exercise = new exerciseModel({
      username,
      description,
      duration,
      date,
      userID: id,
    });
    exercise
      .save()
      .then((data) => {
        const { username, description, duration, date, userID } = data;
        res
          .status(201)
          .json({ username, description, duration, date, _id: userID });
      })
      .catch((error) => {
        res.send(error);
      });
  });
};

module.exports = { createExercise };
