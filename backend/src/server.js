import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { ENV } from "./lib/env.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT;

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // allow request from frontend with cookies
app.use(express.json({ limit: "5mb" })); // Parses json from request body
app.use(cookieParser()); // To extract userId from cookies

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Chatify API - Powered by Mongoose & MongoDB",
    endpoints: {
      users: "/api/users",
      messages: "/api/messages",
    },
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health check passed" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// deployment code
// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

server.listen(PORT, () => {
  console.log("Server started on port", PORT);
  connectDB();
});
