import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // extract token from http-only cookie
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.error("Socket connection rejected: No token");
      return next(new Error("Unauthorized - No token provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.error("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token provided"));
    }

    // Find the user from db
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.error("Socket connection rejected: User not found");
      return next(new Error("Unauthorized - User not found"));
    }

    // Attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.fullName} ${user._id}`);

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
