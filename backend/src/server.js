import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { ENV } from "./lib/env.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT;

app.use(express.json()); // Parses json from request body
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health check passed" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// deployment code
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
  connectDB();
});
