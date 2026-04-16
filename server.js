import "dotenv/config";
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
