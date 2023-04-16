import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.model.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyTask = async (req, res) => {
  try {
    const userid = req.user._id;

    const task = await Task.find({ user: userid });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorHandler("Task not found!", 404));
    }
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(201).json({
      success: true,
      message: "Invalid ID!",
      task,
    });
  } catch (error) {
    console.log(error);
  }
  
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ErrorHandler("Task not found!", 404));
    }
    await task.deleteOne(task);

    res.status(201).json({
      success: true,
      message: "Invalid ID!",
      task,
    });
  } catch (error) {
    console.log(error);
  }
};
