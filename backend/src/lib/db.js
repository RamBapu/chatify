import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successful", conn.connection.host);
  } catch (error) {
    console.log("Error connected to Mongodb", error);
    process.exit(1);
  }
};
