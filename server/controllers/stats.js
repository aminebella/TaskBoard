const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const Task = require("../models/Task");
const User = require("../models/User");
const allUsersStats = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  const users = await User.find({});
  const stats = users.map((user) => {
    const { fullname, email, userId } = user;
    const userTasks = tasks.filter((task) => task.userId === userId);
    return {
      fullname,
      email,
      tasks: userTasks,
    };
  });
  res.status(200).json(stats);
});

const userStats = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const tasks = await Task.find({ userId });
  const user = await User.findOne({ userId });
  const { fullname, email } = user;
  const stats = {
    fullname,
    email,
    tasks,
  };
  res.status(200).json(stats);
});

module.exports = {
  userStats,
  allUsersStats,
};
