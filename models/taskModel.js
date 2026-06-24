import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: String,
      required: [true, "Please add task title"],
    },
    description: {
      type: String,
      required: [true, "Please add a task description"],
    },
    status: {
      type: String,
      enum: ["pending", "In-progress", "Completed"],
      default: "pending",
      required: true,
    },
    tag: {
      type: String,
      enum: ["Work", "Personal", "Reporting", "admin"],
      default: "Personal",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Task", taskSchema);
