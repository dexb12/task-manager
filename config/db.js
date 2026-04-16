import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database Connected ",
      connect.connection.host,
      connect.connection.name,
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
