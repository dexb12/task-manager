import express from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
const router = express.Router();

router.route("/").get(getTasks);

router.route("/").post(createTask);

router.route("/:id").get(getTaskById);

router.route("/:id").put(updateTask);

router.route("/:id").delete(deleteTask);

export default router;
