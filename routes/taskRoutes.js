import express from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getTasks);

router.route("/").post(authMiddleware, createTask);

router.route("/:id").get(getTaskById);

router.route("/:id").put(updateTask);

router.route("/:id").delete(deleteTask);

export default router;
