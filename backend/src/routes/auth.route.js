import express from "express";
import {
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
// import { connectDB } from "../lib/db.js";

const router = express.Router();

// // For serverless functions - deployed in Vercel
// router.use(
//   app.use(async (req, res, next) => {
//     await connectDB();
//     next();
//   }),
// );

router.use(arcjetProtection); // For Rate limiting

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
