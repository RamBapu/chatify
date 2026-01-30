import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    console.log(ENV.MONGODB_URI);
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log("Connection successful", conn.connection.host);
  } catch (error) {
    console.log("Error connected to Mongodb", error);
    process.exit(1);
  }
};
