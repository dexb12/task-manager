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

router.route("/").get(authMiddleware, getTasks);

router.route("/").post(authMiddleware, createTask);

router.route("/:id").get(authMiddleware, getTaskById);

router.route("/:id").put(authMiddleware, updateTask);

router.route("/:id").delete(authMiddleware, deleteTask);

export default router;
