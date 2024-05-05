const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const Task = require("../models/Task");
const User = require("../models/User");
const allUsersStats = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  const users = await User.find({});
  const stats = users.map((user) => {
    const { fullName, email, userId } = user;
    const userTasks = tasks.filter((task) => task.userId === userId);
    const userTasksDone = userTasks.filter((task) => task.isDone === true);
    return {
      fullName,
      email,
      nbrTasks: userTasks.length,
      nbrTasksDone: userTasksDone.length,
    };
  });
  res.status(200).json(stats);
});

const userStats = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const tasks = await Task.find({ userId });
  const tasksDone = tasks.filter((task) => task.isDone === true);
  const user = await User.findOne({ userId });
  const { fullName, email } = user;
  const stats = {
    fullName,
    email,
    nbrTasks: tasks.length,
    nbrTasksDone: tasksDone.length,
  };
  res.status(200).json(stats);
});

module.exports = {
  userStats,
  allUsersStats,
};
