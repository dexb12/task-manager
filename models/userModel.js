import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
      unique: [true, "User email already exist"],
    },
    password: {
      type: String,
      required: [true, "Please input a password"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
