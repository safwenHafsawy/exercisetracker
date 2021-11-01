const userModel = require("../models/userModel");

const createUser = (req, res) => {
  const { username } = req.body;
  const user = userModel({ username });
  user
    .save()
    .then(() => {
      res.status(201).json({ id: user["_id"], username: user.username });
    })
    .catch((e) => {
      res.json(e);
    });
};

const getUsers = (req, res) => {
  userModel
    .find()
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.json({ error });
    });
};

module.exports = { createUser, getUsers };
