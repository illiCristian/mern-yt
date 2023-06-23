import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";
export default class TaskController {
  getTasks = async (req, res) => {
    try {
      console.log(req.user.id);
      const tasks = await taskModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || !description)
        return res.status(400).json({ message: "Missing required fields" });
      const author = await userModel.findById(req.user.id);
      const newTask = await taskModel.create({
        author,
        title,
        description,
      });
      author.tasks.push(newTask._id);
      await author.save();
      res.status(201).json({ author: author });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  getTaskId = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userModel.findById(id).populate("tasks");
      if (!result) return res.status(404).json({ message: "Task not found" });

      res.status(200).json(result.tasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}
