import "dotenv/config";
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
