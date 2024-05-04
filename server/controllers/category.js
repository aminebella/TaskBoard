const asyncWrapper = require("../middleware/async");
const Category = require("../models/Category");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/custom-error");
const getAllCategs = asyncWrapper(async (req, res) => {
  const categs = await Category.find({});
  res.status(200).json({ categs });
});

const createCateg = asyncWrapper(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ category });
});

const deleteCateg = asyncWrapper(async (req, res, next) => {
  const { nameCateg } = req.params;
  const tasks = await Task.find({ nameCategory: nameCateg });

  if (tasks.length >= 1) {
    next(createCustomError(`There are tasks in this category`, 404));
    return res
      .status(404)
      .json({
        success: false,
        msg: `There are tasks in the ${nameCateg} category`,
      });
  }
  const category = await Category.findOneAndDelete({ nameCategory: nameCateg });

  if (!category) {
    return next(createCustomError(`No Category with name : ${nameCateg}`, 404));
  }
  res.status(200).json({ category });
});

module.exports = {
  getAllCategs,
  createCateg,
  deleteCateg,
};
