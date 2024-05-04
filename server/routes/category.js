const express = require("express");
const route = express.Router();
const {
  getAllCategs,
  createCateg,
  deleteCateg,
} = require("../controllers/category");

route.route("/").get(getAllCategs).post(createCateg);
route.route("/:nameCateg").delete(deleteCateg);

module.exports = route;
