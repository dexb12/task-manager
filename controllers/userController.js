import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel.js";
import "dotenv/config";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: user._id,
      email: user.email,
    };

    const options = {
      expiresIn: "2h",
    };

    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);

    console.log("User created successfully:", {
      id: user._id,
      username: user.username,
      email: user.email,
    });

    return res.status(201).json({
      message: "Registration Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: user._id,
    };

    const options = {
      expiresIn: "2h",
    };

    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, options);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const currentUser = async (req, res) => {
  res.json({ message: "Current user" });
};
