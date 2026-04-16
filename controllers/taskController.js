import Task from "../models/taskModel.js";

//@desk get all tasks
//@route GET /api/tasks
//@access public
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching contacts: ", error.message);
  }
};

//@desk create task
//@route POST /api/tasks
//@access public
export const createTask = async (req, res) => {
  try {
    console.log("The request body is: ", req.body);
    const { task, description, status, tag, dueDate } = req.body;
    if (!task || !description) {
      return res
        .status(400)
        .json({ message: "Task and Description is required" });
    }
    const newTask = await Task.create({
      task,
      description,
      status,
      tag,
      dueDate,
    });
    return res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//@desk get task
//@route GET /api/tasks/:id
//@access public
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//@desk update task
//@route PUT /api/tasks
//@access public
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

//@desk delete task
//@route DELETE /api/tasks
//@access public
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = await Task.deleteOne({ _id: req.params.id });
    console.log("The deleted task: ", deletedTask);

    res.status(200).json({ message: `Delete task for id ${req.params.id}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
