const express = require("express");
const route = express.Router();
const { allUsersStats, userStats } = require("../controllers/stats");

route.route("/").get(allUsersStats);
route.route("/:userId").get(userStats);

module.exports = route;
