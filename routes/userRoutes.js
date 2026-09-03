import express from "express";
import {
  currentUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUserRole,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", authMiddleware, currentUser);
router.patch(
  "/:id/role",
  authMiddleware,
  authorizeRoles("admin"),
  updateUserRole,
);
router.delete("/:id/role", deleteUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

export default router;
