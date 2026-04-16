import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "user already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:", hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jsonwebtoken.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "default_jwt_secret",
    { expiresIn: "1d" },
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const currentUser = async (req, res) => {
  res.json({ message: "Current user" });
};
