import express from "express";
import path from "path";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT;

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health check passed" });
});

app.use("/api/auth", authRoutes);

// deployment code
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => console.log("Server started on port", PORT));
