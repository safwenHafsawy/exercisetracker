const express = require("express");
const route = express.Router();

const { createUser, getUsers } = require("../controllers/userCntl");
const { createExercise } = require("../controllers/exerciseCntl");
const { getLogs } = require("../controllers/logsCntl");

route.route("/").get(getUsers).post(createUser);
route.route("/:id/exercises").post(createExercise);
route.route("/:id/logs").get(getLogs);

module.exports = route;
